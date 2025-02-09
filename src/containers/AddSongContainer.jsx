import React, { useState } from 'react'
import AddSong from '../pages/AddSong'
import { db } from '../firebase/firebase.config'
import toast from 'react-hot-toast'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AddSongContainer() {
  
  const formularioInit = {
    titulo:"",
    artista:"",
    instrumento: {
      piano: false,
      guitarra: false
    },
    enlace:"",
    enlaces:[],
  }
  const auth = useAuth();
  const [form, setForm] = useState(formularioInit)
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    if(e.target.type === "checkbox"){
      setForm({...form, "instrumento":{...form.instrumento, [e.target.name]:e.target.checked}})
    }else{
      setForm({...form, [e.target.name]:e.target.value});
    }
  }

  const addEnlace = ()=>{
    setForm({...form, enlaces:[...form.enlaces, form.enlace], enlace:""})
  }

  const deleteEnlace = (index)=>{
    setForm({...form, enlaces: form.enlaces.filter((v,i) => i !== index)})
  }

  const agregarCancion = (e)=>{
    e.preventDefault();
    const data = {
      idUsuario : auth.user.uid,
      titulo: form.titulo,
      artista:form.artista,
      instrumento: {
        piano: form.instrumento.piano,
        guitarra: form.instrumento.guitarra
      }
    }

    const songDetalle = {
      titulo: form.titulo.toUpperCase(),
      artista:form.artista.toUpperCase(),
      links: form.enlaces
    }

    addDoc(collection(db, "Songs"), data).then((document) => {
      toast.success("Se agregó la canción con éxito");
      setDoc(doc(db, "songsDetails", document.id), songDetalle).then(()=>{
        toast.success("Enlaces Added");
      }).catch((error)=>{
        toast.error("Error al agregar los enlaces")
        console.log(error)
      })
      navigate(-1);
    }
  ).catch((error)=>{
    toast.error("Error al agregar la canción")
    console.log(error)
  })
  }

  const handleKeyDown = (e)=>{
    if(e.key === 'Enter') {
      e.preventDefault();
      addEnlace();
    }
  }

  return (
    <AddSong 
    addEnlace={addEnlace} 
    deleteEnlace={deleteEnlace}
    form={form}
    handleOnChange={handleOnChange}
    agregarCancion={agregarCancion}
    handleKeyDown={handleKeyDown}
    />
  )
}

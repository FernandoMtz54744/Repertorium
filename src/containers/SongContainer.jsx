import React, { useEffect, useState } from 'react'
import Song from '../pages/Song'
import { useNavigate, useParams } from 'react-router-dom';
import { arrayRemove, arrayUnion, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import "../styles/song.css"
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function SongContainer() {
  const { idSong } = useParams();
  const [songData, setSongData] = useState({links:[]});
  const navigate = useNavigate();
  const [enlace, setEnlace] = useState("");

  useEffect(()=>{
    const unsuscribe =  onSnapshot(doc(db, "songsDetails", idSong), (snapshot) =>{
      if(snapshot.exists()){
        setSongData(snapshot.data())
      } 
    }, (error) =>{
      alert("Error al consultar los detalles de la canción");
      console.log(error)
    });    
    return ()=> unsuscribe();
}, [])

const agregarEnlance = (e)=>{
  e.preventDefault();
  updateDoc(doc(db, "songsDetails", idSong), {
    links: arrayUnion(enlace)
  }).then(()=>{
    toast.success("Link agregado");
  }).catch((error) =>{
    toast.error("Error al agregar link");
    console.log(error)
  })
  setEnlace("");
}

const eliminarLink = (link)=>{
  updateDoc(doc(db, "songsDetails", idSong), {
    links: arrayRemove(link)
  }).then(()=>{
    toast.success("Enlace eliminado");
  }).catch((error) =>{
    toast.error("Error al eliminar link");
    console.log(error)
  })
}

const eliminarSong = ()=>{
  Swal.fire({
    title: 'Eliminar Canción',
    text: "Esta acción eliminará toda esta canción y su contenido",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if(result.isConfirmed) {
      deleteDoc(doc(db, "songsDetails", idSong)).then(()=>{
        toast.success("Links eliminados");
        deleteDoc(doc(db, "Songs", idSong)).then(()=>{
          toast.success("Canción eliminada");
        })
      }).catch((error)=>{
        toast.error("Error al eliminar la canción");
        console.log(error)
      })
      navigate("/")
    }
  }); 

}
    
  return (
    <Song songData={songData} 
    enlace={enlace} 
    setEnlace={setEnlace} 
    agregarEnlance={agregarEnlance}
    eliminarLink={eliminarLink}
    eliminarSong={eliminarSong}/>
  )
}

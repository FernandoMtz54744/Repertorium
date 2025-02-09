import React, { useState } from 'react'
import AddBibliografia from '../../pages/bibliografia/AddBibliografia'
import "../../styles/bibliografia.css"
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import toast from 'react-hot-toast';

export default function AddBibliografiaContainer() {
    const [form, setForm] = useState({titulo: "", link:""});
    const navigate = useNavigate();

    const handleOnChange = (e) => { 
        setForm({...form, [e.target.name]:e.target.value});
    }

    const agregarBibliografia = (e)=>{
        e.preventDefault();
        addDoc(collection(db, "Bibliografia"), form).then((document) => {
            toast.success("Se agregó la bibliografia con éxito");
        }).catch((error)=>{
            toast.error("Error al agregar bibliografía");
            console.log(error);
        })
        setForm({titulo: "", link:""});
        navigate("/bibliografia");
    }

  return (
    <AddBibliografia form={form} handleOnChange={handleOnChange} agregarBibliografia={agregarBibliografia}/>
  )
}

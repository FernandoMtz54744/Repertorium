import React, { useEffect, useState } from 'react'
import Bibliografia from '../../pages/bibliografia/Bibliografia'
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function BibliografiaContainer() {

    const [bibliografia, setBibliografia] = useState([]);

    const eliminarRecurso = (recurso)=>{
        Swal.fire({
            title: "¿Eliminar Recurso\n'" + recurso.titulo+"'?",
            text: "Esta acción eliminará este recurso",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if(result.isConfirmed) {
              deleteDoc(doc(db, "Bibliografia", recurso.idRecurso)).then(()=>{
                toast.success("Recurso eliminado");
              }).catch((error)=>{
                toast.error("Error al eliminar el recurso");
                console.log(error)
              })
            }
        });
    }

    useEffect(()=>{
        try{
            onSnapshot(query(collection(db, `Bibliografia`)), (snapshot)=>{
                const recusoTemp = [];
                snapshot.docs.forEach(recurso =>{
                    recusoTemp.push({...recurso.data(), idRecurso: recurso.id})
                });
                setBibliografia(recusoTemp);
            });
        }catch(error){
            toast.error("Error al consultar bibliografia");
        }
    }, []);

  return (
    <Bibliografia bibliografia={bibliografia} eliminarRecurso={eliminarRecurso}/>
  )
}

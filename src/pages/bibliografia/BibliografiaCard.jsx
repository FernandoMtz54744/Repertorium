import React from 'react'
import { Link } from 'react-router-dom'

export default function BibliografiaCard({recurso, eliminarRecurso}){
  return (
    <div className='video-container'>
        <div className='recurso-card'>
            <Link to={recurso.link} target='_blank'>
                {recurso.titulo}
            </Link>
            
        </div>
        <button className='delete-link' onClick={()=>eliminarRecurso(recurso)}>Eliminar</button>
    </div>
    
  )
}

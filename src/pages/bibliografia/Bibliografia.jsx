import React from 'react'
import BibliografiaCard from './BibliografiaCard'
import { Link } from 'react-router-dom'

export default function Bibliografia({bibliografia, eliminarRecurso}) {
    const formatYoutubeLink = (link)=>{
        let newLink = "";
        if(link.includes("youtu.be")){
          newLink = link.replace("youtu.be", "www.youtube.com/embed");
        }else{
          newLink = link.replace("www.youtube.com/watch?", "www.youtube.com/embed/").replace("v=", "");
        }
        return newLink;
    }

  return (
    <div>
        <center className='title'>Recursos</center>
        <div className='recursos-container'>
            {bibliografia.sort((a,b) => a.titulo.localeCompare(b.titulo, undefined, { sensitivity: 'base' })).map((recurso,i) => {
                if(recurso.link.includes("youtu.be") || recurso.link.includes("youtube")){
                    return (
                        <div className='video-container' key={i}>
                            <iframe src={formatYoutubeLink(recurso.link)} allowfullscreen="allowfullscreen" frameBorder="0"/>
                            <button className='delete-link' onClick={()=>eliminarRecurso(recurso)}>Eliminar</button>
                        </div>
                    )
                }else{
                    return (<BibliografiaCard key={i} recurso={recurso} eliminarRecurso = {eliminarRecurso}/>)
                }
            })}
        </div>
        <Link className='addSong' to={"add"}>+</Link>
    </div>
  )
}

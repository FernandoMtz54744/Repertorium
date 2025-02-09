import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export default function Song({songData, enlace, setEnlace, agregarEnlance, eliminarLink, eliminarSong}) {

  const formatYoutubeLink = (link)=>{
    let newLink = "";
    if(link.includes("youtu.be")){
      newLink = link.replace("youtu.be", "www.youtube.com/embed");
    }else{
      newLink = link.replace("www.youtube.com/watch?", "www.youtube.com/embed/").replace("v=", "");
    }
    return newLink;
  }

  const ordenaLinks = (links)=>{
    const linksOrdenados = links.sort((a, b) => {
      const empiezaConYouA = a.startsWith("https://www.you") ? 1 : 0;
      const empiezaConYouB = b.startsWith("https://www.you") ? 1 : 0;

      if (empiezaConYouA !== empiezaConYouB) {
        return empiezaConYouA - empiezaConYouB;
      }
    
      return a.localeCompare(b);
    });
    return linksOrdenados;
  }

  return (
    <div>
      <div className='song-container'>
        <center className='title'>{songData.titulo} <br/>{songData.artista}</center>
        <div className='form-add-link-container'>
          <form className='form-link'>
            <input type="text" placeholder='Enlace' value={enlace} onChange={(e)=>setEnlace(e.target.value)}/>
            <button onClick={agregarEnlance}>Agregar</button>
          </form>
        </div>
        <div className='links-song-container'>
          {ordenaLinks(songData.links).map((link, key) =>{
            if(link.includes("youtu.be") || link.includes("youtube")){
              return (
              <div className='video-container' key={key}>
                <iframe width="420" height="315" src={formatYoutubeLink(link)} allowfullscreen="allowfullscreen" frameBorder="0"/>
                <button className='delete-link' onClick={()=>eliminarLink(link)}>Eliminar</button>
              </div>)
            }else{
              return (
              <div className='linkSong'>
                <Link to={link} target='_blank'  key={key} className='link-song'>
                <div>{link}</div>
                </Link>
                <button className='delete-link' onClick={()=>eliminarLink(link)}>Eliminar</button>
              </div>)
            }
          })}
        </div>
      </div>
      <FontAwesomeIcon icon={faTrash} className='delete-song-button' onClick={eliminarSong}/>
    </div>
  )
}

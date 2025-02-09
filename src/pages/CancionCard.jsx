import React from 'react'
import "../styles/canciones.css"
import { Link } from 'react-router-dom'

export default function CancionCard({cancion}) {
  return (
    <Link className='cancion-card' to={`/song/${cancion.idSong}`}>
      <div>Titulo: {cancion.titulo}</div>
      <div>Artista: {cancion.artista}</div>
    </Link>
  )
}

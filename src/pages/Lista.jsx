import CancionCard from '../pages/CancionCard';


export default function Lista({songs}) {
  return (
    <>
    <center className='title'>Canciones</center>
    <div className='canciones-container'>
        {songs.sort((a,b) => a.artista.localeCompare(b.artista, undefined, { sensitivity: 'base' })).map(song => <CancionCard cancion={song}/>)}
    </div>
    </>
  )
}

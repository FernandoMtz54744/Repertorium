import React from 'react'
import "../styles/forms.css"

export default function AddSong({addEnlace, deleteEnlace, form, handleOnChange, agregarCancion, handleKeyDown}) {
  return (
    <div className='addSongContainer'>
        <form className='addSongForm' onSubmit={agregarCancion}>
            <div className='title'>Agregar canción</div>
            <div className='input-container'>
                <label htmlFor="artista">Artista:</label>
                <input type="text" name='artista' id='artista' value={form.artista} onChange={handleOnChange} autoComplete='off'/>
            </div>
            <div className='input-container'>
                <label htmlFor="titulo">Titulo:</label>
                <input type="text" name='titulo' id='titulo' value={form.titulo} onChange={handleOnChange} autoComplete='off'/>
            </div>
            <div className='input-container'>
                <label htmlFor="instrumento">Instrumento:</label>
                <div className='instrumento-checks-container'>
                    <div className='checkbox-container'>
                        <input type='checkbox' name='piano' id='piano'  onChange={handleOnChange} checked={form.instrumento.piano}/>
                        <label htmlFor='piano'>Piano</label>
                    </div>
                    <div className='checkbox-container'>
                        <input type='checkbox' name='guitarra' id='guitarra' onChange={handleOnChange} checked={form.instrumento.guitarra}/>
                        <label htmlFor='guitarra'>Guitarra</label>
                    </div>
                </div>
            </div>
            <div className='input-container enlaces'>
                <label htmlFor="links">Enlances</label>
                <div className='enlace-agregar-container'>
                    <input type='text' name='enlace' id='enlace' value={form.enlace} onChange={handleOnChange} autoComplete='off' onKeyDown={handleKeyDown}/>
                    <div className='agregar-enlace' onClick={addEnlace}>Agregar</div>
                </div>
                <div className='enlaces-container'>
                {form.enlaces.map((enlace,i) => {
                    return(
                    <div className='enlace-contenedor'>
                        <div>
                            {enlace}
                        </div>
                        <div>
                            <div className='eliminar-enlace' onClick={()=>deleteEnlace(i)}>Eliminar</div>
                        </div>
                    </div>
                )})}
                </div>
            </div>
            <div className='input-container submit'>
                <input type='submit' value="Agregar" onClick={agregarCancion}></input>
            </div>
        </form>
    </div>
  )
}

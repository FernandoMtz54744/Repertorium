import React from 'react'

export default function AddBibliografia({agregarBibliografia, handleOnChange, form}) {
    return (
        <div className='addSongContainer'>
            <form className='addSongForm' onSubmit={agregarBibliografia}>
                <div className='title'>Agregar recurso</div>
                <div className='input-container'>
                    <label htmlFor="titulo">Titulo</label>
                    <input type="text" name='titulo' id='titulo' value={form.titulo} onChange={handleOnChange} autoComplete='off'/>
                </div>
                <div className='input-container'>
                    <label htmlFor="link">Link</label>
                    <input type="text" name='link' id='link' value={form.link} onChange={handleOnChange} autoComplete='off'/>
                </div>
                <div className='input-container submit-bibliografia'>
                    <input type='submit' value="Agregar" onClick={agregarBibliografia}></input>
                </div>
            </form>
        </div>
      )
}

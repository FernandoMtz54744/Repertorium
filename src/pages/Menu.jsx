import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
    const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div>
        <div onClick={()=>setToggleMenu(!toggleMenu)} className='menu-header'>Menú</div>
        {toggleMenu && (
        <>
            <div className='sidebar'>
                <center><Link className='menu-link' to="/" onClick={()=>setToggleMenu(false)}>Menú</Link></center>
                <Link className='menu-link' to="/" onClick={()=>setToggleMenu(false)}>Canciones</Link>
                <br />
                <Link className='menu-link' to="/bibliografia" onClick={()=>setToggleMenu(false)}>Libros</Link>
            </div>
            <div className='menu-overlay' onClick={()=>setToggleMenu(!toggleMenu)}></div>
        </>
        )}
    </div>
  )
}

import React, { useState } from 'react'
import Lista from '../pages/Lista'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ListaContainer() {
  const auth = useAuth();

  return (
    <>
      <Lista songs={auth.songs}/>
      <Link className='addSong' to='/addSong'>+</Link>
    </>
  )
}

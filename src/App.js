import './App.css';
import HeaderContainer from './containers/HeaderContainer';
import ListaContainer from './containers/ListaContainer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddSongContainer from './containers/AddSongContainer';
import SongContainer from './containers/SongContainer';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import BibliografiaContainer from './containers/bibliografia/BibliografiaContainer';
import AddBibliografiaContainer from './containers/bibliografia/AddBibliografiaContainer';

function App() {
  return (
    <AuthProvider>
      <Toaster/>
      <BrowserRouter>
        <HeaderContainer/>
        <Routes>
          <Route path='/' element={<ListaContainer/>}/>
          <Route path='/addSong' element={<AddSongContainer/>}/>
          <Route path='/song/:idSong' element={<SongContainer/>}/>
          <Route path='/bibliografia' element={<BibliografiaContainer/>}/>
          <Route path='/bibliografia/add' element={<AddBibliografiaContainer/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

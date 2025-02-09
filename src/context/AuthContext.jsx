import { auth, db } from "../firebase/firebase.config";
import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup,
    signOut, onAuthStateChanged} from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const authContext = createContext();

export const useAuth = () =>{
    const context = useContext(authContext);
    if(!context){
        console.log("Error al crear el contexto de autenticación");
    }
    return context;
}

export function AuthProvider({children}){
    const [user, setUser] = useState();
    const [songs, setSongs] = useState([]);

    useEffect(()=>{
        const suscribed = onAuthStateChanged(auth, (currentUser)=>{  
            if(!currentUser){
                setUser("");
            }else{
                setUser(currentUser);
                /*CONSULTA CANCIONES*/
                try{
                    onSnapshot(query(collection(db, `Songs`), where("idUsuario", "==", currentUser.uid)), (snapshot)=>{
                        const songsTemp = [];
                        snapshot.docs.forEach(song =>{
                            songsTemp.push({...song.data(), idSong: song.id})
                        });
                        setSongs(songsTemp);
                    });
                }catch(error){
                    console.log(error)
                }
            }         
        })
        return ()=>suscribed();
    }, []);

    const loginWIthGoogle = ()=>{
        const responseGoogle = new GoogleAuthProvider();
        return signInWithPopup(auth, responseGoogle);
    }

    const logout = async ()=>{
        const response = await signOut(auth);
        console.log(response);
    }

    return <authContext.Provider
            value={{
                loginWIthGoogle,
                logout,
                user, 
                songs,
            }}>{children}
        </authContext.Provider>
}
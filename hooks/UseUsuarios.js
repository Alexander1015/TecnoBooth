import firebase from '../database/firebase';
import { useState } from 'react';

const UseUsuarios = () => {
    const [usuario, setUsuario] = useState(); 
    const [cargando, setCargando] = useState(true);
    const obtenerUsuario = async () =>{
        const {email} = await firebase.auth.currentUser;
        firebase.db.collection('Usuarios').where("correo","==",email).onSnapshot(manejarSnapshot)
    }
    const manejarSnapshot = (snapShot) => {
        
        const user = snapShot.docs.map(doc => {
            const {usuario, correo, password} = doc.data()
            return {
                id: doc.id,
                usuario, 
                correo, 
                password
            };
        });
        setUsuario(user[0]);
        setCargando(false);
    }
    const ActualizarUsuario = (usuario, correo, password, id) => {
        firebase.db.collection("Usuarios").doc(id).update({
            usuario, correo, password
        })
    }
    return{obtenerUsuario, usuario, cargando, ActualizarUsuario}
}
export default UseUsuarios;

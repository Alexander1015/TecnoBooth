import firebase from "../database/firebase";
import { useState } from "react";

const UseUsuarios = () => {
    const [usuario, setUsuario] = useState();
    const [cargando, setCargando] = useState(true);
    const obtenerUsuario = async () => {
        const { email } = await firebase.auth.currentUser;
        firebase.db
            .collection("Usuarios")
            .where("correo", "==", email)
            .onSnapshot(manejarSnapshot);
    };
    const manejarSnapshot = (snapShot) => {
        const user = snapShot.docs.map((doc) => {
            const { usuario, correo, img } = doc.data();
            return {
                id: doc.id,
                usuario,
                correo,
                img,
            };
        });
        setUsuario(user[0]);
        setCargando(false);
    };

    const subirImagen = async(uri) =>{
        const response = await fetch(uri);
        const blob = await response.blob();
        const sessionId = new Date().getTime();
        let ref = await firebase.storage.ref("Usuarios").child(`${sessionId}`);
        await ref.put(blob);
        const url = await ref.getDownloadURL();
        setCargando(false);
        return url.toString();
    };

    const ActualizarUsuario = (usuario, correo, img, id) => {
        firebase.db.collection("Usuarios").doc(id).update({
            usuario,
            correo,
            img
        });
    };
    return {
        obtenerUsuario,
        usuario,
        cargando,
        ActualizarUsuario,
        subirImagen,
    };
};
export default UseUsuarios;

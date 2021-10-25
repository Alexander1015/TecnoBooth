import firebase from '../database/firebase';
import {
    useState
} from 'react';

const useGrupos = () => {
    const [cargando, setCargando] = useState(true);
    const [grupos, setGrupos] = useState(null);
    const CrearGrupo = async (uid, url, nombre, descripcion, informacion) => {


        try {
            await firebase.db.collection('Grupo').add({
                nombre,
                informacion,
                descripcion,
                img: url,
                id_usuario: uid
            })
        } catch (error) {
            console.log(error);
        }

    }

    const subirImagen = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const sessionId = new Date().getTime();
        let ref = await firebase.storage.ref('Grupo').child(`${sessionId}`);
        await ref.put(blob);
        const url = await ref.getDownloadURL();
        setCargando(false);
        return url.toString();

    }

    const obtenerGrupos = () => {
        firebase.db.collection('Grupo').onSnapshot(manejarSnapshot)
    }

    const manejarSnapshot = (Snapshot) => {
        const resultadoGrupos = Snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        setGrupos(resultadoGrupos);
    }
    return {
        CrearGrupo,
        subirImagen,
        cargando,
        grupos,
        obtenerGrupos
    }
}
export default useGrupos;
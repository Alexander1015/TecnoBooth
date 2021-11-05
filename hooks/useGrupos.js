import firebase from '../database/firebase';
import { useState,useEffect } from 'react';



const useGrupos = (idGrupo) => {
    const [cargando, setCargando] = useState(true);
    const [grupos, setGrupos] = useState(null);
    const [grupo, setGrupo] = useState(null);
    const [posts, setPosts] = useState(null);
    const [comentarios, setComentarios] = useState(null);
    const [idUsuario, setIdUsuario] = useState(null);
    const [integrantes, setIntegrantes] = useState(null);  
  const [verificado, setVerificado] = useState(false);

  useEffect(()=>{
    if(integrantes&&idUsuario){
        const usuarioVerificado=integrantes.filter(integrante=>integrante.id_usuario===idUsuario[0].toString());
        if(usuarioVerificado.length>0){
            setVerificado(true);
        }
    }
  },[integrantes,idUsuario])

    const CrearGrupo = async (uid, url, nombre, descripcion, informacion,categoria) => {
        try {
            await firebase.db.collection("Grupo").add({
                nombre,
                informacion,
                descripcion,
                img: url,
                id_usuario: uid,
                clasificacion:categoria
            });
        } catch (error) {
            console.log(error);
        }
    };

    

    const crearPost=async(descripcion,url)=>{
        try {
            await firebase.db.collection('Post').add({
                descripcion,
                img:url,
                id_usuario:idUsuario[0],
                id_grupo:idGrupo
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    const subirImagen = async(uri) =>{
        const response = await fetch(uri);
        const blob = await response.blob();
        const sessionId = new Date().getTime();
        let ref = await firebase.storage.ref("Grupo").child(`${sessionId}`);
        await ref.put(blob);
        const url = await ref.getDownloadURL();
        setCargando(false);
        return url.toString();
    };

    const obtenerGrupos = () => {
        firebase.db.collection("Grupo").onSnapshot(manejarSnapshot);
    };

    const manejarSnapshot = (Snapshot) => {
        const resultadoGrupos = Snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        setGrupos(resultadoGrupos);
    }

    const obtenerGrupo=(id)=>{
        firebase.db.collection('Grupo').doc(id).get().then(snapshot=>{
            setGrupo(snapshot.data());
        })

        obtenerPosts(idGrupo);
    }

    const obtenerPosts=(idGrupo)=>{
        firebase.db.collection('Post').where("id_grupo","==",idGrupo).onSnapshot(manejarSnapshotPost);
    }

    const manejarSnapshotPost=async(snapShot)=>{
        const arregloPost=[];
        await Promise.all(snapShot.docs.map(async(doc)=>{
            const usuario = await firebase.db.collection('Usuarios').doc(doc.data().id_usuario).get().then(snapshot=>{
                    return {
                        id: doc.id,
                        usuario:snapshot.data().usuario,
                        imgUsuario:snapshot.data().img,
                        ...doc.data()
                    }
            });
            arregloPost.push(usuario);
        })
        )
        setPosts(arregloPost);
        obtenerIdUsuario();
    }

    const obtenerComentarios=(idPost)=>{
        firebase.db.collection('Comentarios').where("id_post","==",idPost).onSnapshot(manejarSnapshotComentario);
    }

    const manejarSnapshotComentario=async(snapShot)=>{
        const arregloComentarios=[];
        await Promise.all(snapShot.docs.map(async(doc)=>{
            const usuario = await firebase.db.collection('Usuarios').doc(doc.data().id_usuario).get().then(snapshot=>{
                    return {
                        id: doc.id,
                        usuario:snapshot.data().usuario,
                        imgUsuario:snapshot.data().img,
                        ...doc.data()
                    }
            });


            arregloComentarios.push(usuario);
        })
        )
        setComentarios(arregloComentarios);
    }

    const obtenerIdUsuario=async()=>{
        const {email} = await firebase.auth.currentUser;
        await firebase.db.collection('Usuarios').where("correo","==",email).onSnapshot(manejarSnapshotUsuarioId);
    }

    const manejarSnapshotUsuarioId=async(Snapshot)=>{
            const idUsuario=await Promise.all(Snapshot.docs.map(doc=>{
                return doc.id;
            }));
           setIdUsuario(idUsuario);

            verificarSubscripcion(idGrupo);
    };

    

    const verificarSubscripcion=async(idGrupo)=>{
        await firebase.db.collection('Integrantes').where("id_grupo","==",idGrupo).onSnapshot(manejarSnapshotSubcripcion);
    }

    const manejarSnapshotSubcripcion=async(Snapshot)=>{
        const integrantes =await Promise.all( Snapshot.docs.map(doc=>{
            return {
                id: doc.id, 
                ...doc.data()
            }
        }))
        setIntegrantes(integrantes);
    }

    const subscribirse=async(idGrupo,id_usuario)=>{
        try {
            await firebase.db.collection('Integrantes').add({
                id_grupo:idGrupo,
                id_usuario
            })
            setVerificado(true);
        }
        catch (error) {
            console.log(error);
        }
    }

    const obtenerHome=()=>{
        obtenerGrupo(idGrupo);
    }

    const agregarComentario=async(comentario,id_usuario,idPost)=>{
        try {
            await firebase.db.collection("Comentarios").add({
                comentario,
                id_post:idPost,
                id_usuario:id_usuario
            })
        } catch (error) {
            console.log(error);
        }
    }
    return {
        CrearGrupo,
        subirImagen,
        cargando,
        grupos,
        grupo,
        posts,
        idUsuario,
        verificado,
        integrantes,
        comentarios,
        obtenerGrupos,
        obtenerComentarios,
        subscribirse,
        obtenerHome,
        agregarComentario,
        crearPost
    }
}

export default useGrupos;

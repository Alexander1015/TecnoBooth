import React,{useEffect,useState} from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity,FlatList,TextInput,Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import useGrupos from '../hooks/useGrupos';

const schema = yup.object({
    descripcion: yup.string().required("La descripcion es obligatoria")
})

export const NewPost=({subirImagen,crearPost,setNuevoPost})=>{

    const [imagen, setImagen] = useState('');
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const { control, handleSubmit, formState: { errors },setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });        

        if (!result.cancelled) {
            setImage(result.uri);
            
            const url = await subirImagen(result.uri)
            setValue("foto",url);
        }
    };

    

    const submit=({descripcion,foto})=>{
        crearPost(descripcion,foto);
        setNuevoPost(false);
    }
 
    return(
        <View style={styles.container}>
            <View style={styles.contenedorImagen}>
                <TouchableOpacity style={styles.botonImagen} onPress={pickImage}>
                    <Text style={styles.textoImagen}>Agregar imagen</Text>
                </TouchableOpacity>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
            <View style={styles.info}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="descripcion"
                defaultValue=""
            />
            {errors.descripcion && <Text style={styles.textoError}>{errors.descripcion.message}</Text>}
            </View>
            <TouchableOpacity style={styles.botonImagen} onPress={handleSubmit(submit)}>
                <Text style={styles.textoImagen}>Agregar Post</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DBE5EA',
        margin: 15, borderRadius: 10,
        padding: 10
    },
    contenedorImagen:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 25,
    },
    botonImagen:{
        marginHorizontal: 25,
        backgroundColor: '#041F2E',
        paddingHorizontal: 5,
        paddingVertical: 7,
        borderRadius: 20,
    },
    textoImagen:{
        color: 'white',
        fontSize: 18,
        textAlign:'center'
    },
    img: {
        width: 200,
        height: 200
    },
    texto: {
        fontSize: 18,
    },
    usuario:{
        position:"absolute",
        top:5,
        left:10,
        fontSize:18,
        fontWeight:'bold',
    },
    info:{
        marginVertical:10
    },
    btnComentario:{
        marginVertical:10,
        paddingHorizontal:5,
      paddingVertical:10,
      backgroundColor:'#041F2E',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      marginHorizontal:10,
    },
    input:{
        paddingHorizontal:5,
        paddingVertical:10,
        fontSize:16,
        margin:5,
        backgroundColor:'white',
        borderRadius:20
    },
    textoError: {
        color: 'red',
        fontSize: 16,
        borderLeftWidth: 4,
        borderLeftColor: 'red',
        paddingLeft: 5,
        marginTop: -8,
    }
})
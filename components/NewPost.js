import React,{useEffect,useState} from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity,FlatList,TextInput,Platform, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import useGrupos from '../hooks/useGrupos';

const schema = yup.object({
    descripcion: yup.string().required("¡La descripcion es obligatoria!")
})

export const NewPost=({subirImagen,crearPost,setNuevoPost})=>{

    const [imagen, setImagen] = useState('');
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Lo sentimos, necesitamos acceso a tus imagenes para que esta característica funcione.');
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
            setValue("foto", url);
        }
    };
    const Alertaimagen = () => {
        Alert.alert('Error', 'Debe de colocar una imagen en el post.',[
            {text: 'Ok', onPress: () => console.log('alerta cerrada')},
        ])
    }
    

    const submit=({descripcion,foto})=>{
        if(image){
            crearPost(descripcion,foto);
            setNuevoPost(false); 
        }
        else{
            Alertaimagen();
        }
            
        
        
    }
 
    return(
        <View style={styles.container}>
            <View style={styles.contenedorImagen}>
                <TouchableOpacity style={styles.botonImagen} onPress={pickImage}>
                    <Text style={styles.textoImagen}>Agregar imagen</Text>
                </TouchableOpacity>
                {image && <Image source={{ uri: image }} style={styles.img} />}
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
            <TouchableOpacity style={styles.botoncancel} onPress={()=>{setNuevoPost(false)}}>
                <Text style={styles.textoImagen}>Cancelar</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    botonImagen:{
        marginHorizontal: 25,
        backgroundColor: '#041F2E',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 20,
        marginBottom:10,
    },
    botoncancel:{
        marginHorizontal: 25,
        backgroundColor: '#ed4256',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 20,
        marginBottom:10,
    },
    textoImagen:{
        color: 'white',
        fontSize: 18,
        textAlign:'center'
    },
    img: {
        width: 200,
        height: 200,
        borderRadius:10,
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
        backgroundColor:'white',
        borderRadius:20
    },
    textoError: {
        color: '#ed4256',
        fontSize: 16,
        paddingLeft: 5,
        margin:5,
        alignSelf:'center',
    }
})
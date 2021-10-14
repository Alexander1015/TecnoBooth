import React, { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { stylesnewgroup } from "../../../resources/styles/StyleNewGroup";
import { View, Text, ScrollView, Platform, TouchableOpacity, Image, TextInput } from "react-native";
import Styles from "../../../resources/styles/Dashboard";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";

import UseAutenticacion from '../../../hooks/UseAutenticacion';
import useGrupos from '../../../hooks/useGrupos';





const schema = yup.object({
    nombre: yup.string().required("El nombre es obligatorio"),
    descripcion: yup.string().required("La descripcion es obligatoria")
})
 const CreateGroupScreen = (route, {userEmail}) => {
    const { navigation } = route;
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const usuario = UseAutenticacion();
    const {CrearGrupo, subirImagen, cargando, grupos, obtenerGrupos} = useGrupos();
    
    
    console.log(grupos);
    useEffect(()=>{
        obtenerGrupos()
    },[])





const [imagen, setImagen] = useState('');

    if(usuario){
        console.log(usuario.uid);
    }

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
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        

        if (!result.cancelled) {
            setImage(result.uri);
            
            const url = await subirImagen(result.uri)
            console.log(url);
            setImagen(url);

            
        }
    };

    const submit =({nombre, descripcion, otraInfo})=> {
        if(usuario && !cargando){
            CrearGrupo(usuario.uid, imagen, nombre, descripcion, otraInfo);
        }
    }

 


    return (
        <View style={stylesnewgroup.container}>
            <ScrollView style={{flex: 1}} vertical>
                
                <View style={stylesnewgroup.contenedorImagen}>
                    <TouchableOpacity style={stylesnewgroup.botonImagen} onPress={pickImage}>
                        <Text style={stylesnewgroup.textoImagen}>Agregar imagen</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
                <View style={stylesnewgroup.containerForm}>
                        <View style={stylesnewgroup.viewInput}>
                        <Text style={stylesnewgroup.textInput}>
                            Agregar nombre
                        </Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={stylesnewgroup.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="nombre"
                        defaultValue=""
                    />
                    {errors.nombre && <Text style={stylesnewgroup.textoError}>{errors.nombre.message}</Text>}
                    </View>
            
               
                        <View style={stylesnewgroup.viewInput}>
                        <Text style={stylesnewgroup.textInput}>
                            Agregar descripcion
                        </Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                multiline
                                style={[stylesnewgroup.input, {height: 100}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="descripcion"
                        defaultValue=""
                    />
                     {errors.descripcion && <Text style={stylesnewgroup.textoError}>{errors.descripcion.message}</Text>}
                    </View>
                    
                   
                
          
                        <View style={stylesnewgroup.viewInput}>
                        <Text style={stylesnewgroup.textInput}>
                            Otra informacion
                        </Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                multiline
                                style={[stylesnewgroup.input, {height: 100}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="otraInfo"
                        defaultValue=""
                    />
                    </View>

                    {/*Medida de seguridad en caso de errores */}


                    {/*<View style={stylesnewgroup.viewInput}>
                        <Text style={stylesnewgroup.textInput}>
                            Url
                        </Text>
                        <TextInput
                                
                                multiline
                                style={[stylesnewgroup.input, {height: 100}]}
                                
                                onChangeText={(value)=>setImagen(value)}
                                value={imagen}
                            />
                            {imagen?(
                                <Image source={{uri: imagen}} style={{width: 200, height: 200}}/>
                            ):null}
                            </View>*/}

                </View>
                <TouchableOpacity style={stylesnewgroup.botonGuardar} onPress={handleSubmit(submit)}>
                        <Text style={stylesnewgroup.textoImagen}>Guardar grupo</Text>
                    </TouchableOpacity>
            </ScrollView>

        </View>

    );
}
export default CreateGroupScreen;
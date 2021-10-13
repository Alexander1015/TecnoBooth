import React, { useEffect, useState } from "react";
import {  View, Text, ScrollView, TouchableOpacity, Image, TextInput, Platform } from "react-native";
import Styles from "../../../resources/styles/Dashboard";
import {styleprofile} from "../../../resources/styles/styleProfile";
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen = ( props ) => {
    const { userEmail } = props;

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
        }
    };

    const submit =(data)=> {console.log(data)};

    return(
        <View style={ styleprofile.container }>
            <ScrollView vertical>
                <Text style={styleprofile.titulo}>Perfil del Usuario</Text>

                <View style={styleprofile.contenedorImagen}>
                    <TouchableOpacity style={styleprofile.botonImagen} onPress={pickImage}>
                        <Text style={styleprofile.textoImagen}>Agregar imagen de perfil</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ width: 150, height: 150,}} />}
                </View>

                <View style={styleprofile.viewInput}>
                    <Text style={styleprofile.textInput}>Nombre de usuario:</Text> 
                    <TextInput style={styleprofile.input} />
                </View>

                <View style={styleprofile.viewInput}>
                    <Text style={styleprofile.textInput}>Correo electronico:</Text> 
                    <TextInput style={styleprofile.input} />
                </View>

                <View style={styleprofile.viewInput}>
                    <Text style={styleprofile.textInput}>Contraseña:</Text> 
                    <TextInput style={styleprofile.input} />
                </View>

                <TouchableOpacity style={styleprofile.botonGuardar} >
                        <Text style={styleprofile.textoImagen}>Guardar cambios</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default ProfileScreen;
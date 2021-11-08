import React, { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { stylesnewgroup } from "../../../resources/styles/styleNewGroup";
import { View, Text, ScrollView, Platform, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import Styles from "../../../resources/styles/styleGruposMain";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

import UseAutenticacion from '../../../hooks/UseAutenticacion';
import useGrupos from '../../../hooks/useGrupos';


const AlertaConfirmacion = () => {
    Alert.alert('Creacion de grupo', 'Se ha creado el grupo correctamente',[
        {text: 'Ok', onPress: () => console.log('alerta cerrada')},
    ])
}



const schema = yup.object({
    nombre: yup.string().required("El nombre es obligatorio"),
    descripcion: yup.string().required("La descripcion es obligatoria"),
});
const CreateGroupScreen = (route) => {
    const { navigation } = route;
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const usuario = UseAutenticacion();
    const { CrearGrupo, subirImagen, cargando, grupos, obtenerGrupos } =
        useGrupos();

    //console.log(grupos);
    useEffect(() => {
        obtenerGrupos();
    }, []);

    const [imagen, setImagen] = useState("");
    const [categoria, setCategoria] = useState('Computadoras');

    if (usuario) {
        //console.log(usuario.uid);
    }

    const [image, setImage] = useState(null);
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
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

        //console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);

            const url = await subirImagen(result.uri);
           // console.log(url);
            setImagen(url);
        }
    };
    const Alertaimagen = () => {
        Alert.alert('Error', 'Debe de colocar una imagen de grupo.',[
            {text: 'Ok', onPress: () => console.log('alerta cerrada')},
        ])
    }

    const submit = ({ nombre, descripcion, otraInfo }) => {
        if(image){
            if (usuario && !cargando) {
                CrearGrupo(usuario.uid, imagen, nombre, descripcion, otraInfo,categoria);
                AlertaConfirmacion();
            }
        }else{
            Alertaimagen();
        }
    }

 


    return (
        <View style={stylesnewgroup.container}>
            <ScrollView style={{ flex: 1 }} vertical>
                <Text style={stylesnewgroup.titulo}>Crear un nuevo Grupo como Administrador</Text>
                <View style={stylesnewgroup.contenedorImagen}>
                    <View style={stylesnewgroup.viewbtndecor}>
                        <TouchableOpacity
                            style={stylesnewgroup.btn}
                            onPress={pickImage}
                        >
                            <View style={stylesnewgroup.btndecorado}>
                                <Text style={stylesnewgroup.txtbtn}>Agregar Imagen</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        image ? (
                            <Image
                                source={{ uri: image }}
                                style={{ width: 300, height: 200, resizeMode: "contain" }}
                            /> 
                        )
                        : (
                            <Image
                                source={require("../../../resources/img/group-default.png")}
                                style={{ width: 300, height: 200, resizeMode: "contain" }}
                            />
                        )
                    }
                </View>
                <View style={stylesnewgroup.containerForm}>
                    <View style={stylesnewgroup.viewInput}>
                        <Text style={stylesnewgroup.textInput}>Agregar nombre</Text>
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
                        {errors.nombre && (
                            <Text style={stylesnewgroup.textoError}>
                                {errors.nombre.message}
                            </Text>
                        )}
                    </View>
                    <View style={Styles.contenedorpicker}>
                            <Picker
                                style={Styles.estilopicker}
                                onValueChange={(txt) => setCategoria(txt)}
                                selectedValue={categoria}
                            >
                                <Picker.Item label="Computadoras" value="Computadoras" />
                                <Picker.Item label="Dispositivos Móviles" value="Dispositivos Móviles" />
                                <Picker.Item label="Electrónica" value="Electrónica" />
                                <Picker.Item label="Robótica" value="Robótica" />
                                <Picker.Item label="Varios" value="Varios" />
                                <Picker.Item label="Videojuegos" value="Videojuegos" />
                            </Picker>
                        </View>

                    <View style={stylesnewgroup.viewInput}>
                        <Text style={stylesnewgroup.textInput}>Agregar descripcion</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    multiline
                                    style={[stylesnewgroup.input, { height: 100 }]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="descripcion"
                            defaultValue=""
                        />
                        {errors.descripcion && (
                            <Text style={stylesnewgroup.textoError}>
                                {errors.descripcion.message}
                            </Text>
                        )}
                    </View>

                    <View style={stylesnewgroup.viewInput}>
                        <Text style={stylesnewgroup.textInput}>Otra informacion</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    multiline
                                    style={[stylesnewgroup.input, { height: 100 }]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="otraInfo"
                            defaultValue=""
                        />
                    </View>
                    {
                        /*Medida de seguridad en caso de errores */
                        /*
                            <View style={stylesnewgroup.viewInput}>
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
                                </View>
                        */
                    }
                    <View style={stylesnewgroup.viewbtndecor}>
                        <TouchableOpacity
                            style={stylesnewgroup.btn}
                            onPress={handleSubmit(submit)}
                        >
                            <View style={stylesnewgroup.btndecorado}>
                                <Text style={stylesnewgroup.txtbtn}>Guardar Grupo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default CreateGroupScreen;

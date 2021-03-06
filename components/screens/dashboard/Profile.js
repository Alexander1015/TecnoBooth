import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    Alert,
} from "react-native";
import { styleprofile } from "../../../resources/styles/styleProfile";
import * as ImagePicker from "expo-image-picker";
import UseUsuarios from "../../../hooks/UseUsuarios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import firebase from "../../../database/firebase";



import useGrupos from '../../../hooks/useGrupos';

const esquema = yup.object({
    nombre: yup.string().required("El nombre de usuario es obligatorio"),
    email: yup.string().email("El correo no es valido").required("El correo es obligatorio"),
    foto: yup.string().required("La foto del usuario es obligatoria"),
});

const AlertaConfirmacion = () => {
    Alert.alert("Actualizacion de datos", "Se actualizaron los datos", [
        { text: "Ok", onPress: () => console.log("alerta cerrada") },
    ]);
};

const ProfileScreen = (props) => {

    const { obtenerUsuario, usuario, cargando, ActualizarUsuario, subirImage, } = UseUsuarios();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        obtenerUsuario();
        setLoading(false);
    }, []);
    const { } = props;
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(esquema),
    });

    const { subirImagen,} =
        UseUsuarios();

    const [image, setImage] = useState(null);
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Se necesitan permisos para poder utilizar la camara o galeria."
                    );
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
        
        if (!result.cancelled) {
            
            const url = await subirImagen(result.uri);
            setImage(url);
            setValue('foto',url);
        }
    };

    const submit = ({ nombre, email,foto }) => {
        setLoading(true);
        ActualizarUsuario(nombre, email, foto, usuario.id);
        reset({
            nombre: "",
            email: "",
        });
        setLoading(false);
        AlertaConfirmacion();
    };

    const leeremail = async () => {
        setLoading(true);
        if (usuario.correo.trim() === "") {
            setLoading(false);
            console.log("No se ha recibido el email del usuario");
        } else {
            await firebase.auth
                .sendPasswordResetEmail()
                .then(() => {
                    setLoading(false);
                    alerta(
                        "Proceso exitoso",
                        "Se ha enviado un correo a su cuenta. Por favor sigue los pasos indicados"
                    );
                    navigation.navigate("index");
                })
                .catch((error) => {
                    setLoading(false);
                    if (error.code === "auth/invalid-email") {
                        alerta("Error", "El correo obtenido es invalido");
                    }
                });
        }
    };

    const alerta = (title, msg) => {
        Alert.alert(title, msg, [{ text: "Ok" }]);
    };

    
    return (
        <View style={styleprofile.container}>
            <ScrollView vertical style={styleprofile.scroll}>
                {!cargando && (
                    <>
                        <Text style={styleprofile.titulo}>Perfil del Usuario</Text>
                        <View style={styleprofile.contenedorImagen}>
                            <View style={styleprofile.viewbtndecor}>
                                <TouchableOpacity style={styleprofile.btn} onPress={pickImage}>
                                    <View style={styleprofile.btndecorado}>
                                        <Text style={styleprofile.txtbtn}>Cambiar Imagen</Text>
                                    </View>
                                </TouchableOpacity>
                                {errors.foto && (
                                    <Text style={styleprofile.textoError}>
                                        {errors.foto.message}
                                    </Text>
                                )}
                            </View>
                            {image ? (
                                <Image
                                    source={{ uri: image }}
                                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                                />
                            ) : usuario.img ? (
                                <Image
                                    source={{ uri: usuario.img }}
                                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                                />
                            ) : (
                                <Image
                                    source={require("../../../resources/img/user-default.png")}
                                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                                />
                            )}
                        </View>
                        <View style={styleprofile.containerForm}>
                            <View style={styleprofile.viewInput}>
                                <Text style={styleprofile.textInput}>Nombre de usuario:</Text>

                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styleprofile.input}
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                    name="nombre"
                                    defaultValue={usuario.usuario}
                                />
                                {errors.nombre && (
                                    <Text style={styleprofile.textoError}>
                                        {errors.nombre.message}
                                    </Text>
                                )}
                            </View>
                            <View style={styleprofile.viewInput}>
                                <Text style={styleprofile.textInput}>Correo electronico:</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styleprofile.input}
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                    name="email"
                                    defaultValue={usuario.correo}
                                />
                                {errors.email && (
                                    <Text style={styleprofile.textoError}>
                                        {errors.email.message}
                                    </Text>
                                )}
                            </View>
                            <View>
                                <View style={styleprofile.viewbtndecortot}>
                                    <TouchableOpacity
                                        style={styleprofile.btn}
                                        onPress={handleSubmit(submit)}
                                    >
                                        <View style={styleprofile.btndecorado}>
                                            <Text style={styleprofile.txtbtn}>Guardar Cambios</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styleprofile.viewbtndecortot}>
                                    <TouchableOpacity
                                        onPress={() => leeremail()}
                                        style={styleprofile.btn}
                                    >
                                        <View style={styleprofile.btndecorado}>
                                            <Text style={styleprofile.txtbtn}>
                                                Pedir cambio de Contrase??a
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;

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
import firebase from "../../../database/firebase";
import useAutenticacion from "../../../hooks/UseAutenticacion";
import UseUsuarios from "../../../hooks/UseUsuarios";
import { createIconSetFromFontello } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { string } from "yup/lib/locale";

const esquema = yup.object({
    nombre: yup.string().required("El nombre de usuario es obligatorio"),
    email: yup
        .string()
        .email("El correo no es valido")
        .required("El correo es obligatorio"),
    password: yup
        .string()
        .min(6, "El numero de caracteres minimos es 6")
        .max(50, "El numero de caracteres maximos es 50")
        .required("Contraseña obligatoria"),
});

const AlertaConfirmacion = () => {
    Alert.alert("Actualizacion de datos", "Se actualizaron los datos", [
        { text: "Ok", onPress: () => console.log("alerta cerrada") },
    ]);
};

const ProfileScreen = (props) => {
    const { obtenerUsuario, usuario, cargando, ActualizarUsuario } =
        UseUsuarios();
    useEffect(() => {
        obtenerUsuario();
    }, []);
    const { } = props;
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(esquema),
    });
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

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const submit = ({ nombre, email, password }) => {
        ActualizarUsuario(nombre, email, password, usuario.id);
        reset({
            nombre: "",
            email: "",
            password: "",
        });
        AlertaConfirmacion();
    };

    return (
        <View style={styleprofile.container}>
            <ScrollView vertical>
                {!cargando && (
                    <>
                        <Text style={styleprofile.titulo}>Perfil del Usuario</Text>

                        <View style={styleprofile.contenedorImagen}>
                            <TouchableOpacity
                                style={styleprofile.botonImagen}
                                onPress={pickImage}
                            >
                                <Text style={styleprofile.textoImagen}>
                                    Agregar imagen de perfil
                                </Text>
                            </TouchableOpacity>
                            {image && (
                                <Image
                                    source={{ uri: image }}
                                    style={{ width: 150, height: 150 }}
                                />
                            )}
                        </View>

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

                        <View style={styleprofile.viewInput}>
                            <Text style={styleprofile.textInput}>Contraseña:</Text>
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
                                name="password"
                                defaultValue={usuario.password}
                            />
                            {errors.password && (
                                <Text style={styleprofile.textoError}>
                                    {errors.password.message}
                                </Text>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styleprofile.botonGuardar}
                            onPress={handleSubmit(submit)}
                        >
                            <Text style={styleprofile.textoImagen}>Guardar cambios</Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;

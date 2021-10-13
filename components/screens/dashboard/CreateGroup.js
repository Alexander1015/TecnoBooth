import React from "react";
import {  View, Text, ScrollView } from "react-native";
import Styles from "../../../resources/styles/Dashboard";


const schema = yup.object({
    nombre: yup.string().required("El nombre es obligatorio"),
    descripcion: yup.string().required("La descripcion es obligatoria")
})

const CreateGroupScreen = (route) => {
    const { navigation } = route;
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
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



    return(
        <View style={ Styles.container }>
            <ScrollView vertical>
                <Text style={ Styles.texto }>Estamos en Dashboard</Text>
                <Text style={ Styles.texto }>Soy Crear tu propio Grupo</Text>
            </ScrollView>
        </View>
    );
}

export default CreateGroupScreen;
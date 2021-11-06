import React from "react";
import { View, Text, ScrollView, FlatList, Image,} from "react-native";
import Styles from "../../../resources/styles/styleDashboard";
import { styleprofile } from "../../../resources/styles/styleProfile";
import { Picker } from "@react-native-picker/picker";
import firebase from "../../../database/firebase";

const SettingScreen = (props) => {
    const { userEmail } = props;

    return (
        <View style={Styles.container}>
            <ScrollView vertical>
                <Text style={styleprofile.titulo}>Ajustes</Text>
                <View style={{padding:10}}>
                    <Text style={styleprofile.subTitulo}>Mostrar grupos con:</Text>
                </View>
                <View style={styleprofile.contenedorpicker}>
                    <Picker style={styleprofile.pickerDiseno}
                    >
                        <Picker.Item label="-Integrantes-" value="-Integrantes-"/>
                        <Picker.Item label="5 integrantes" value="5 integrantes"/>
                        <Picker.Item label="100 integrantes" value="100 integrantes"/>
                        <Picker.Item label="Sin limite de integrantes" value="sin limite de integrantes"/>
                    </Picker>
                </View>
                <View style={styleprofile.container}>
                    <Text style={styleprofile.subTitulo}>Acerca de TecnoBooth</Text>
                </View>
                <View style={styleprofile.contenedorImagen}>
                    <Image source={require('../../../resources/img/favicon.png')} style={styleprofile.imagenDiseno} />
                </View>
                <View style={styleprofile.container}>
                    <Text style={styleprofile.bordeTexto}>
                        TecnoBooth es una aplicación destinada al intercambio de información por parte de los 
                        usuarios, en donde se pueden crear temas/grupos/canales de intereses según los propios 
                        usuarios que te permita editarlo a gusto, en donde cada uno de los integrantes pueda 
                        compartir información sobre tecnología (ya sean posts, imágenes, pensamientos, información, 
                        link a alguna pagina, etc) y comentar sobre estos
                    </Text>
                </View>
                <View style={styleprofile.container}>
                    <Text style={styleprofile.subTitulo}>Desarrollado por:</Text>
                    <Text style={styleprofile.bordeTexto}>
                        <FlatList
                            data={[
                                {key: '• Luis Felipe Coto Arias'},
                                {key: '• Edgard Alexander Barrera Flamenco'},
                                {key: '• Bryan Armando Salinas Sanchez'},
                                {key: '• Josue Alexander Chavez Garcia'},
                            ]}
                            renderItem={({item}) => <Text style={styleprofile.texto}>{item.key} </Text>}
                        />
                    </Text>
                </View>
                <View style={styleprofile.container}>
                    <Text style={styleprofile.vercionApp}>
                        Verción de aplicación: 1.0
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default SettingScreen;

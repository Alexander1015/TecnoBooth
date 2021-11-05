import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
  } from "react-native";
  import { styles } from "../../../resources/styles/styleActivity";
  import firebase from "../../../database/firebase";

const ActivityScreen = (props) => {
    const { userEmail } = props;

    return (
      <View style={styles.container}>
        <ScrollView vertical style={styles.scroll}>
          <View style={styles.containgroup}>
            <View style={styles.containgrouptitle}>
              <Text style={styles.txttitle}>Mis posts en grupo A</Text>
            </View>
            <View style={styles.containpostbody}>
              <Image
                style={styles.img}
                source={require("../../../resources/img/group-default.png")}
              />
              <Text style={styles.txtdesctitle}>Descripción</Text>
              <Text style={styles.txtdesc}>
                Esta sería una Descripción. Así se vería si fuera una
                Descripción con más de una línea.
              </Text>
              <Text style={styles.txtdesctitle}>Comentarios</Text>
              <View style={styles.containusername}>
              <Text style={styles.txtusername}>Username</Text>
              </View>
              <Text style={styles.txtcomment}>
                  Comentario1
              </Text>
              <View style={styles.containusername}>
              <Text style={styles.txtusername}>Username2</Text>
              </View>
              <Text style={styles.txtcomment}>
                  Comentario2
              </Text>
            </View>
            
            <View style={styles.containpostbody}>
              <Image
                style={styles.img}
                source={require("../../../resources/img/group-default.png")}
              />
              <Text style={styles.txtdesctitle}>Descripción</Text>
              <Text style={styles.txtdesc}>
                Esta sería una Descripción. Así se vería si fuera una
                Descripción con más de una línea.
              </Text>
            </View>
          </View>
          <View style={styles.containgroup}>
            <View style={styles.containgrouptitle}>
              <Text style={styles.txttitle}>Mis posts en grupo B</Text>
            </View>
            <View style={styles.containpostbody}>
              <Image
                style={styles.img}
                source={require("../../../resources/img/group-default.png")}
              />
              <Text style={styles.txtdesctitle}>Descripción</Text>
              <Text style={styles.txtdesc}>
                Esta sería una Descripción. Así se vería si fuera una
                Descripción con más de una línea.
              </Text>
              
            </View>
          </View>
        </ScrollView>
      </View>
    );
};

export default ActivityScreen;

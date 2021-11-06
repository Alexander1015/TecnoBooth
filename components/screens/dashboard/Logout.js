import React, { useEffect } from "react";
import firebase from "../../../database/firebase";
import Load from "../../Load";

const LogoutScreen = (route) => {
    const { navigation } = route;
    useEffect(() => {
        firebase.auth
            .signOut()
            .then(() => navigation.navigate("public"))
            .catch(() => navigation.navigate("dashboard"));
    }, [navigation]);
    return <Load />;
};

export default LogoutScreen;

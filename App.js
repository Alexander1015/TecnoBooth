import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./components/navigation/Navigation";

const App = () => {
    return(
        <NavigationContainer>
            <Navigation></Navigation>
        </NavigationContainer>
    );
}

export default App;
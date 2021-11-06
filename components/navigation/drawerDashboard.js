import React from "react";
import { Text, Image, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import IndexScreen from "./stackIndex";
import MySuscriptionsScreen from "./stackMisSuscripciones";
import MyGroupsScreen from "./stackMisGrupos";
import ActivityScreen from "../screens/dashboard/Activity";
import ProfileScreen from "../screens/dashboard/Profile";
import CreateGroupScreen from "../screens/dashboard/CreateGroup";
import SettingScreen from "../screens/dashboard/Setting";
import LogoutScreen from "../screens/dashboard/Logout";
import Colors from "../../resources/utils/Colors";
import Styles from "../../resources/styles/styleNavigation";

const Drawer = createDrawerNavigator();

const DashboardNav = () => {
    return (
        <Drawer.Navigator
            initialRouteName="index"
            screenOptions={{
                drawerType: "slide",
                drawerPosition: "left",
                drawerStyle: Styles.navbar,
                headerStyle: Styles.backheader,
                headerTitle: () => (
                    <>
                        <View style={Styles.navbarcontain}>
                            <View>
                                <Text style={Styles.titheader}>TecnoBooth</Text>
                            </View>
                            <View style={Styles.navcontainimg}>
                                <Image
                                    style={Styles.navimg}
                                    source={require("../../resources/img/favicon.png")}
                                />
                            </View>
                        </View>
                    </>
                ),
                headerShown: true,
                swipeEnabled: false,
            }}
        >
            <Drawer.Screen
                name="index"
                component={IndexScreen}
                options={{
                    title: "Inicio",
                    drawerIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="home"
                            size={focused ? 30 : 20}
                            color={focused ? Colors.PRIMARY_COLOR : Colors.SECUNDARY_COLOR}
                        />
                    ),
                    drawerActiveTintColor: Colors.PRIMARY_COLOR,
                    drawerInactiveTintColor: Colors.SECUNDARY_COLOR,
                    drawerActiveBackgroundColor: Colors.SECUNDARY_COLOR,
                    drawerInactiveBackgroundColor: Colors.PRIMARY_COLOR,
                }}
            />
            <Drawer.Screen
                name="mysuscriptions"
                component={MySuscriptionsScreen}
                options={{
                    title: "Mis Suscripciones",
                    drawerIcon: ({ focused }) => (
                        <FontAwesome5
                            name="address-book"
                            size={focused ? 30 : 20}
                            color={focused ? Colors.PRIMARY_COLOR : Colors.SECUNDARY_COLOR}
                        />
                    ),
                    drawerActiveTintColor: Colors.PRIMARY_COLOR,
                    drawerInactiveTintColor: Colors.SECUNDARY_COLOR,
                    drawerActiveBackgroundColor: Colors.SECUNDARY_COLOR,
                    drawerInactiveBackgroundColor: Colors.PRIMARY_COLOR,
                }}
            />
            <Drawer.Screen
                name="mygroups"
                component={MyGroupsScreen}
                options={{
                    title: "Mis Grupos",
                    drawerIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="account-group"
                            size={focused ? 30 : 20}
                            color={focused ? Colors.PRIMARY_COLOR : Colors.SECUNDARY_COLOR}
                        />
                    ),
                    drawerActiveTintColor: Colors.PRIMARY_COLOR,
                    drawerInactiveTintColor: Colors.SECUNDARY_COLOR,
                    drawerActiveBackgroundColor: Colors.SECUNDARY_COLOR,
                    drawerInactiveBackgroundColor: Colors.PRIMARY_COLOR,
                }}
            />
            <Drawer.Screen
                name="activity"
                component={ActivityScreen}
                options={{
                    title: "Activity",
                    drawerIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="bell"
                            size={focused ? 30 : 20}
                            color={focused ? Colors.PRIMARY_COLOR : Colors.SECUNDARY_COLOR}
                        />
                    ),
                    drawerActiveTintColor: Colors.PRIMARY_COLOR,
                    drawerInactiveTintColor: Colors.SECUNDARY_COLOR,
                    drawerActiveBackgroundColor: Colors.SECUNDARY_COLOR,
                    drawerInactiveBackgroundColor: Colors.PRIMARY_COLOR,
                }}
            />
            <Drawer.Screen
                name="creategroup"
                component={CreateGroupScreen}
                options={{
                    title: "Crea tu propio Grupo",
                    drawerIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="lightbulb-group-outline"
                            size={focused ? 30 : 20}
                            color={focused ? Colors.PRIMARY_COLOR : Colors.SECUNDARY_COLOR}
                        />
                    ),
                    drawerActiveTintColor: Colors.PRIMARY_COLOR,
                    drawerInactiveTintColor: Colors.SECUNDARY_COLOR,
                    drawerActiveBackgroundColor: Colors.SECUNDARY_COLOR,
                    drawerInactiveBackgroundColor: Colors.PRIMARY_COLOR,
                }}
            />
            <Drawer.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                    title: "Perfil",
                    drawerIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="face"
                            size={focused ? 30 : 20}
                            color={focused ? Colors.PRIMARY_COLOR : Colors.SECUNDARY_COLOR}
                        />
                    ),
                    drawerActiveTintColor: Colors.PRIMARY_COLOR,
                    drawerInactiveTintColor: Colors.SECUNDARY_COLOR,
                    drawerActiveBackgroundColor: Colors.SECUNDARY_COLOR,
                    drawerInactiveBackgroundColor: Colors.PRIMARY_COLOR,
                }}
            />
            <Drawer.Screen
                name="setting"
                component={SettingScreen}
                options={{
                    title: "Ajustes",
                    drawerIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="cog"
                            size={focused ? 30 : 20}
                            color={focused ? Colors.PRIMARY_COLOR : Colors.SECUNDARY_COLOR}
                        />
                    ),
                    drawerActiveTintColor: Colors.PRIMARY_COLOR,
                    drawerInactiveTintColor: Colors.SECUNDARY_COLOR,
                    drawerActiveBackgroundColor: Colors.SECUNDARY_COLOR,
                    drawerInactiveBackgroundColor: Colors.PRIMARY_COLOR,
                }}
            />
            <Drawer.Screen
                name="logout"
                component={LogoutScreen}
                options={{
                    title: "Cerrar Sesión",
                    drawerIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="exit-to-app"
                            size={focused ? 30 : 20}
                            color={focused ? Colors.PRIMARY_COLOR : Colors.SECUNDARY_COLOR}
                        />
                    ),
                    drawerActiveTintColor: Colors.PRIMARY_COLOR,
                    drawerInactiveTintColor: Colors.SECUNDARY_COLOR,
                    drawerActiveBackgroundColor: Colors.SECUNDARY_COLOR,
                    drawerInactiveBackgroundColor: Colors.PRIMARY_COLOR,
                }}
            />
        </Drawer.Navigator>
    );
};

export default DashboardNav;

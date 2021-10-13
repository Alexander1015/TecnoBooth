import React from 'react';
import Info from '../screens/Info';
import Home from '../screens/Home';
import Integ from '../screens/Integ';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons,FontAwesome5 } from '@expo/vector-icons';
import InfoStack from './InfoStack';
import HomeStack from './HomeStack';
import IntegStack from './IntegStack';




const Tab=createBottomTabNavigator();
export default function Navigation(){
return(
<Tab.Navigator
 initialRouteName="Información"
 screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
              iconColor = focused ? '#041F2E' : 'gray'
            } else if (route.name === 'Información') {
              iconName = focused ? 'info-circle' : 'info-circle';
              iconColor = focused ? '#041F2E' : 'gray'
            }else{
              iconName = focused ? 'users' : 'users';
              iconColor = focused ? '#041F2E' : 'gray'
            }
            return <FontAwesome5 name={iconName} size={size} color={iconColor} />;
          },
          tabBarActiveTintColor: '#041F2E',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
<Tab.Screen  name="Home" component={HomeStack}/>
<Tab.Screen name="Información" component={InfoStack}/>
<Tab.Screen name="Integrantes" component={IntegStack}/>
</Tab.Navigator>
);
}
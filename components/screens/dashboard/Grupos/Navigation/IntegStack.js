import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Integ from '../screens/Integ';
const Stack= createStackNavigator();
export default function IntegStack(){
 return(
 <Stack.Navigator>
 <Stack.Screen name="Integ" component={Integ}
options={{title:'Integ', headerShown: false,}}/>
 </Stack.Navigator>
 );
}
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Info from '../screens/Info';
const Stack= createStackNavigator();
export default function InfoStack(){
 return(
 <Stack.Navigator>
 <Stack.Screen name="Info" component={Info}
options={{title:'Info', headerShown: false,}}/>
 </Stack.Navigator>
 );
}
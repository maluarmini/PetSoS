import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './pages/CreateHome'; 
import Create from './pages/CreateSoS';
import MapPage from './pages/Map';
import Detail from './pages/Detail';


export default function Routes(){
    return (
        <NavigationContainer>
            <Stack.Navigator 
            headerMode="none"
            screenOptions={{cardStyle:{
                backgroundColor:'#f0f0f5' 
            }}}>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Create" component={Create}/>
                <Stack.Screen name="MapPage" component={MapPage}/>
                <Stack.Screen name="Detail" component={Detail}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
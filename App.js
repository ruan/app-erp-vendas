import React from 'react';
import Home from './src/pages/Home';
import Product from './src/pages/Product';
import Products from './src/pages/Products';
import Sales from './src/pages/Sales';
import Sell from './src/pages/Sell';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Sales" component={Sales} />
          <Stack.Screen name="Sell" component={Sell} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}



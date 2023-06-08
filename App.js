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
          <Stack.Screen name="Inicio" component={Home} />
          <Stack.Screen name="Produtos" component={Products} />
          <Stack.Screen name="Cadastrar produto" component={Product} />
          <Stack.Screen name="Histórico de vendas" component={Sales} />
          <Stack.Screen name="Carrinho" component={Sell} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}



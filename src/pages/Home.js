import React from 'react';
import {PressableButton} from '../components/PressableButton';
import Container from '../components/Container';
import { useNavigation } from '@react-navigation/core';
const Home = () => {
  const {navigate} = useNavigation()
  const goTo = (page) => {
    navigate(page)
  }
  return (
    <Container>
      <PressableButton onPress={() => goTo('Products')} title='Produtos'></PressableButton>
      <PressableButton onPress={() => goTo('Product')} title='Cadastrar Produto'></PressableButton>
      <PressableButton onPress={() => goTo('Sales')} title='Vendas do Mês'></PressableButton>
      <PressableButton onPress={() => goTo('Sell')} title='Vender'></PressableButton>
    </Container>
  )
}
export default Home
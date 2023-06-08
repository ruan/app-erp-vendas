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
      <PressableButton onPress={() => goTo('Produtos')} title='Produtos'></PressableButton>
      <PressableButton onPress={() => goTo('Cadastrar produto')} title='Cadastrar Produto'></PressableButton>
      <PressableButton onPress={() => goTo('Histórico de vendas')} title='Histórico de vendas'></PressableButton>
      <PressableButton onPress={() => goTo('Carrinho')} title='Vender'></PressableButton>
    </Container>
  )
}
export default Home
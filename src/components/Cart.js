import styled from 'styled-components/native';
import { PressableButton } from './PressableButton';
import { ModalInput } from './ModalInput';
import DropdownSelect from 'react-native-input-select';
import { useState } from 'react';

const FlatList = styled.FlatList`
  border-radius: 10px;
  background: #fff;
  margin-bottom: 30px;
`;
const Item = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width:1px;
  border-bottom-color: #dadada;
`;

const Text = styled.Text`
  font-size:20px;
`;


const Header = () => (
  <Item>
    <Text>Nome</Text>
    <Text>Quantidade</Text>
  </Item>
)

const Footer = (value) => (
  <Item>
    <Text></Text>
    <Text>Total: R$ {value}</Text>
  </Item>
)

const calcValue = (items) => items.reduce((prevItem, currentValue) => prevItem + currentValue.amount * currentValue.price, 0)


export const Cart = ({ items, onAddProduct, onDoneSell, onChangePaymentMethod, paymentMethod }) => {
  const totalPrice = calcValue(items).toFixed(2)

  return (
  <>
    <FlatList
      data={items}
      ListHeaderComponent={Header}
      ListFooterComponent={Footer(totalPrice)}
      renderItem={({ item }) => (
        <Item>
          <Text>{item.name}</Text>
          <Text>{item.amount}</Text>
        </Item>
      )}
      keyExtractor={item => item.id}
    >
    </FlatList>
    <DropdownSelect
      placeholder="Escolha o método de pagamento"
      options={[
        { name: 'Débito', code: 'Débito' },
        { name: 'Crédito', code: 'Crédito' },
        { name: 'Pix', code: 'Pix' },
        { name: 'Dinheiro', code: 'Dinheiro' }
      ]}
      optionLabel={'name'}
      optionValue={'code'}
      selectedValue={paymentMethod}
      onValueChange={(value) => onChangePaymentMethod(value)}
      primaryColor={'green'}
    />
    <PressableButton onPress={onDoneSell} title={'Finalizar compra'}></PressableButton>
    <PressableButton onPress={onAddProduct} title={'Adicionar produto'}></PressableButton>
  </>
  )
}

import styled from 'styled-components/native';
import { PressableButton } from './PressableButton';
import { ModalInput } from './ModalInput';

const FlatList = styled.FlatList`
  border-radius: 10px;
  background: #fff;
`;
const Item = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
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

const Footer = () => (
  <Item>
    <Text></Text>
    <Text>Total: R$ 100,00</Text>
  </Item>
)

export const Cart = ({items, onAddProduct, onDoneSell}) => (
  <>
    <FlatList
      data={items}
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      renderItem={({ item }) => (
        <Item>
          <Text>{item.name}</Text>
          <Text>{item.amount}</Text>
        </Item>
      )}
      keyExtractor={item => item.id}
    >
    </FlatList>
    <PressableButton onPress={onDoneSell} title={'Finalizar compra'}></PressableButton>
    <PressableButton onPress={onAddProduct} title={'Adicionar produto'}></PressableButton>
  </>
)

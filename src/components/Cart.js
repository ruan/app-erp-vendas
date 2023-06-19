import styled from 'styled-components/native';
import { PressableButton } from './PressableButton';
import DropdownSelect from 'react-native-input-select';

const FlatList = styled.FlatList`
  border-radius: 10px;
  margin-bottom: 30px;
`;
const Item = styled.View`
  padding: 20px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  border-bottom-width:1px;
  border-bottom-color: #dadada;
`;
const Text = styled.Text`
  vertical-align: middle;
  max-width:70%;
  font-size:20px;
`;

const FooterButtons = styled.View`
  padding: 15px 0;
`;


const Header = () => (
  <Item>
    <Text>Produto</Text>
    <Text>Quantidade</Text>
  </Item>
)

const Footer = (value, onAddProduct, onDoneSell, onChangePaymentMethod, paymentMethod) => (
  <>
    <Item>
      <Text></Text>
      <Text>Total: R$ {value}</Text>
    </Item>
    <FooterButtons>
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
    </FooterButtons>
  </>
)

const calcValue = (items) => items.reduce((prevItem, currentValue) => prevItem + currentValue.value, 0)


export const Cart = ({ items, onAddProduct, onDoneSell, onChangePaymentMethod, paymentMethod }) => {
  const totalPrice = calcValue(items).toFixed(2)

  return (
    <FlatList
      data={items}
      ListHeaderComponent={Header}
      ListFooterComponent={Footer(totalPrice, onAddProduct, onDoneSell, onChangePaymentMethod, paymentMethod)}
      renderItem={({ item }) => (
        <Item>
          <Text>{item.name}</Text>
          <Text>{item.amount} {item.measurement}</Text>
        </Item>
      )}
      keyExtractor={(item, index) => index}
    >
    </FlatList>
  )
}

import moment from 'moment-timezone';
import 'moment/locale/pt-br'
moment.locale('pt-br')
import styled from 'styled-components/native';

const FlatList = styled.FlatList`
  background-color: #fff;
  border-radius: 10px;
`;
const Item = styled.View`
  padding: 10px 20px;
  border-bottom-width: 1px;
  border-color: #ccc;
`;

const Products = styled.Text`
  font-size:15px;
  padding: 15px 0 0;
`;
const Date = styled.Text`
  font-size:15px;
  `;
const Value = styled.Text`
  font-size:15px;
  font-weight: bold;
  `;
const Payment = styled.Text`
  font-size:15px;
  font-weight: bold;
`;
const calcValue = (items) => items.reduce((prevItem, currentValue) => prevItem + currentValue.value, 0).toFixed(2)

export const ListSales = ({items}) => (
  <FlatList
    data={items}
    renderItem={({ item }) => (
      <Item>
        <Payment>Forma de pagamento: {item.payment_method}</Payment>
        <Date>Data: {moment.tz(item.create_at, 'UTC').tz('America/Sao_Paulo').format('DD MMMM YYYY - HH:mm:ss')}</Date>
        <Products>
          {item.products.map(product => `${product.name} - ${product.amount} ${product.measurement} - R$${product.value.toFixed(2)} \n`)}
        </Products>
        <Value>Total: R${calcValue(item.products)}</Value>
      </Item>
    )}
    keyExtractor={item => item.id}
  >
  </FlatList>
)

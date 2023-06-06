import styled from 'styled-components/native';

const FlatList = styled.FlatList`

`;
const Item = styled.View`

`;
const Product = styled.Text`
  font-size:20px;
  padding: 10px 0;
`;

export const Cart = ({items}) => (
  <FlatList
    data={items}
    renderItem={({ item }) => (
      <Item>
        <Product>{item.name}</Product>
      </Item>
    )}
    keyExtractor={item => item.id}
  >
  </FlatList>
)

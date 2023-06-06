import styled from 'styled-components/native';

const FlatList = styled.FlatList`

`;
const Product = styled.Text`
  font-size:20px;
  padding: 10px 0;
`;

export const ListProducts = ({items}) => (
  <FlatList
    data={items}
    renderItem={({ item }) => <Product>{item.name}</Product>}
    keyExtractor={item => item.id}
  >
  </FlatList>
)

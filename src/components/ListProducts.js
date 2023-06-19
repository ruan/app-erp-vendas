import styled from 'styled-components/native';

const FlatList = styled.FlatList`
  background-color: #fff;
  border-radius: 10px;
`;
const Item = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  border-bottom-width: 1px;
  border-color: #ccc;
`;
const Product = styled.Text`
  font-size:20px;
`;

export const ListProducts = ({items, onPressItem}) => (
  <FlatList
    data={items}
    renderItem={({ item }) => (
      <Item onPress={() => onPressItem(item)}>
        <Product>{item.name}</Product>
        <Product>R$ {item.price}</Product>
      </Item>
    )}
    keyExtractor={item => item.id}
  >
  </FlatList>
)

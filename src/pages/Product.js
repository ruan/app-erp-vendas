import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { Title } from '../components/Title';
import { Input } from '../components/Input';
import {PressableButton} from '../components/PressableButton';
import database from '../database';
const Product = () => {
  const [name, setName] = useState(null);
  const [code, setCode] = useState(null);
  const [price, setPrice] = useState(null);

  const add = ({name, code, price}) => {
    if (!name || !code || !price) {
      return false;
    }
    database.transaction(
      (tx) => {
        tx.executeSql("insert into products (code, name, price) values (?, ?, ?)", [code, name, price.replace(',','.')]);
        setCode(null)
        setName(null)
        setPrice(null)
        console.log('click add', name, code, price)
        tx.executeSql("select * from products", [], (_, { rows }) =>
          console.log('list',JSON.stringify(rows))
        );
      },
      (error => console.log(error))
    );
  };

  return (
    <Container>
      <Input placeholder='Nome' value={name} onChangeText={(text) => setName(text)} />
      <Input placeholder='Código' keyboardType='number-pad' value={code} onChangeText={(text) => setCode(text)} />
      <Input placeholder='Preço' keyboardType='decimal-pad' value={price} onChangeText={(text) => setPrice(text)} />
      <PressableButton title={'Salvar'} onPress={() => add({name, code, price})}></PressableButton>
    </Container>
  )
}
export default Product
import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { ListProducts } from '../components/ListProducts';
import { useNavigation } from '@react-navigation/core';

import * as SQLite from "expo-sqlite";
function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => { },
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

const Products = () => {
  const [products, setProducts] = useState([]);
  const { navigate } = useNavigation()

  const onPressProduct = (product) => {
    navigate('Cadastrar produto', {id:product.id})
  }

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from products order by name asc", [], (_, { rows }) => {
        setProducts(rows._array)
      });
    });
  }, []);

  return (
    <Container>
      <ListProducts
        onPressItem={onPressProduct}
        items={products}
      ></ListProducts>
    </Container>
  )
}
export default Products
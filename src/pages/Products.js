import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { Title } from '../components/Title';
import { ListProducts } from '../components/ListProducts';

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
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from products", [], (_, { rows }) => {
        setProducts(rows._array)
      });
    });
  }, []);

  return (
    <Container>
      <Title>Produtos</Title>
      <ListProducts
        items={products}
      ></ListProducts>
    </Container>
  )
}
export default Products
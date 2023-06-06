import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { Title } from '../components/Title';
import { Cart } from '../components/Cart';
import { BarcodeScanner } from '../components/BarcodeScanner';
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

const Sell = () => {
  const [scanned, setScanned] = useState(false);
  const [cart, setCart] = useState([]);
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    db.transaction((tx) => {
      tx.executeSql(`select * from products where code == ${data}`, [], (_, { rows }) => {
        setTimeout(() => setScanned(false), 5000);
        console.log(rows, cart.find(item => {
          console.log(item, rows._array[0].id)
          return item.id === rows._array[0].id
        }))
        if (!!cart.find(item => item.id === rows._array[0].id)){
          return
        }
        if (rows._array[0]) {
          setCart([...cart, rows._array[0]])
        } else {
          alert(`Código nao cadastrado`);
        }
      });
    });
  };
  return (
    <Container>
      <Title>Venda</Title>
      <Cart items={cart}></Cart>
      <BarcodeScanner handleBarCodeScanned={handleBarCodeScanned} scanned={scanned}></BarcodeScanner>
    </Container>
  )
}
export default Sell
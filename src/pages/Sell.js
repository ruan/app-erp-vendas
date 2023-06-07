import React, { useCallback, useState } from 'react';
import Container from '../components/Container';
import { Title } from '../components/Title';
import { Cart } from '../components/Cart';
import { BarcodeScanner } from '../components/BarcodeScanner';
import * as SQLite from "expo-sqlite";
import { ModalInput } from '../components/ModalInput';
import { Input } from '../components/Input';
import { PressableButton } from '../components/PressableButton';
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
  const [showScan, setShowScan] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});

  const handleDoneSell = () => {
    console.log('compra finalizada')
  }
  const handleAddProduct = () => {
    console.log('handleAddProduct')
    setShowScan(true)
  }
  const handleBarCodeScanned = ({ data }) => {
    setShowScan(false);
    console.log(' handleBarCodeScanned' , data)
    db.transaction((tx) => {
      tx.executeSql(`select * from products where code == ${data}`, [], (_, { rows }) => {
        if (!!cart.find(item => item.id === rows._array[0].id)){
          return
        }
        if (rows._array[0]) {
          setCurrentProduct({ id: rows._array[0].id, name: rows._array[0].name })
          setShowModal(true)
          // setCart([...cart, rows._array[0]])
        } else {
          alert(`Código nao cadastrado`);
        }
      });
    });
  };

  const handleAmountSet = useCallback(() => {
    if (amount) {
      const currProduct = { ...currentProduct, amount }
      setCurrentProduct(null)
      setShowModal(false)
      setAmount(null)
      addItemCart(currProduct)
    }
  }, [amount, currentProduct, addItemCart, setCurrentProduct, setShowModal, setAmount])

  const addItemCart = useCallback((product) => {
    setCart([...cart, product])
  }, [cart,setCart])

  return (
    <>
      <Container>
        <Title>Venda</Title>
        <Cart items={cart} onAddProduct={handleAddProduct} onDoneSell={handleDoneSell}></Cart>
      </Container>
      <ModalInput visible={showModal}>
        <Input keyboardType={'numeric'} onChangeText={(text) => { setAmount(text) }} value={amount} placeholder='Insira a quantidade' ></Input>
        <PressableButton onPress={handleAmountSet} title={'Fechar'}></PressableButton>
      </ModalInput>
      {showScan && <BarcodeScanner handleBarCodeScanned={handleBarCodeScanned}></BarcodeScanner> }
    </>
  )
}
export default Sell
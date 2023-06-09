import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import Container from '../components/Container';
import { Title } from '../components/Title';
import { Cart } from '../components/Cart';
import { BarcodeScanner } from '../components/BarcodeScanner';
import { ModalInput } from '../components/ModalInput';
import { Input } from '../components/Input';
import { PressableButton } from '../components/PressableButton';
import database from '../database';
import { useNavigation } from '@react-navigation/core';

const Sell = () => {
  const [showScan, setShowScan] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [amount, setAmount] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [paymentMethod, setPaymentMethod] = useState();
  const { navigate } = useNavigation()

  const handleDoneSell = useCallback(() => {
    if (!cart.length || !paymentMethod) {
      return Alert.alert('Adicione algum produto e escolha o método de pagamento')
    }
    database.transaction((tx) => {
      tx.executeSql("insert into sales (products, payment_method) values (?, ?)", [JSON.stringify(cart), paymentMethod], () => {
        setCart([])
        setShowModalSuccess(true)
      }, error => {
        Alert.alert('Algo deu errado tente novamente');
        console.log('Error handleDoneSell', error);
      });
    })

  }, [cart, paymentMethod, setCart])
  const handleAddProduct = () => {
    setShowScan(true)
  }
  const handleBarCodeScanned = ({ data }) => {
    setShowScan(false);
    database.transaction((tx) => {
      tx.executeSql(`select * from products where code == ${data}`, [], (_, { rows }) => {
        if (!!cart.find(item => item.id === rows._array[0].id)){
          return
        }
        if (rows._array[0]) {
          setCurrentProduct({ ...rows._array[0] })
          setShowModal(true)
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

  const handleCloseModalSuccess = () => {
    setShowModalSuccess(false)
    navigate('Inicio')
  }

  const onChangePaymentMethod = (value) => {
    console.log(value)
    setPaymentMethod(value)
  }

  const addItemCart = useCallback((product) => {
    setCart([...cart, product])
  }, [cart,setCart])

  return (
    <>
      <Container>
        <Cart items={cart} onAddProduct={handleAddProduct} onDoneSell={handleDoneSell} paymentMethod={paymentMethod} onChangePaymentMethod={onChangePaymentMethod}></Cart>
      </Container>
      <ModalInput visible={showModal}>
        <Input keyboardType={'numeric'} onChangeText={(text) => { setAmount(text) }} value={amount} placeholder='Insira a quantidade'></Input>
        <PressableButton onPress={handleAmountSet} title={'Salvar'}></PressableButton>
      </ModalInput>
      <ModalInput visible={showModalSuccess}>
        <Title>Compra Finalizada com sucesso!</Title>
        <PressableButton onPress={handleCloseModalSuccess} title={'Ok'}></PressableButton>
      </ModalInput>
      {showScan && <BarcodeScanner handleBarCodeScanned={handleBarCodeScanned}></BarcodeScanner> }
    </>
  )
}
export default Sell
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
import { getCodeFromBarCode, getProductInfoFromBarCode, getProductValueFromAmount } from '../common/utils';

const Sell = () => {
  const [showScan, setShowScan] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCode, setShowModalCode] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [amount, setAmount] = useState(null);
  const [barCode, setBarCode] = useState(null);
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
    getProductByCode(data)
  };

  const getProductByCode= (barCode) => {
    const productCode = getCodeFromBarCode(barCode)
    database.transaction((tx) => {
      tx.executeSql(`select * from products where code == ${productCode}`, [], (_, { rows }) => {
        if (rows._array.length) {
          const product = {...rows._array[0]}
          if (barCode){
            const { value, amount } = getProductInfoFromBarCode(barCode, product)
            product.value = value
            product.amount = amount
          }
          if (!product.value || !product.amount) {
            setShowModal(true)
          } else {
            addItemCart(product)
          }
          setCurrentProduct(product)
          setBarCode(null)
          setShowModalCode(false)
        } else {
          alert(`Código nao cadastrado`);
        }
      });
    });
  }

  const handleAmountSet = useCallback(() => {
    if (amount) {
      const product = getProductValueFromAmount(amount, {...currentProduct})
      const currProduct = { ...currentProduct, ...product }
      setCurrentProduct(null)
      setShowModal(false)
      setAmount(null)
      addItemCart(currProduct)
    }
  }, [amount, currentProduct, addItemCart, setCurrentProduct, setShowModal, setAmount])

  const handleCloseModalSuccess = () => {
    setShowModalSuccess(false)
    navigate('Vibe Natural')
  }

  const onChangePaymentMethod = (value) => {
    setPaymentMethod(value)
  }

  const addItemCart = useCallback((product) => {
    setCart([...cart, product])
  }, [cart,setCart])

  const handlePressDigitCode = () => {
    setShowScan(false);
    setShowModalCode(true)
  }
  const handleCodeSet = useCallback(() => {
    getProductByCode(barCode)
  }, [barCode])

  return (
    <>
      <Container>
        <Cart items={cart} onAddProduct={handleAddProduct} onDoneSell={handleDoneSell} paymentMethod={paymentMethod} onChangePaymentMethod={onChangePaymentMethod}></Cart>
      </Container>
      <ModalInput visible={showModal}>
        <Input keyboardType={'decimal-pad'} onChangeText={(text) => { setAmount(text) }} value={amount} placeholder='Insira a quantidade'></Input>
        <PressableButton onPress={handleAmountSet} title={'OK'}></PressableButton>
      </ModalInput>
      <ModalInput visible={showModalCode}>
        <Input keyboardType={'number-pad'} onChangeText={(text) => { setBarCode(text) }} value={barCode} placeholder='Insira o código do produto'></Input>
        <PressableButton onPress={handleCodeSet} title={'OK'}></PressableButton>
      </ModalInput>
      <ModalInput visible={showModalSuccess}>
        <Title>Compra Finalizada com sucesso!</Title>
        <PressableButton onPress={handleCloseModalSuccess} title={'OK'}></PressableButton>
      </ModalInput>
      {showScan && <BarcodeScanner onPressDigitCode={handlePressDigitCode} handleBarCodeScanned={handleBarCodeScanned}></BarcodeScanner> }
    </>
  )
}
export default Sell
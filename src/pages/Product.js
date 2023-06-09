import React, { useCallback, useRef, useState } from 'react';
import Container from '../components/Container';
import { Input } from '../components/Input';
import {PressableButton} from '../components/PressableButton';
import { Alert, Keyboard } from 'react-native';


import database from '../database';
import { BarcodeScanner } from '../components/BarcodeScanner';
const Product = () => {
  const [name, setName] = useState(null);
  const [code, setCode] = useState(null);
  const [showKeyboardInputCode, setShowKeyboardInputCode] = useState(false);
  const [price, setPrice] = useState(null);
  const [showScan, setShowScan] = useState(false);

  const onFocusInputCode = () => {
    if (!showKeyboardInputCode) {
      Keyboard.dismiss();
      setShowScan(true);
      setShowKeyboardInputCode(true)
    }
  }
  const onBlurInputCode = () => {
    if (showKeyboardInputCode) {
      setShowKeyboardInputCode(false)
    }
  }

  const addProduct = ({name, code, price}) => {
    if (!name || !code || !price) {
      return false;
    }
    database.transaction(
      (tx) => {
        tx.executeSql(`select * from products where code == ${code}`, [], (_, { rows }) => {
          if (rows._array.length) {
            Alert.alert('Código de produto já cadastrado!');
            return
          }
          tx.executeSql("insert into products (code, name, price) values (?, ?, ?)", [code, name, price.replace(',','.')]);
          setCode(null)
          setName(null)
          setPrice(null)
          console.log('click add', name, code, price)
          tx.executeSql("select * from products", [], (_, { rows }) =>
            console.log('list',JSON.stringify(rows))
          );
        })
      },
      (error => console.log(error))
    );
  };

  const handleBarCodeScanned = ({ data }) => {
    setShowScan(false);
    setCode(data)
  };

  const onPressDigitCode = useCallback(() => {
    setShowScan(false);
    setShowKeyboardInputCode(true);
    // Keyboard.
    // inputRef.current?.focus()
  }, [setShowScan, setShowKeyboardInputCode ])

  return (
    <>
    <Container>
      <Input placeholder='Nome' value={name} onChangeText={(text) => setName(text)} />
        <Input placeholder='Código' keyboardType='number-pad' onFocus={onFocusInputCode} onBlur={onBlurInputCode} icon value={code} onChangeText={(text) => setCode(text)} />
      <Input placeholder='Preço' keyboardType='decimal-pad' value={price} onChangeText={(text) => setPrice(text)} />
      <PressableButton title={'Salvar'} onPress={() => addProduct({name, code, price})}></PressableButton>
    </Container>
      {showScan && <BarcodeScanner onPressDigitCode={onPressDigitCode} handleBarCodeScanned={handleBarCodeScanned}></BarcodeScanner>}
    </>
  )
}
export default Product
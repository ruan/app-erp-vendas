import React, { useCallback, useState } from 'react';
import Container from '../components/Container';
import { Input } from '../components/Input';
import {PressableButton} from '../components/PressableButton';
import { Alert, Keyboard } from 'react-native';
import database from '../database';
import { BarcodeScanner } from '../components/BarcodeScanner';
import { getCodeFromBarCode, getCodeFromText } from '../common/utils';
import DropdownSelect from 'react-native-input-select';
const Product = () => {
  const [name, setName] = useState(null);
  const [code, setCode] = useState(null);
  const [showKeyboardInputCode, setShowKeyboardInputCode] = useState(false);
  const [price, setPrice] = useState(null);
  const [showScan, setShowScan] = useState(false);
  const [measurement, setMeasurement] = useState(null);

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

  const addProduct = ({ name, code, price, measurement }) => {
    if (!name || !code || !price || !measurement) {
      Alert.alert('Preencha todos os campos!');
      return false;
    }
    const productCode = getCodeFromText(code);
    database.transaction(
      (tx) => {
        tx.executeSql(`select * from products where code == ${productCode}`, [], (_, { rows }) => {
          if (rows._array.length) {
            Alert.alert('Código de produto já cadastrado!');
            return
          }
          tx.executeSql("insert into products (code, name, price, measurement) values (?, ?, ?, ?)", [productCode, name, price.replace(',', '.'), measurement]);
          setCode(null)
          setName(null)
          setPrice(null)
          setMeasurement(null)
        })
      },
      (error => console.log(error))
    );
  };

  const handleBarCodeScanned = ({ data, type }) => {
    const code = getCodeFromBarCode(data,type)
    setShowScan(false);
    setCode(code)
  };

  const onPressDigitCode = useCallback(() => {
    setShowScan(false);
    setShowKeyboardInputCode(true);
  }, [setShowScan, setShowKeyboardInputCode ])

  const onChangeMeasurement = useCallback((type) => {
    setMeasurement(type);
  }, [setMeasurement ])

  return (
    <>
    <Container>
      <Input placeholder='Nome' value={name} onChangeText={(text) => setName(text)} />
      <Input placeholder='Código' keyboardType='number-pad' onFocus={onFocusInputCode} onBlur={onBlurInputCode} icon value={code} onChangeText={(text) => setCode(text)} />
      <Input placeholder='Preço' keyboardType='decimal-pad' value={price} onChangeText={(text) => setPrice(text)} />
      <DropdownSelect
        placeholder="Escolha o tipo de medida"
        options={[
          { name: 'KG', code: 'KG' },
          { name: 'Unidade', code: 'un' }
        ]}
        optionLabel={'name'}
        optionValue={'code'}
        selectedValue={measurement}
        onValueChange={(value) => onChangeMeasurement(value)}
        primaryColor={'green'}
      />
      <PressableButton title={'Salvar'} onPress={() => addProduct({ name, code, price, measurement })}></PressableButton>
    </Container>
      {showScan && <BarcodeScanner onPressDigitCode={onPressDigitCode} handleBarCodeScanned={handleBarCodeScanned}></BarcodeScanner>}
    </>
  )
}
export default Product
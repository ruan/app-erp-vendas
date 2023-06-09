import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';
import { useRef } from "react";
const TextInput = styled.TextInput`
  height: 60px;
  width: 100%;
  padding: 10px;
  border-width: 1px;
  border-color: green;
  margin-bottom: 20px;
  background-color: white;
  color: black;
`
const InputTitle = styled.Text`
  color: black;
  font-size: 20px;
  margin-bottom: 10px;
`

const Input = ({ placeholder = '', value, onChangeText, keyboardType = "default", icon, showSoftInputOnFocus = true, ...props }) => {
  return(
    <>
      <InputTitle>{placeholder}</InputTitle>
      <TextInput keyboardType={keyboardType} showSoftInputOnFocus={showSoftInputOnFocus} value={value} onChangeText={onChangeText} {...props} ></TextInput>
      {icon && <Ionicons style={{ alignSelf: "flex-end", top: -72, right: 15, marginBottom:-43 }} name="camera" size={40} color="green" />}
    </>
  )
}

export {Input}
import styled from "styled-components/native";

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

const Input = ({placeholder = '', value, onChangeText}) => (
  <>
    <InputTitle>{placeholder}</InputTitle>
    <TextInput value={value} onChangeText={onChangeText}></TextInput>
  </>
)

export {Input}
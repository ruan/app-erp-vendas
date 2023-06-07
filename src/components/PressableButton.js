import React from 'react';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 10px;
  background-color: green;
`;
const ButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: white;
`;
export const PressableButton = ({ onPress, title }) => (
  <ButtonContainer onPress={onPress} >
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);
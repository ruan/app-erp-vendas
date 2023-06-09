import styled from 'styled-components/native';
import { Modal } from 'react-native';
import { Input } from './Input';
import { PressableButton } from './PressableButton';
import { useState } from 'react';

const Title = styled.Text`
  font-size:20px;
`

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  background-color: white;
`

const ModalView = styled.View`
  width: 100%;
  margin: 20px;
  background-color: 'white';
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  elevation: 5;
`
export const ModalInput = ({ visible , children}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      >
      <ModalContainer>
        <ModalView>
          {children}
        </ModalView>
      </ModalContainer>
    </Modal>
  )
}
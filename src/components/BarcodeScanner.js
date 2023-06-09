import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { PressableButton } from './PressableButton';

const Container = styled.View`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
`
const ContainerButton = styled.View`
  align-items: center;
  bottom: 50px;
  width: 100%;
  position: absolute;
`
const Content = styled.View`
`

export const BarcodeScanner = ({ handleBarCodeScanned, onPressDigitCode }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  return (
    <Container>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={{ width: '100%', height: '100%' }}
      />
      <ContainerButton>
        <Content>
          <PressableButton onPress={onPressDigitCode} title={"Digite o código"}></PressableButton>
        </Content>
      </ContainerButton>
    </Container>
  )
}
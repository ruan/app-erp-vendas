import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
`

const BarcodeScanner = ({ handleBarCodeScanned }) => {
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
    </Container>
  )
}

export { BarcodeScanner }
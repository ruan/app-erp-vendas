import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 300px;
`

const BarcodeScanner = ({ scanned, handleBarCodeScanned }) => {
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
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ width: '100%', height: '100%' }}
      />
    </Container>
  )
}

export { BarcodeScanner }
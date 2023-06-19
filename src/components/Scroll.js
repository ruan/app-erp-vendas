import styled from 'styled-components/native';

const SafeAreaView = styled.SafeAreaView`

`;
const ScrollView = styled.ScrollView`

`;


export const Scroll = ({ children }) => (
  <SafeAreaView>
    <ScrollView>
      { children }
    </ScrollView>
  </SafeAreaView>
)

import { Button, Center, Heading, Image } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { LogoRK } from '../../../assets/images';

const ChooseLoginRegisterScreen = ({ navigation }) => {
  return (
    <Center flex={1} bgColor="rose.100" px={1}>
      <Image
        source={LogoRK}
        alt="Logo Relawan Kita"
        size="xl"
      />
      <Heading italic mt={1} color="light.700">Relawan <Heading italic color="red.600">Kita</Heading></Heading>
      <Button.Group direction="column" mt={8} width="80%" minWidth="240px">
        <Button variant="RK_solidRed" shadow={1} onPress={() => navigation.navigate('Login')}>MASUK</Button>
        <Button variant="RK_outlineRed" shadow={1} bgColor="red.50" onPress={() => navigation.navigate('Register')}>DAFTAR</Button>
      </Button.Group>
    </Center>
  )
}

export default ChooseLoginRegisterScreen

const styles = StyleSheet.create({})

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import React, { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider, { AuthContext } from "./src/contexts/AuthContext";
import { AccountScreen, ChooseLoginRegisterScreen, LoginScreen, RegisterScreen } from './src/screens';

const Root = createNativeStackNavigator()
const AuthenticationScreens = () => (
  <>
    <Root.Screen name="ChooseLoginRegister" component={ChooseLoginRegisterScreen}/>
    <Root.Screen name="Login" component={LoginScreen}/>
    <Root.Screen name="Register" component={RegisterScreen}/>
  </>
)
const pascal = 1;
const App = () => {
  const state = useContext(AuthContext);
  
  return (
    <NavigationContainer>
      {state?.isLoggedIn ? (
        <Root.Screen name="Account" component={AccountScreen}/>
      ): ( 
        AuthenticationScreens()
      )}
    </NavigationContainer>
  );
}


export default () => {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </AuthProvider>
    </NativeBaseProvider>
  )
}
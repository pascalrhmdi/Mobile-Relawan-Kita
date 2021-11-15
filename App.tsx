import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import React, { useContext } from 'react';
import AuthProvider, { AuthContext } from "./src/contexts/AuthContext";
import { AccountScreen, ChooseLoginRegisterScreen, LoginScreen, RegisterScreen } from './src/screens';
import customTheme from './theme';

const Root = createNativeStackNavigator()
const AuthenticationScreens = () => (
  <>
    <Root.Screen name="ChooseLoginRegister" component={ChooseLoginRegisterScreen}/>
    <Root.Screen name="Login" component={LoginScreen}/>
    <Root.Screen name="Register" component={RegisterScreen}/>
  </>
)

const App = () => {
  const {state} = useContext(AuthContext);
  
  return (
    <NavigationContainer>
      <Root.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >
      {state?.isLoggedIn ? (
        <Root.Screen name="Account" component={AccountScreen}/>
      ): ( 
        AuthenticationScreens()
      )}
      </Root.Navigator>
    </NavigationContainer>
  );
}


export default () => {
  return (
    <NativeBaseProvider theme={customTheme}>
      <AuthProvider>
            <App />
      </AuthProvider>
    </NativeBaseProvider>
  )
}
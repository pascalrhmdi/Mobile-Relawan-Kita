import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from 'native-base';
import React, { useContext } from 'react';
import AuthProvider, { AuthContext } from "./src/contexts/AuthContext";
import { ChooseLoginRegisterScreen, EditProfileScreen, ListAktivitasScreen, LoginScreen, ProfileScreen, RegisterScreen, TentangScreen, UbahKataSandiScreen } from './src/screens';
import customTheme from './theme';

export type RootStackParamList = {
  ChooseLoginRegister: undefined;
  Login: undefined;
  Register: undefined,
  Home: undefined,
  Profile: undefined,
  EditProfile: undefined,
  UbahKataSandi: undefined,
  ListAktivitas: undefined
  Tentang: undefined
};

const Root = createNativeStackNavigator<RootStackParamList>()
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
        <>
          {/* <Root.Screen name="Home" component={HomeScreen}/> */}

          {/* Accounts Screen */}
            <Root.Screen name="Profile" component={ProfileScreen}/>
            <Root.Screen name="EditProfile" component={EditProfileScreen}/>
            <Root.Screen name="UbahKataSandi" component={UbahKataSandiScreen}/>
            <Root.Screen name="ListAktivitas" component={ListAktivitasScreen}/>
            <Root.Screen name="Tentang" component={TentangScreen}/>
            
        </>
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
        <StatusBar style="light" backgroundColor="#E07575" />
      </AuthProvider>
    </NativeBaseProvider>
  )
}
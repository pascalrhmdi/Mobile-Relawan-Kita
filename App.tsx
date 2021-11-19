import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider } from "native-base";
import React, { useContext } from "react";
import AuthProvider, { AuthContext } from "./src/contexts/AuthContext";
import {
  AccountScreen,
  ChooseLoginRegisterScreen,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
} from "./src/screens";
import customTheme from "./theme";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Root = createNativeStackNavigator();
const AuthenticationScreens = () => (
  <>
    <Root.Screen
      name="ChooseLoginRegister"
      component={ChooseLoginRegisterScreen}
    />
    <Root.Screen name="Login" component={LoginScreen} />
    <Root.Screen name="Register" component={RegisterScreen} />
  </>
);

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  const iconSize = 28;
  return (
    <Tab.Navigator
      initialRouteName="Beranda"
      screenOptions={() => ({
        tabBarActiveTintColor: '#DF202E',
        tabBarInactiveTintColor: '#DF202E',
        keyboardHidesTabBar: true,
        tabBarStyle: { backgroundColor : 'white' },
      })}>
      <Tab.Screen
        name="Beranda"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color }) => (
            <MaterialCommunityIcons name={focused?'home':'home-outline'} color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Aktivitas"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color }) => (
            <MaterialCommunityIcons name={focused?'account-multiple':'account-multiple-outline'} color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color }) => (
            <MaterialCommunityIcons name={focused?'account':'account-outline'} color={color} size={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const { state } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Root.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {state?.isLoggedIn ? (
          <Root.Screen name="Home" component={TabNavigation} />
        ) : (
          AuthenticationScreens()
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <NativeBaseProvider theme={customTheme}>
      <AuthProvider>
        <App />
        <StatusBar style="light" backgroundColor="#E07575" />
      </AuthProvider>
    </NativeBaseProvider>
  );
};

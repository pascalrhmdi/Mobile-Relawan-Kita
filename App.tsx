import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider, Pressable } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import AuthProvider, { AuthContext } from "./src/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AccountScreen,
  ChooseLoginRegisterScreen,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ActivityScreen,
  SearchScreen,
  DetailActivityScreen,
  CategoryScreen,
  VolunteerHistory
} from "./src/screens";
import customTheme from "./theme";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from 'axios';
import {profileUrl} from "./src/apis/";
import { UserResponseInterface } from './src/screens/Authentication';

const Stack = createStackNavigator();
const AuthenticationScreens = () => (
  <>
    <Stack.Screen
      name="ChooseLoginRegister"
      component={ChooseLoginRegisterScreen}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </>
);

const Tab = createBottomTabNavigator();
const TabNavigation = ({navigation}) => {
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
        component={ActivityScreen}
        options={{
          headerTintColor: '#DF202E',
          tabBarIcon: ({focused, color }) => (
            <MaterialCommunityIcons name={focused?'account-multiple':'account-multiple-outline'} color={color} size={iconSize} />
          ),
          headerRight: () => (
            <Pressable style={{ marginRight:20 }} onPress={()=>navigation.navigate("SearchScreen")}>
              <MaterialCommunityIcons name="magnify" color="#DF202E" size={iconSize} />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={VolunteerHistory}
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
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    dispatch({type:'set_loading',payload:true});

    (async()=>{
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // make any API calls
        let userId = await AsyncStorage.getItem("id_pengguna");
        
        if(userId==null){
          dispatch({type:'set_logged_in',payload:false});
        }else{
          const data: UserResponseInterface = (await axios.get(`${profileUrl}/${userId}`)).data;
          dispatch({type:'set_user_data',payload:data.data});
          dispatch({type:'set_logged_in',payload:true});
        }
      } catch (e) {
        console.warn(e);
      } finally {
        // render app
        dispatch({type:'set_loading',payload:false});
        
        await SplashScreen.hideAsync();
      }
    })();

  },[]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {state?.isLoggedIn ? (
          <Stack.Screen name="Home" component={TabNavigation} />
        ) : (
          AuthenticationScreens()
        )}
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="DetailActivityScreen" component={DetailActivityScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="VolunteerHistory" component={VolunteerHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <NativeBaseProvider theme={customTheme}>
      <AuthProvider>
        <App />
        {/* <StatusBar style="light" backgroundColor="#E07575" /> */}
      </AuthProvider>
    </NativeBaseProvider>
  );
};

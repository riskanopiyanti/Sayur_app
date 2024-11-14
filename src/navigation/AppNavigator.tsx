import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import Detail from '../screens/Detail';
import Order from '../screens/Order';
import TabNavigator from './TabNavigator';
import {CoffeeItem} from '../models/coffeeItem';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Home from '../screens/Home';

export type RootStackParamList = {
  StartScreen: undefined;
  MainTabs: undefined;
  Detail: {item: CoffeeItem}; // Here we specify that Detail takes a CoffeeItem
  Order: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Detail'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

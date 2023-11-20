import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import ProductList from "../screens/ProductListScreen";
import CartScreen from "../screens/CartScreen";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      //initialRouteName="Detail-Screen"
      screenOptions={{
        headerStyle: { backgroundColor: "#91cf48" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home-Screen" component={HomeScreen} />
      <Stack.Screen name="Detail-Screen" component={DetailScreen} />
      <Stack.Screen name="Product-List-Screen" component={ProductList} />
    </Stack.Navigator>
  );
};

const CartStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart-Screen" component={CartScreen} />
    </Stack.Navigator>
  );
};

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Order-Screen" component={OrderScreen} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile-Screen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  CartStackNavigator,
  OrderStackNavigator,
  ProfileStackNavigator,
};

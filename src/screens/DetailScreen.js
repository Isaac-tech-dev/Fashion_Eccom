import { Text, View, Pressable, Image,ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getProductById } from "../features/firebase/product";
import ProductContext from "../features//context/productContext";
import { ScrollView } from "react-native-gesture-handler";
import { addToCart } from "../features/firebase/cart";
import { SafeAreaView } from "react-native-safe-area-context";
import CartContext from "../features/context/cartContext";

const DetailScreen = () => {
  return (
    <View>
      <Text>DetailScreen</Text>
    </View>
  )
}

export default DetailScreen
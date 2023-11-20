import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import CartContext from "../features/context/cartContext";
import { addToOrders } from "../features/firebase/order";
import OrderContext from "../features/context/orderContext";

const TotalSummaryCard = ({ total }) => {
  const { setCartItems } = useContext(CartContext);
  const { setOrderItems } = useContext(OrderContext);

  const placeOrder = async () => {
    const res = await addToOrders();
    if (res.success === true) {
      //ToastAndroid.show("Order places successfully!!!",ToastAndroid.BOTTOM)
      Alert.alert("Order places successfully!!!");
      setCartItems([]);
      setOrderItems(res.data);
    }
  };

  return (
    <View className="border border-gray-200 rounded-lg p-6">
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-lg">Total Price:</Text>
        <Text className="font-extrabold text-xl">${total}</Text>
      </View>
      <Pressable onPress={placeOrder} className="bg-black py-4 rounded-lg mt-6">
        <Text className="font-semibold text-white text-center">
          Place Order
        </Text>
      </Pressable>
    </View>
  );
};

export default TotalSummaryCard;

const styles = StyleSheet.create({});

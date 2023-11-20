import { Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItem from "../components/CartItem";
import TotalSummaryCard from "../components/TotalSummaryCard";
import CartContext from "../features/context/cartContext";
import { getCartItems } from "../features/firebase/cart";
import AuthContext from "../features/context/authContext";
import { async } from "@firebase/util";

const CartScreen = ({ navigation }) => {
  const [total, setTotal] = useState(0);
  const { currentUser, isLoggedIn } = useContext(AuthContext);
  const { cartItems, setCartItems } = useContext(CartContext);

  const calculateTotalAmount = async (data) => {
    const subTotal = await data.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.qty),
      0
    );
    setTotal(subTotal.toFixed(2));
  };

  const fetchCartItem = async () => {
    const res = await getCartItems();
    if (res.success === true) {
      setCartItems(res.data);
      //setTotal(res.subTotal());
      calculateTotalAmount(res.data);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchCartItem();
  }, [currentUser, cartItems?.length]);
  return (
    <SafeAreaView className="flex-1 bg-white p-5 w-full">
      <View>
        <Text className="font-bold text-xl">My Cart</Text>
      </View>
      {isLoggedIn ? (
        <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
          {cartItems?.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              brand={item.brand}
              qty={item.qty}
              image={item.image}
              price={item.price}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="font-bold text-lg">Login to View your Cart</Text>
        </View>
      )}
      <View>
        <TotalSummaryCard total={total} />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

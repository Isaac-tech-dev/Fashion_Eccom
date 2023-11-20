import { Text, View, ScrollView } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "../components/OrderItem";
import { getAllOrderItems } from "../features/firebase/order";
import OrderContext from "../features/context/orderContext";
import { auth } from "../../firebase";
import AuthContext from "../features/context/authContext";
import { async } from "@firebase/util";

const OrderScreen = ({ navigation }) => {
  const { orders, setOrders } = useContext(OrderContext);
  const { isLoggedIn } = useContext(AuthContext);
  const fetchAllOrders = async () => {
    const res = await getAllOrderItems();
    if (res.success === true) {
      setOrders(res.data);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAllOrders();
  }, []);
  return (
    <SafeAreaView className="flex-1 p-4 w-full bg-white">
      <View>
        <Text className="font-bold text-xl">My Orders</Text>
      </View>
      {isLoggedIn ? (
        <ScrollView className="p-4">
          {orders?.map((order) => (
            <OrderItem
              key={order.id}
              brand={order.brand}
              qty={order.qty}
              title={order.title}
              date={order.date}
              orderId={order.orderId}
              image={order.image}
              price={order.price}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center ">
          <Text className="font-bold text-lg">Login to view your Orders!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderScreen;

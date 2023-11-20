import { Text, View, Pressable, Image, ToastAndroid, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getProductById } from "../features/firebase/product";
import ProductContext from "../features//context/productContext";
import { ScrollView } from "react-native-gesture-handler";
import { addToCart } from "../features/firebase/cart";
import { SafeAreaView } from "react-native-safe-area-context";
import CartContext from "../features/context/cartContext";
import { async } from "@firebase/util";
import DetailImage from "../../assets/detail.png";

const DetailScreen = ({ navigation, route }) => {
  const { currentProduct: product, setCurrentProduct } =
    useContext(ProductContext);
  const { setCartItems } = useContext(CartContext);
  const id = route.params.productId;
  const [qty, setQty] = useState(1);

  const increment = () => {
    setQty((prev) => prev + 1);
  };
  const decrement = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const addItemToCart = async () => {
    const res = await addToCart(id, qty);
    if (res.success === true) {
      //ToastAndroid.show("Item added to cart!", ToastAndroid.BOTTOM);
      Alert.alert("Item added to cart!")
      setCartItems(res.data);
    }
  };

  const fetchProductById = async (id) => {
    const result = await getProductById(id);
    setCurrentProduct(result);
  };

  useEffect(() => {
    fetchProductById(id);
  }, [id]);
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="bg-black w-full">
        <Pressable
          onPress={goBack}
          className="mt-2 absolute z-10 top-4 left-3 justify-center items-center
         h-10 w-10 mx-4 rounded-full bg-black"
        >
          <MaterialIcons name="chevron-left" size={34} color={"#fff"} />
        </Pressable>
        <Image
          source={{ uri: product?.image }}
          className="h-[470px]"
          style={{ resizeMode: "cover" }}
        />
      </View>

      {/* Title */}
      <View className="rounded-[30px] bg-white mt-[-20px] p-5">
        <View>
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="font-extrabold text-lg">{product?.title}</Text>
              <Text className="text-xs text-gray-500">{product?.brand}</Text>
            </View>
            <View>
              <View className="flex-row justify-center items-center">
                <Pressable
                  onPress={decrement}
                  className="px-3 py-1 bg-gray-300 border border-gray-300 rounded-tl-lg rounded-bl-lg"
                >
                  <Text className="font-semibold">-</Text>
                </Pressable>
                <Text className="bg-white px-2 py-1 border border-gray-300">
                  {qty}
                </Text>
                <Pressable
                  onPress={increment}
                  className="px-3 py-1 bg-gray-300 border border-gray-300 rounded-tr-lg rounded-br-lg"
                >
                  <Text className="font-semibold">+</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Description */}
          <View className="mt-6">
            <Text className="font-extrabold mb-3">Description:</Text>
            <ScrollView
              vertical={true}
              showsVerticalScrollIndicator={false}
              className="h-32"
            >
              <Text className="text-gray-500 text-xs">
                {product?.description}
              </Text>
            </ScrollView>
          </View>
        </View>
      </View>

      {/* Price and Add to Cart*/}
      <View className="absolute bottom-4 left-0 w-full px-4">
        <View className="flex-row justify-between items-center mt-8">
          <View>
            <Text className="text-gray-500 mb-[-4px]">Total Price:</Text>
            <Text className="font-bold text-lg">${product?.price}</Text>
          </View>

          <Pressable
            onPress={addItemToCart}
            className="items-center bg-black px-6 py-3 rounded-3xl"
          >
            <Text className="text-white font-semibold">Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UserLogo from "../../assets/user.png";
import OfferCard from "../components/OfferCard";
import NewArrivalsCard from "../components/NewArrivalsCard";
import AuthModal from "../components/AuthModal";
import AuthContext from "../features/context/authContext";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoggedIn, currentUser } = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  console.log(isLoggedIn);
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Bar */}
      <View className="flex-row px-5 mt-6 justify-between items-center">
        <View className="bg-black justify-center items-center rounded-full w-10 h-10">
          <MaterialIcons name="menu" size={24} color={"#fff"} />
        </View>
        {!isLoggedIn && (
          <View>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              className="flex-row items-center justify-center border border-slate-400 rounded-full"
            >
              <Image source={UserLogo} className="h-12 w-12" />
              <Text className="font-semibold py-2 pr-4 pl-2">Login</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Welcome */}
      <View className="px-5 mt-6">
        <Text className="font-bold text-2xl">
          Welcome,{" "}
          <Text className="font-bold text-slate-600">{currentUser?.name}</Text>
        </Text>
        <Text className="font-bold text-xl text-gray-500">
          Our Fashions App
        </Text>
      </View>

      {/* Search */}
      <View className="px-5 mt-6">
        <View className="flex-row bg-gray-200 p-2 px-3 items-center rounded-3xl">
          <View>
            <MaterialIcons name="search" size={24} color={"#111"} />
          </View>
          <TextInput
            placeholder="Search........."
            placeholderTextColor={"#666666"}
            className="px-2"
          />
        </View>
      </View>

      <ScrollView  vertical={true} showsVerticalScrollIndicator={false} className="mb-4">
        {/* Offer */}
        <View className="mt-6 p-5">
          <OfferCard />
        </View>

        {/* New Arrivals */}
        <View className="mt-4">
          <View className="flex-row justify-between items-center px-5">
            <Text className="font-extrabold text-lg">New Arrivals</Text>
            <Pressable>
              <Text className="text-xs text-gray-500">View All</Text>
            </Pressable>
          </View>
          <ScrollView
            className="mt-4 px-5"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <Pressable>
              <NewArrivalsCard />
            </Pressable>
            <Pressable>
              <NewArrivalsCard />
            </Pressable>
            <Pressable>
              <NewArrivalsCard />
            </Pressable>
            <Pressable>
              <NewArrivalsCard />
            </Pressable>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Login Modal */}
      <View>
        <AuthModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

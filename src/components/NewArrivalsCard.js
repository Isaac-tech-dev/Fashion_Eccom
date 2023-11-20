import { View, Text, Image } from "react-native";
import React from "react";
import Bag from "../../assets/bag.png";

const NewArrivalsCard = () => {
  return (
    <View className="max-w-[150px] justify-center items-center overflow-hidden mr-6">
      <Image source={Bag} className="rounded-xl h-36 w-32" />
      <View className="mt-2 justify-center items-center">
        <Text className="font-bold">The Marc Jacobs</Text>
        <Text className="text-xs">Travler Tote</Text>
        <Text className="font-extrabold">$195.99</Text>
      </View>
    </View>
  );
};

export default NewArrivalsCard;

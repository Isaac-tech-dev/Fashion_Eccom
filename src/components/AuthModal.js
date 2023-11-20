import { async } from "@firebase/util";
import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../features/firebase/userAuth";
import AuthContext from "../features/context/authContext";
//import Toast from "react-native-toast-message";

const AuthModal = ({ modalVisible, setModalVisible }) => {
  const [type, setType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, setCurrentUser, setIsLoggedIn } =
    useContext(AuthContext);

  const handleRegister = async () => {
    const res = await registerWithEmailAndPassword(name, email, password);
    if (res.success === true) {
      //ToastAndroid.show("Registered Successfully", ToastAndroid.BOTTOM);
      //Toast.showSuccess("Registered Successfully");
      //Toast.showError("Error");
      setType("login");
      setModalVisible(false);
    }
  };

  const handleLogin = async () => {
    const res = await loginWithEmailAndPassword(email, password);
    if (res.success === true) {
      //ToastAndroid.show("Login Successfully", ToastAndroid.BOTTOM);
      //Toast.showSuccess("Login Successfully");
      //Toast.showError("Error");
      //console.log("user:", res.user);
      setCurrentUser(res.user);
      setIsLoggedIn(true);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);

  return (
    <View className="flex-1" style={{ width: 1150 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        {type === "login" ? (
          //LOGIN
          <Pressable className="flex-1 justify-center items-center bg-black/[0.5]">
            <View className="w-[80%] bg-white p-6 rounded-lg">
              {/* Email */}
              <Text className="font-bold mb-2">Email:</Text>
              <TextInput
                value={email}
                placeholder="E-Mail Address"
                onChangeText={setEmail}
                keyboardType="email-address"
                className="border border-slate-300 px-3 py-3 rounded-lg"
              />

              {/* Password */}
              <Text className="font-bold mb-2 mt-4">Password:</Text>
              <TextInput
                value={password}
                placeholder="Enter Password"
                onChangeText={setPassword}
                secureTextEntry={true}
                className="border border-slate-300 px-3 py-3 rounded-lg"
              />
              <TouchableOpacity
                className="bg-black py-4 mt-6 rounded-lg"
                onPress={handleLogin}
              >
                <Text className="text-white font-semibold text-center">
                  Login
                </Text>
              </TouchableOpacity>

              {/* Top Bar */}
              <View className="flex-row justify-center items-center mt-4">
                <Text className="text-slate-500">Don't have an account?</Text>
                <Pressable onPress={() => setType("register")}>
                  <Text className="font-bold ml-2">Sign Up</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        ) : (
          //SIGN UP
          <Pressable className="flex-1 justify-center items-center bg-black/[0.5]">
            <View className="w-[80%] bg-white p-6 rounded-lg">
              {/* Name */}
              <Text className="font-bold mb-2">Name:</Text>
              <TextInput
                value={name}
                placeholder="Enter Full Name"
                onChangeText={setName}
                className="border border-slate-300 px-3 py-3 rounded-lg"
              />

              {/* Email */}
              <Text className="font-bold mb-2 mt-4">Email:</Text>
              <TextInput
                value={email}
                placeholder="E-Mail Address"
                onChangeText={setEmail}
                keyboardType="email-address"
                className="border border-slate-300 px-3 py-3 rounded-lg"
              />

              {/* Password */}
              <Text className="font-bold mb-2 mt-4">Password:</Text>
              <TextInput
                value={password}
                placeholder="Enter Password"
                onChangeText={setPassword}
                secureTextEntry={true}
                className="border border-slate-300 px-3 py-3 rounded-lg"
              />
              <TouchableOpacity
                className="bg-black py-4 mt-6 rounded-lg"
                onPress={handleRegister}
              >
                <Text className="text-white font-semibold text-center">
                  Sign Up
                </Text>
              </TouchableOpacity>

              {/* Top Bar */}
              <View className="flex-row justify-center items-center mt-4">
                <Text className="text-slate-500">Already have an account?</Text>
                <Pressable onPress={() => setType("login")}>
                  <Text className="font-bold ml-2">Sign In</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        )}
      </Modal>
    </View>
  );
};

export default AuthModal;

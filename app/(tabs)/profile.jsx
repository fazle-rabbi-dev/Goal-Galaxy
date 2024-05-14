import { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";
import { Stack, router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

import { Button } from "@/components";
import { images } from "@/constants";
import { logout } from "@/lib/appwrite";
import appStore from "@/store"

const Profile = () => {
  const user = appStore(state => state.user)
  const [isDisabledBtn, setIsDisabledBtn] = useState(false)
  
  const Logout = async () => {
    setIsDisabledBtn(true)
    await logout();
    router.replace("/sign-in")
  };
  
  return (
    <View className="w-full h-full px-4 py-6">
      <Stack.Screen
        options={{
          headerBackVisible: true,
          headerTitle: "Profile"
        }}
      />
      <Text className="font-cxbold text-black/80 text-3xl">
        Profile
      </Text>

      <View className="my-6 w-full items-center px-4 pb-6 bg-white rounded-lg shadow shadow-gray-700">
        <View className="w-full mt-4 justify-center items-center">
          <Image
            source={
              user?.avatar ? { uri: user?.avatar } : images.mountain
            }
            resizeMode="cover"
            className="w-24 h-24 rounded-full"
          />
          <Text className="mt-6 font-cxbold text-black text-2xl">
            {user?.name}
          </Text>
          <Text className="font-sregular text-lg text-gray-700">
            {user?.email}
          </Text>

          <View className="w-full mt-6 ">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center justify-center h-12 space-x-2 w-full my-4 rounded-lg bg-black/80 disabled:bg-rose-400"
              onPress={Logout}
              disabled={isDisabledBtn}
            >
              <MaterialIcons name="logout" size={24} color="white" />
               <Text className="text-white font-cxmedium">
                 Logout
               </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

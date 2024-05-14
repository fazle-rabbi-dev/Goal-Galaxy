import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { Feather } from '@expo/vector-icons';

import { COLORS } from "@/constants";

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("settings", jsonValue);
  } catch (e) {
    console.error("saving error");
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("settings");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("error reading value");
  }
};


// ====================================
const Settings = () => {
  const [appSettings, setAppSettings] = useState({
    sound: false,
    vibrate: false
  });

  function handleCheckbox(value) {
    const updatedSettings = { ...appSettings };

    if (value === "sound") {
      updatedSettings.sound = !appSettings?.sound;
    } else {
      updatedSettings.vibrate = !appSettings?.vibrate;
    }

    setAppSettings(updatedSettings);
    storeData(updatedSettings);
  }

  useEffect(() => {
    (async function () {
      const savedSettings = await getData();
      if (savedSettings) {
        setAppSettings(savedSettings);
      }
    })();
    
    return () => {
      console.log("settings Cleanup")
    }
  }, []);

  return (
    <View className="px-4 py-6">
      <Text className="font-cxbold text-black/80 text-3xl">Settings</Text>

      <View className="my-6 space-y-4">
        <TouchableOpacity
          activeOpacity={0.7}
          className="h-14 bg-white shadow rounded-lg px-4 py-2 flex-row justify-between items-center"
        >
          <Text className="text-lg font-smedium">Enable vibrate</Text>
          <CheckBox
            value={appSettings.vibrate}
            onValueChange={() => handleCheckbox("vibrate")}
            color={appSettings?.vibrate ? COLORS.primary : COLORS.grey}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="h-14 bg-white shadow rounded-lg px-4 py-2 flex-row justify-between items-center"
        >
          <Text className="text-lg font-smedium">Enable sound</Text>
          <CheckBox
            value={appSettings.sound}
            onValueChange={() => handleCheckbox("sound")}
            color={appSettings?.sound ? COLORS.primary : COLORS.grey}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL("https://bio.link/fazle_rabbi_dev")}
          activeOpacity={0.7}
          className="mt-6 h-12 flex-row justify-between items-center bg-black/80 shadow rounded-lg px-4 py-2"
        >
          <Text className="text-white text-lg font-smedium">About Developer</Text>
          <Feather name="arrow-up-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

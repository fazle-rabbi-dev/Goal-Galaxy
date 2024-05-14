import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import * as Animatable from 'react-native-animatable';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS } from "@/constants";
import { formatDate } from "@/lib/utils";

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("settings");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("error reading value");
  }
};

export const TodoItem = ({ todo, completeTodo }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [sound, setSound] = useState();
  
  // Play sound
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/task.mp3")
    );
    await sound.playAsync();
    setSound(sound);
  }
  
  // Handle Complete Todo
  const CompleteTodo = async (todo) => {
    const savedSettings = await getData()
    
    if(savedSettings?.sound){
      playSound();
    }
    if(savedSettings?.vibrate){
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setIsChecked(!isChecked);
    completeTodo(todo);
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [isChecked]);

  return (
    <Animatable.View animation="slideInDown">
    <TouchableOpacity
      className={`flex-row items-center px-3 py-4 bg-white/70 rounded-2xl border-[1px] border-gray-300 mb-4 ${
        isChecked && "bg-primary/10 border-transparent"
      }`}
      onPress={() => router.push(`/(modals)/${todo?.$id}`)}
    >
      <TouchableOpacity onPress={() => CompleteTodo(todo)}>
        {isChecked ? (
          <View
            className={`w-6 h-6 border-[1px] border-gray-300 rounded-full mr-4 justify-center items-center ${
              isChecked ? "bg-primary " : ""
            }`}
          >
            <AntDesign
              name="check"
              size={18}
              // color={COLORS.grey}
              color="white"
            />
          </View>
        ) : (
          <View className="w-6 h-6 border border-gray-400 rounded-full mr-4" />
        )}
      </TouchableOpacity>
      <View className="flex-1">
        <Text
          className={`text-lg font-smedium ${
            isChecked ? "line-through text-primary" : "text-black"
          }`}
        >
          {todo?.title || "Learn Reactjs"}
        </Text>
        <Text className={`text-xsm text-zinc-500 ${isChecked && "text-primary/60"}`}>
          {formatDate(todo?.$createdAt) || ""}
        </Text>
      </View>
    </TouchableOpacity>
    </Animatable.View >
  );
};

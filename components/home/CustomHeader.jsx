import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons
} from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import { router } from "expo-router";
import appStore from "@/store"
import * as Haptics from "expo-haptics";

import { COLORS } from "@/constants";

export const CustomHeader = ({ todos, setTodoData }) => {
  const { isOpenBottomSheet, toggleBottomSheet } = appStore()
  
  const [searchText, setSearchText] = useState("")
  
  const handleFilter = (value) => {
    if(value){
      setSearchText(value)
      const newTodos = todos?.filter(obj => obj.title.toLowerCase().includes(value.toLowerCase()));
      setTodoData(newTodos)
    }else{
      setSearchText("")
      setTodoData(todos)
    }
  }
  
  return (
    <View className="bg-white px-4 py-6 border-b-[1px] border-gray-100">
      <View className=" flex-row justify-between items-center">
        <Text className="font-cxbold text-3xl text-primary">
          Goal-Galaxy
        </Text>

        {/*<Menu>
          <MenuTrigger
            children={
              <MaterialCommunityIcons
                name="dots-vertical"
                size={26}
                color="black"
              />
            }
          />

          <MenuOptions
            customStyles={{
              optionsWrapper: {
                padding: 10
              }
            }}
          >
            <MenuOption
              onSelect={() => router.push("/activity")}
            >
              <Text className="font-smedium text-lg">
                Activity log
              </Text>
            </MenuOption>
            <MenuOption
            // onSelect={() => router.push("/activity")}
            >
              <Text className="font-smedium text-lg">
                Sort
              </Text>
            </MenuOption>
            <MenuOption
            // onSelect={() => router.push("/activity")}
            >
              <Text className="font-smedium text-lg">
                Select Task
              </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>*/}
        
      </View>

      <View className="mt-5 flex-row items-center space-x-2">
        <View className="flex-1 flex-row items-center space-x-2 border-[1px] border-gray-300 rounded-lg px-2 py-1">
          <AntDesign
            name="search1"
            size={24}
            color={COLORS.grey}
          />
          <TextInput
            className="w-full h-full"
            placeholder="Search"
            placeholderTextColor="#7B7B8B"
            selectionColor="#9614e1"
            value={searchText}
            onChangeText={handleFilter}
          />
        </View>

        <TouchableOpacity
          onPress={() => { 
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push("(modals)/todo-form")}
          }
          activeOpacity={0.4}
          className="w-8 flex-row justify-end"
        >
          {isOpenBottomSheet ? (
            <AntDesign
              name="close"
              size={24}
              color="black"
            />
          ) : (
            <Ionicons name="create-outline" size={28} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

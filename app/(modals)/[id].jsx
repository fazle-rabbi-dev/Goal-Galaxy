import { useState, useMemo, useEffect } from "react";
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import {
  Stack,
  router,
  useLocalSearchParams
} from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import appStore from "@/store";
import { Button } from "@/components";
import { formatDate } from "@/lib/utils"
import { useGetTodoById, useDeleteTodoById } from "@/lib/react-query/api.js"
import { COLORS } from "@/constants"

const TodoDetails = () => {
  const { id } = useLocalSearchParams();
  const user = appStore(state => state.user)
  
  const { data: currentTodo, isPending: isLoadingTodo } = useGetTodoById({
    creatorId: user?.$id,
    todoId: id
  })
  const { mutateAsync: deleteTodo, isPending: isDeletingTodo } = useDeleteTodoById(id)
  
  const handleDeletePress = async () => {
    try {
      await deleteTodo(id);
      
      ToastAndroid.show("Deleted Successfully", ToastAndroid.SHORT)
      router.replace("/home")
    } catch (error) {
      Alert.alert("Error", `Failed to delete todo. Cause: ${error.message}`)
    }
  }
  
  const displayAlert = () => {
    Alert.alert(
      "Are you sure?",
      "Once you delete this you can't restore this again it will gone forever.",
      [
        {
          text: "Sure",
          onPress: () => handleDeletePress()
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      {
        cancelable: true
      }
    );
  };

  if(isLoadingTodo){
    return <View className="pt-6 justify-center items-center w-full">
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  }
  
  return (
    <View className="">
      <Stack.Screen
        
      />

      <View className="px-4 mt-4">
        <Text className="text-3xl font-cxbold">
          {currentTodo?.title}
        </Text>
        <Text className="text-sm text-gray-500">
          {
            formatDate(currentTodo?.$createdAt)
          }
        </Text>

        <View className="flex-row items-center space-x-2 my-2">
          <TouchableOpacity
            onPress={() =>
              router.push(`/todo-form?type=Edit&todoId=${id}`)
            }
            activeOpacity={0.7}
            className="bg-primary px-4 py-2 rounded-lg flex-row justify-center items-center space-x-2"
          >
            <FontAwesome
              name="edit"
              size={20}
              color="white"
            />
            <Text className="text-white">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={displayAlert}
            activeOpacity={0.7}
            className="bg-rose-600 px-4 py-2 rounded-lg flex-row justify-center items-center space-x-2"
          >
            <FontAwesome
              name="trash-o"
              size={20}
              color="white"
            />
            <Text className="text-white">Delete</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-lg mt-4 leading-6 tracking-wide text-gray-700 font-sregular">
          {currentTodo?.desc}
        </Text>
      </View>
    </View>
  );
};

export default TodoDetails;

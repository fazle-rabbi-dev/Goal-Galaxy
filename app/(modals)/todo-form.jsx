import { useState, useEffect } from "react";
import { View, Alert, ToastAndroid, Text, TextInput } from "react-native";
import {
  Stack,
  router,
  useLocalSearchParams
} from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";

import { COLORS } from "@/constants";
import { Button } from "@/components";
import { useCreateTodo, useUpdateTodo } from "@/lib/react-query/api.js";
import appStore, { useTodoStore } from "@/store"

const TodoForm = () => {
  const user = appStore(state => state.user)
  const allTodos = useTodoStore(state => state.allTodos)
  
  const { type, todoId } = useLocalSearchParams();
  const [formData, setFormData] = useState({
    title: "",
    desc: ""
  });

  // Mutations
  const {
    mutateAsync: createTodo,
    isPending: creatingTodo
  } = useCreateTodo();
  const {
    mutateAsync: updateTodo,
    isPending: updatingTodo
  } = useUpdateTodo();
  
  useEffect(() => {
    if(type === "Edit" && todoId){
      const currentTodo = allTodos.find(todo => todo?.$id === todoId)
      
      setFormData({
        title: currentTodo?.title,
        desc: currentTodo?.desc
      })
    }
  },[type]);

  // =====================================================================================================================
  // CREATE A NEW TODO
  // =====================================================================================================================
  const saveTodo = async () => {
    if (formData.title === "" || formData.desc === "") {
      return Alert.alert(
        "Uh-oh! Something went wrong.",
        "Looks like you forgot to enter a todo title or description."
      );
    }
    
    try {
      if(type === "Edit" && todoId){
        await updateTodo({
          ...formData,
          todoId
        })
      }else{
        await createTodo({
          ...formData,
          creator: user?.$id
        })
      }
      
      
      ToastAndroid.show(`Todo ${type === "Edit" ? "Updated" : "Created"} Successfully`, ToastAndroid.SHORT)
      setFormData({ title: "", desc: "" })
      router.back()
    } catch (error) {
      Alert.alert("Error", error.message)
    }
  };

  return (
    <View className="h-full">
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View className="pl-4">
              <Text className="font-cxbold text-black text-2xl">
                {type ? type : "Create"} A New Todo
              </Text>
            </View>
          )
          // headerTransparent: true,
          // presentation: 'transparentModal',
        }}
      />

      <View className="mt-32 px-4">
        <View className="mt-3 w-full h-12 rounded-lg border-[1px] border-gray-300">
          <TextInput
            className="w-full h-full px-2"
            placeholder="Title"
            selectionColor={COLORS.primary}
            value={formData.title}
            onChangeText={title =>
              setFormData({ ...formData, title })
            }
          />
        </View>
        <View className="mt-3 py-2 w-full h-20 rounded-lg border-[1px] border-gray-300">
          <TextInput
            className="w-full h-full px-2"
            placeholder="Description"
            selectionColor={COLORS.primary}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.desc}
            onChangeText={desc =>
              setFormData({ ...formData, desc })
            }
          />
        </View>

        <View className="my-4">
          {/*<CalendarPicker />*/}
        </View>

        <Button
          disabled={creatingTodo || updatingTodo}
          handlePress={saveTodo}
          icon={
            <AntDesign
              name="save"
              size={24}
              color="white"
            />
          }
          label={creatingTodo ? "Saving" : "Save"}
          containerStyle="mt-4 disabled:bg-primary/70"
        />
      </View>
    </View>
  );
};

export default TodoForm;

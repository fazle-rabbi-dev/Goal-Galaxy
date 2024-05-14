import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
  BackHandler,
  Alert
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TodoItem, CustomHeader } from "@/components";
import { images } from "@/constants";
import { useGetTodos, useCompleteTodo } from "@/lib/react-query/api.js";
import appStore, { useTodoStore } from "@/store";
import { COLORS } from "@/constants";
import { MenuProvider } from "react-native-popup-menu";

const Home = () => {
  const [todoData, setTodoData] = useState();
  const user = appStore(state => state.user);
  const setTodos = useTodoStore(state => state.setTodos);

  // Mutations
  const { data: todos, isPending: isLoadingTodos } = useGetTodos(user?.$id);
  const { mutateAsync: CompleteTodo, isPending: isCompletingTodo } = useCompleteTodo();

  useEffect(() => {
    if (todos?.length > 0) {
      setTodoData(todos);
      setTodos(todos);
    }
  }, [todos]);

  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  // Complete Todo
  const completeTodo = async todo => {
    setTimeout(async function () {
      const newTodos = todos.filter(obj => obj.$id !== todo.$id);
      setTodoData(newTodos);

      try {
        await CompleteTodo(todo?.$id);
        ToastAndroid.show("Todo Completed Successfully", ToastAndroid.SHORT);
      } catch (error) {
        ToastAndroid.show("Failed To Complete Todo", ToastAndroid.SHORT);
      }
    }, 500);
  };

  // Control Back Button Press
  const handleBackPress = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to exit the app?",
      [
        { text: "Cancel", onPress: () => null },
        { text: "Exit", onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
    return true;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground source={images.mountain} className="h-full w-full">
        <View className="h-full w-full bg-gray-50">
          <CustomHeader setTodoData={setTodoData} todos={todos} />

          <View className="my-2 px-4 flex-1">
            {todos?.length > 0 && (
              <Text className="mb-4 text-xl font-smedium text-black">🎯 All Goals</Text>
            )}

            {isLoadingTodos ? (
              <View className="">
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
              <FlatList
                data={todoData}
                keyExtractor={item => item.$id}
                renderItem={({ item }) => (
                  <TodoItem todo={item} completeTodo={completeTodo} />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <View className="mt-6 h-full w-full my-4">
                    <Text className="text-gray-600 text-center px-6 font-smedium">
                      You haven't created any task yet! Click on plus icon to create a new
                      todo.
                    </Text>
                    <Image
                      source={images.empty}
                      resizeMode="cover"
                      className="mt-2 w-full h-48 rounded-2xl"
                    />
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default Home;

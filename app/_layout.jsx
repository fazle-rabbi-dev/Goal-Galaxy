import "react-native-url-polyfill/auto";
import { useEffect } from "react";
import { SplashScreen, Stack, router } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, ActivityIndicator, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

import { COLORS } from "@/constants";
import appStore from "@/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Chillax-Bold": require("../assets/fonts/Chillax-Bold.ttf"),
    "Chillax-SemiBold": require("../assets/fonts/Chillax-Semibold.ttf"),
    "Chillax-Medium": require("../assets/fonts/Chillax-Medium.ttf"),
    "Chillax-Regular": require("../assets/fonts/Chillax-Regular.ttf"),
    "Chillax-Light": require("../assets/fonts/Chillax-Light.ttf"),
    "Satoshi-Medium": require("../assets/fonts/Satoshi-Medium.ttf"),
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.ttf")
  });
  const { isLoadingAuth, isLoggedIn, checkAuth } = appStore(state => ({
    isLoadingAuth: state.isLoadingAuth,
    isLoggedIn: state.isLoggedIn,
    checkAuth: state.checkAuth
  }));
  
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!fontsLoaded && !error) {
    return null;
  }
  
  if(isLoadingAuth){
    return <SafeAreaView className="h-full w-full justify-center items-center">
      <ActivityIndicator size="larger" color={COLORS.primary} />
    </SafeAreaView>
  }
  
  return (
    <SafeAreaView className="h-full w-full">
      <RootLayoutNav />
    </SafeAreaView>
  );
};

const RootLayoutNav = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(modals)/[id]"
          options={{
            headerTitle: () => (
              <View className="pl-4">
                <Text className="font-sregular text-black text-2xl">Todo Details</Text>
              </View>
            )
          }}
        />
        <Stack.Screen
          name="(modals)/todo-form"
          options={{
            // headerShown: false,
            headerBackVisible: false,
            animation: "fade",
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: "#fff",
                  borderColor: COLORS.grey,
                  borderRadius: 20,
                  borderWidth: 1,
                  padding: 4
                }}
              >
                <Ionicons name="close-outline" size={22} />
              </TouchableOpacity>
            )
          }}
        />
      </Stack>
      
      <StatusBar backgroundColor="white" style="dark" />
    </QueryClientProvider>
  );
};

export default RootLayout;

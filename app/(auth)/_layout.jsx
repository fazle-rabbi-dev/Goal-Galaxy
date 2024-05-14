import { useState, useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Stack } from "expo-router";
import appStore from "@/store"
import { router } from "expo-router"
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// const queryClient = new QueryClient();

const AuthLayout = () => {
  const isLoggedIn = appStore(state => state.isLoggedIn);
  
  /*if(isLoggedIn){
    return router.replace("/home")
  }*/
  
  return (
    // <QueryClientProvider client={queryClient}>
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="sign-in" />
    </Stack>
    // </QueryClientProvider>
  );
};

export default AuthLayout;

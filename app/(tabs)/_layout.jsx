import { useState, memo, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { MenuProvider } from "react-native-popup-menu";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#9614e1",
        tabBarLabelStyle: {
          fontFamily: "Chillax-Medium",
          fontSize: 13
        },
        tabBarButton: props => <TouchableOpacity {...props} />,
        // tabBarActiveBackgroundColor: "#ededed",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          // backgroundColor: "#f8f8f8",
          paddingBottom: 6,
          height: 60
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle-o" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

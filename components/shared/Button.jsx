import { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
// import { AntDesign } from '@expo/vector-icons';

export const Button = ({ icon, label, handlePress, containerStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary h-12 rounded-lg justify-center items-center ${containerStyle} ${icon && "flex-row space-x-3"}`} 
      disabled={disabled}
    >
      {icon}
      <Text className="text-white text-lg font-smedium">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

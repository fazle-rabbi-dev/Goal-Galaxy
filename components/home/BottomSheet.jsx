import { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import BottomSheet, {
  BottomSheetView
} from "@gorhom/bottom-sheet";

import { Button } from "@/components";
import appStore from "@/store";
import { COLORS } from "@/constants";

export const BottomSheetModal = () => {
  const { isOpenBottomSheet, toggleBottomSheet } =
    appStore();

  const handleChange = index => {
    if (index < 0) {
      toggleBottomSheet({ close: true });
    }
  };

  if (!isOpenBottomSheet) return <View className="p-6 bg-amber-100 ">
    <Text className="">Not Opened</Text>
  </View>;
  
  return (
    <View className="h-[70%] bottom-0 absolute w-full bg-black/70">
      <BottomSheet
        style={{
          flex: 1
        }}
        index={1}
        snapPoints={["20%", "90%"]}
        enablePanDownToClose={true}
        // onChange={handleChange}
        backgroundStyle={{
          backgroundColor: COLORS.grey_50
        }}
      >
        <View className="px-4 h-full py-2 bg-gray-100">
          <Text className="font-cxbold text-2xl">
            Create A New Todo
          </Text>
          <View className="mt-3 w-full h-12 rounded-lg border-[1px] border-gray-300">
            <TextInput
              className="w-full h-full px-2"
              placeholder="Title"
              placeholderTextColor="#7B7B8B"
              // value={value}
              // onChangeText={handleChangeText}
            />
          </View>
          <View className="mt-3 w-full h-20 rounded-lg border-[1px] border-gray-300">
            <TextInput
              className="w-full h-full px-2"
              placeholder="Description"
              placeholderTextColor="#7B7B8B"
              // value={value}
              // onChangeText={handleChangeText}
            />
          </View>

          <Button label="Save" containerStyle="mt-4" />
        </View>
      </BottomSheet>
    </View>
  );
};

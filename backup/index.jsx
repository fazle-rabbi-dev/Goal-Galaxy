import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Home = () => {
  return (
    <View className="m-10">
      <TouchableOpacity
        // onPress={handlePress}
        activeOpacity={0.7}
        className="bg-red-500 h-14 w-full"
        // disabled={isLoading}
      >
        <Text className="">Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

// import { useState, useEffect } from "react";
// import { View, BackHandler, Alert, TouchableOpacity, Text, ImageBackground } from "react-native";
// import { router } from "expo-router";
// import NetInfo from '@react-native-community/netinfo';

// import { images } from "@/constants";
// import { Button } from "@/components";
// import appStore from "@/store";

// const WelcomeScreen = () => {
//   const isLoggedIn = appStore(state => state.isLoggedIn);
//   const [isConnected, setConnected] = useState(true);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener((state) => {
//       setConnected(state.isConnected);
//       if (!state.isConnected) {
//         showAlert();
//       }
//     });

//     BackHandler.addEventListener('hardwareBackPress', handleBackPress);

//     return () => {
//       unsubscribe();
//       BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
//     };
//   }, []);

//   const showAlert = () => {
//     Alert.alert(
//       'No Internet Connection',
//       'Please check your internet connection and try again.'
//     );
//   };

//   const handleBackPress = () => {
//     Alert.alert(
//       'Exit App',
//       'Are you sure you want to exit the app?',
//       [
//         { text: 'Cancel', onPress: () => null },
//         { text: 'Exit', onPress: () => BackHandler.exitApp() },
//       ],
//       { cancelable: false }
//     );
//     return true;
//   }

//   return (
//     <View className="bg-gray-100 h-full w-full">
//       <ImageBackground
//         source={images.welcome}
//         resizeMode="cover"
//         className="mb-4 h-80 w-full"
//       />

//       <View className="px-4">
//         <Text className="mt3 font-cxbold text-4xl text-center">Goal-Galaxy</Text>
//         <Text className="text-center text-gray-900 text-lg font-sregular ">
//           Organize your tasks{" "}
//           <Text className="underline text-violet-700">effortlessly</Text>
//         </Text>
//         <Text className="my-4 text-gray-700 text-center text-sm font-smedium ">
//           Effortlessly organize your tasks with our intuitive Todo app. Stay productive
//           and focused as you manage your to-dos efficiently.
//         </Text>

//         <Button
//           label="Continue"
//           handlePress={() => {
//             if(!isConnected) return showAlert();

//             router.replace(isLoggedIn ? "/home" : "/sign-in")
//           }}
//           containerStyle="w-full mt-4"
//         />
//       </View>
//     </View>
//   );
// };

// export default WelcomeScreen;

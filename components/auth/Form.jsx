import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { images, COLORS } from "@/constants";
import { signInSchema, signUpSchema } from "@/lib/utils";
import { Button } from "../shared/Button.jsx";
import {
  useSignUp,
  useSignIn
} from "@/lib/react-query/api.js";
import appStore from "@/store" 

const signInMsg =
  "Welcome back! Let's make today another step closer to your goals. Sign in and let the journey continue";
const signUpMsg =
  "Unlock the power of productivity. Sign up now and let's embark on this journey together!";

export const Form = ({ useFor }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      useFor === "signIn" ? signInSchema : signUpSchema
    )
  });
  const setUser = appStore(state => state.setUser)
  
  const formLabel =
    useFor === "signUp" ? "Sign Up" : "Sign In";

  // =====================================================================================================================
  // Mutations
  // =====================================================================================================================
  const { mutateAsync: signUp, isPending: isSigningUp } =
    useSignUp();
  const { mutateAsync: signIn, isPending: isSigningIn } =
    useSignIn();

  const onSubmit = async data => {
    let res;
    try {
      if (useFor === "signUp") {
        res = await signUp(data);
      } else {
        res = await signIn(data);
        console.log(res)
      }

      
      if(!res?.$id) throw Error;
      
      // res = user document
      setUser(res);
      
      ToastAndroid.show(
        `${
          useFor === "signUp"
            ? "Account Created"
            : "Logged in"
        } Successfully`,
        ToastAndroid.SHORT
      );
      router.push("/home");
    } catch (error) {
      Alert.alert(useFor === "signUp" ? "Sign Up" : "Sign In" + " Failed", error.message);
    }
  };

  return (
    <ImageBackground
      source={images.mountain}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View className="bg-white/90 bg-opacity-90 p-8 rounded-lg w-4/5">
        <Text className="text-3xl text-center text-black font-cxbold">
          {formLabel}
        </Text>
        <Text className="mt-2 text-sm text-center text-gray-600 font-smedium mb-8">
          {formLabel === "Sign Up" ? signUpMsg : signInMsg}
        </Text>

        {useFor === "signUp" && (
          <View className="mb-4">
            <Controller
              control={control}
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <TextInput
                  className="border-b-[1px] border-gray-300 py-2"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  placeholder="Name"
                  placeholderTextColor="gray"
                  selectionColor="#9614e1"
                />
              )}
              name="name"
              defaultValue=""
            />
            {errors?.name && (
              <Text className="text-red-500 text-sm">
                {errors?.name.message}
              </Text>
            )}
          </View>
        )}
        <View className="mb-4">
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value }
            }) => (
              <TextInput
                className="border-b-[1px] border-gray-300 py-2"
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="Email"
                placeholderTextColor="gray"
                selectionColor="#9614e1"
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors?.email && (
            <Text className="text-red-500 text-sm">
              {errors?.email.message}
            </Text>
          )}
        </View>
        <View className="mb-4">
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value }
            }) => (
              <TextInput
                className="border-b-[1px] border-gray-300 py-2"
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="gray"
                selectionColor="#9614e1"
              />
            )}
            name="password"
            defaultValue=""
          />
          {errors?.password && (
            <Text className="text-red-500 text-sm">
              {errors?.password.message}
            </Text>
          )}
        </View>

        {/*<Button 
          label={formLabel}
          handlePress={handleSubmit(onSubmit)}
          containerStyle="my-4"
        />*/}

        <TouchableOpacity
          activeOpacity={0.7}
          className="my-4 w-full flex-row items-center justify-center space-x-3 bg-primary rounded-lg h-12 disabled:bg-primary/70"
          onPress={handleSubmit(onSubmit)}
          disabled={isSigningUp || isSigningIn}
        >
          {isSigningUp || isSigningIn ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <>
              <Text className="text-white text-lg font-smedium">
                {formLabel}
              </Text>
              <AntDesign
                name="arrowright"
                size={20}
                color="white"
              />
            </>
          )}
        </TouchableOpacity>

        <Text className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href={
              useFor === "signUp" ? "/sign-in" : "/sign-up"
            }
            asChild
          >
            <Text className="text-violet-600">
              {useFor === "signUp" ? "sign-in" : "sign-up"}
            </Text>
          </Link>
        </Text>
      </View>
    </ImageBackground>
  );
};

import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UpdateProduct from "./src/view/manage/UpdateProduct";

import DetailScreen from "./src/view/DetailScreen";
import HomeScreen from "./src/view/HomeScreen";
import LoginScreen from "./src/view/LoginScreen";
import SignupScreen from "./src/view/SignupScreen";
import BookingScreen from "./src/view/BookingScreen";
import AddressScreen from "./src/view/AddressScreen";
import OrderDetailScreen from "./src/view/OrderDetailScreen";
import ShopDetailScreen from "./src/view/ShopDetailScreen";
import AdminMainScreen from "./src/view/admin/AdminMainScreen";
import OrderManageScreen from "./src/view/admin/OrderManageScreen";
import UpdateProductScreen from "./src/view/admin/UpdateProductScreen";
import PhotoshootManageScreen from "./src/view/admin/PhotoshootManageScreen";
import UserManageScreen from "./src/view/admin/UserManageScreen";
import StaffManageScreen from "./src/view/admin/StaffManageScreen";
import AddProduct from "./src/view/manage/AddProduct";
import UpdateBooking from "./src/view/manage/UpdateBooking";
import AddUser from "./src/view/manage/AddUser";
import UpdateOrder from "./src/view/manage/UpdateOrder";


import SearchScreen from "./src/view/SearchScreen";
import UpdateUser from "./src/view/manage/UpdateUser";
import OrderStatusScreen from "./src/view/OrderStatusScreen";
import RevenueScreen from "./src/view/admin/RevenueScreen";
import FogotPwdScreen from "./src/view/FogotPwdScreen";

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FogotPwd"
          component={FogotPwdScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="OrderStatus"
          component={OrderStatusScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Revenue"
          component={RevenueScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateProduct"
          component={UpdateProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateOrder"
          component={UpdateOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderManage"
          component={OrderManageScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="StaffManage"
          component={StaffManageScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetailScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UserManage"
          component={UserManageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductManage"
          component={UpdateProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhotoshootManage"
          component={PhotoshootManageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminScreen"
          component={AdminMainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShopDetails"
          component={ShopDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={AddressScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddUser"
          component={AddUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateBooking"
          component={UpdateBooking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminOrder"
          component={OrderManageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
export default App;

import React, { useState, useEffect } from "react";
import {
  View,
  Picker,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import COLORS from "../consts/colors";
import { TextInput } from "react-native-paper";
import { auth } from "../../firebase";
import { ScrollView } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");
const height = width * 0.6;

export default function HeaderSc({}) {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#D9D9D9",
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back-outline" size={28} />
        </TouchableOpacity>
        <Ionicons name="cart-outline" size={28}></Ionicons>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  buyBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 25,
    paddingHorizontal: width * 0.02,
    width: width * 0.25,
    fontSize: height * 0.15,
    height: height * 0.2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
  },
  bordetBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    width: width * 0.15,
    height: height * 0.15,
    backgroundColor: COLORS.green,
    justifyContent: "space-around",
    alignItems: "center",
  },
  borderBtnText: {
    color: COLORS.white,
    alignItems: "center",
    fontSize: width * 0.06,
    alignContent: "center",
  },
  priceTag: {
    maxWidth: width * 0.5,
    width: width * 0.3,
    backgroundColor: COLORS.green,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    height: height * 0.2,
    alignItems: "center",
  },
  header: {
    paddingTop: height * 0.15,
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.06,
    flexDirection: "row",
    backgroundColor: COLORS.green,
    justifyContent: "space-between",
  },
  imageContainer: {
    marginTop: height * 0.1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {
    height: height * 2,
    backgroundColor: COLORS.light,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: height / 17,
    marginTop: -height / 10,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
  },
});

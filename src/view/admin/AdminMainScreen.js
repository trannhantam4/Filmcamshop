import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Picker,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";

import { SliderBox } from "react-native-image-slider-box";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

import COLORS from "../../consts/colors";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

function AdminMainScreen({ Dimensions, route, navigation }) {
  const film = route.params;
  const [quantity, setSelectedValue] = useState("1");
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <SafeAreaView
      style={{
        width: width,
        height: height,
        paddingLeft: width * 0.06,
        paddingTop: height * 0.05,
        backgroundColor: COLORS.white,
      }}
    >
      <View>
        <Text style={styles.pageTitle}>Admin page</Text>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonMenuTop}
          onPress={() => navigation.navigate("AdminOrder")}
        >
          <Text style={styles.buttonText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonMenuTop}
          onPress={() => navigation.navigate("ProductManage")}
        >
          <Text style={styles.buttonText}>Update Product</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonMenuTop}
          onPress={() => navigation.navigate("PhotoshootManage")}
        >
          <Text style={styles.buttonText}>Photoshoot Order</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonMenuTop}
          onPress={() => navigation.navigate("UserManage")}
        >
          <Text style={styles.buttonText}>User Manage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonMenuTop}
          onPress={() => navigation.navigate("StaffManage")}
        >
          <Text style={styles.buttonText}>Staff Manage</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  buyBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 25,
    width: width * 0.3,
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
    width: width * 0.3,
    backgroundColor: COLORS.green,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    height: height * 0.2,
    alignItems: "center",
  },
  header: {
    paddingTop: height * 0.15,
    paddingHorizontal: width * 0.07,
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
  header: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailContainer: {
    height: height * 1,
    backgroundColor: COLORS.light,
    borderRadius: 20,
    paddingTop: 30,
    marginTop: height * 0.1,
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
  },
  buttonMenuTop: {
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: "gray",
    textAlign: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#61d47c",
  },
  CategoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
  },
  ButtonContainer: {
    flexDirection: "column",
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: "space-between",
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 35,
  },
});
export default AdminMainScreen;

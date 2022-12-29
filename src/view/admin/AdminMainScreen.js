import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ImageBackground } from "react-native";
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
        backgroundColor: COLORS.white,
      }}
    >
      <ImageBackground
        style={{ width: width, height: height }}
        source={require("../../../app/assets/logo_wallpaper.png")}
      >
        <View>
          <Text style={styles.pageTitle}>Film Cam Shop</Text>
        </View>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonMenuTop}
            onPress={() => navigation.navigate("AdminOrder")}
          >
            <Ionicons name="albums" style={styles.icon}></Ionicons>
            <Text style={styles.buttonText}>Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonMenuTop}
            onPress={() => navigation.navigate("Revenue")}
          >
            <Ionicons name="bar-chart" style={styles.icon}></Ionicons>
            <Text style={styles.buttonText}>Revenues</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonMenuTop}
            onPress={() => navigation.navigate("ProductManage")}
          >
            <Ionicons name="camera" style={styles.icon}></Ionicons>
            <Text style={styles.buttonText}>Update Product</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonMenuTop}
            onPress={() => navigation.navigate("PhotoshootManage")}
          >
            <Ionicons name="bookmark" style={styles.icon}></Ionicons>
            <Text style={styles.buttonText}>Photoshoot Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonMenuTop}
            onPress={() => navigation.navigate("UserManage")}
          >
            <Ionicons name="people-sharp" style={styles.icon}></Ionicons>
            <Text style={styles.buttonText}>User Manage</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}></View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    color: COLORS.green,
    alignItems: "center",
    fontSize: width * 0.035,
    alignContent: "center",
    alignSelf: "center",
    fontWeight: "bold",
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
    width: width * 0.25,
    height: height * 0.1,
    textAlign: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
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
    color: COLORS.green,
    paddingTop: height * 0.1,
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
  icon: {
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    fontSize: 25,
    padding: 0,
    color: COLORS.green,
  },
});
export default AdminMainScreen;

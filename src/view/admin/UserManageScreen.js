import React, { useState, useEffect, Component } from "react";
import {
  Button,
  View,
  Picker,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
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
import NumericInput from "react-native-numeric-input";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");
const quantity = 1;

export default class OrderManageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    return fetch("http://www.filmcamshop.com/api/getUserList.php")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.user,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: height * 0.08,
          marginHorizontal: width * 0.05,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            width: width,
            height: height * 0.09,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("UpdateUser");
            }}
          >
            <Text style={styles.buttonText}>Disable User</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{
            marginTop: height * 0.03,
          }}
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                borderColor: COLORS.green,
                paddingVertical: 10,
                borderWidth: 2,
                borderRadius: 20,
                marginBottom: 5,
              }}
              onPress={() => {}}
            >
              <Text style={{ fontSize: 16, margin: 10 }}>
                {item.userEmail}-{item.active}
              </Text>
              <Text>{item.status}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonText: {
    height: height * 0.05,
    color: "#61d47c",
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  button: {
    marginHorizontal: width * 0.02,
    width: width * 0.4,
    backgroundColor: "#fff",
    height: height * 0.05,
    borderRadius: 10,
    alignContent: "center",
    alignItems: "center",
    borderColor: "#61d47c",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
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

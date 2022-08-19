import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  Picker,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import HeaderSc from "./Header";
import { TextInput } from "react-native-paper";
const { width } = Dimensions.get("window");
const height = width * 0.6;

export default class OrderStatusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      orderID: "",
      productName: "",
      quantity: "",
      orderDetail: "",
    };
  }
  SearchRecord = () => {
    var email = this.state.email;
    if (email.length == 0) {
      alert("Require field is missing");
    } else {
      var SearchAPIURL = "http://www.filmcamshop.com/api/getOrderStatus.php";
      var header = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      var Data = {
        email: email,
      };
      fetch(SearchAPIURL, {
        method: "POST",
        headers: header,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          this.setState({ productName: response[0].ProductName });
          this.setState({ quantity: response[0].quantity });
          this.setState({ orderDetail: response[0].orderDetail });
        })
        .catch((error) => {
          alert("Error: " + error);
        });
    }
  };
  render() {
    return (
      <SafeAreaView>
        <View>
          <TextInput
            placeholder="enter email"
            onChangeText={(email) => this.setState({ email })}
          ></TextInput>
          <Button
            title="find data"
            color="#841584"
            onPress={this.SearchRecord}
          />
          <TextInput placeholder="ID"></TextInput>
          <TextInput placeholder="Name"></TextInput>
          <TextInput placeholder="Quantity"></TextInput>
          <TextInput placeholder="Status"></TextInput>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    marginRight: 0,
    width: width,
    height: height / 0.2,
  },
  buttonMenuTop: {
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: "gray",
    textAlign: "center",
    flexDirection: "column",
    width: "28%",
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
  slider: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  header: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#61d47c",
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  inputText: {
    color: "#fff",
    fontSize: 15,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  button: {
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowColor: "gray",
    width: "45%",
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    position: "relative",
    borderColor: "#61d47c",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  pagingText: {
    fontSize: width / 30,
    color: "#888",
  },
  pagingActiveText: {
    fontSize: width / 25,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    fontSize: 20,
    padding: 0,
    color: "#61d47c",
  },
  productCard: {
    width: width * 0.93,
    height: height * 1.5,
    borderColor: "#9c9c9c",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 10,
    marginBottom: 20,
    paddingBottom: 20,
  },
  productImage: {
    width: "100%",
    height: height,
    resizeMode: "contain",
    borderRadius: 5,
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 35,
    paddingBottom: height / 10,
  },
  productName: {
    paddingTop: 15,
    paddingLeft: 5,
    fontSize: height / 10,
    fontWeight: "bold",
  },
  productDes: {
    paddingLeft: 5,
    fontSize: height / 13,
    marginBottom: 10,
    paddingBottom: 20,
  },
});

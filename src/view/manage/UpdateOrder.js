import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Picker,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import HeaderSc from "../Header";
import COLORS from "../../consts/colors";
const { width } = Dimensions.get("window");
const height = width * 0.6;

export default class UpdateOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderStatus: "",
      orderID: "",
      productName: props.route.params.productName,
      quantity: props.route.params.quantity,
      order_temp: props.route.params.orderID,
      address: props.route.params.address,
      orderStatus: props.route.params.orderDetail,
      userEmail: props.route.params.userEmail,
    };
  }

  state = { orderStatus: "" };
  updateorderStatus = (orderStatus) => {
    this.setState({ orderStatus: orderStatus });
  };

  checkInput = () => {
    const { orderID, orderStatus } = this.state;

    if (orderID == "") {
      alert("Please enter ID");
    } else if (orderStatus == "") {
      alert("Please enter status");
    } else {
      this.componentDidMount();
    }
  };

  componentDidMount() {
    const { orderStatus, orderID, order_temp } = this.state;
    this.setState({ orderID: order_temp });

    return fetch("http://www.filmcamshop.com/api/orderStatus.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderID,
        orderstatus: orderStatus,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === "ok") {
          alert("update order status successfuly!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const { orderID, orderStatus, productName, quantity, address, userEmail } =
      this.state;

    return (
      <SafeAreaView>
        <HeaderSc></HeaderSc>
        <View>
          <Text style={styles.pageTitle}>Order Detail</Text>

          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: width * 0.038,
                  marginLeft: width * 0.05,
                }}
              >
                Customer:
              </Text>

              <Text
                style={{
                  fontSize: width * 0.038,
                  marginLeft: width * 0.075,
                }}
              >
                {userEmail}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: width * 0.038,
                  marginLeft: width * 0.05,
                }}
              >
                Address:
              </Text>

              <Text
                style={{
                  fontSize: width * 0.038,
                  marginLeft: width * 0.075,
                }}
              >
                {address}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: width * 0.038,
                  marginLeft: width * 0.05,
                }}
              >
                Product:
              </Text>

              <Text
                style={{
                  fontSize: width * 0.038,
                  marginLeft: width * 0.075,
                }}
              >
                {productName}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: width * 0.038,
                  marginLeft: width * 0.05,
                }}
              >
                Quantity:
              </Text>

              <Text
                style={{
                  fontSize: width * 0.038,
                  marginLeft: width * 0.075,
                }}
              >
                {quantity}
              </Text>
            </View>
          </View>

          <Picker
            style={{
              height: height * 0.1,
              width: width * 0.3,
              size: height * 0.5,
              borderColor: "grey",
              padding: height / 10,
              width: width / 2,
              fontSize: height * 0.15,
              fontWeight: "bold",
              borderWidth: 1,
              marginLeft: height / 15,
              marginTop: 10,
            }}
            selectedValue={this.state.orderStatus}
            onValueChange={this.updateorderStatus}
          >
            <Picker.Item label="Packaging" value="Packaging" />
            <Picker.Item label="Delivery" value="Delivering" />
            <Picker.Item label="Successfull" value="Successfull" />
          </Picker>

          <TouchableOpacity
            style={styles.buttonMenuTop}
            onPress={this.checkInput}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
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
    alignSelf: "center",
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
    paddingBottom: height / 5,
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
  pageTitle: {
    fontWeight: "bold",
    fontSize: 35,
    marginLeft: width / 12,
    marginTop: height / 10,
    marginBottom: height / 10,
  },
});

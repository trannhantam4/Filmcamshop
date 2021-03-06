import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import COLORS from "../../consts/colors";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

export default class OrderManageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    return fetch("http://www.filmcamshop.com/api/getOrderList.php")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.orders,
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
              this.props.navigation.navigate("UpdateOrder");
            }}
          >
            <Text style={styles.buttonText}>Update</Text>
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
                width: width * 0.8,
                borderColor: COLORS.green,
                borderWidth: 2,
                borderRadius: 20,
                padding: 10,
              }}
              onPress={() => {}}
            >
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                {item.orderID}.{item.productName}
              </Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>{item.address}</Text>
              <Text
                style={{
                  padding: 5,
                  borderWidth: 2,
                  borderRadius: 30,
                  alignItems: "center",
                  alignContent: "center",
                  width: width * 0.3,
                  fontWeight: "bold",
                  fontSize: 20,
                  borderColor:
                    item.orderDetail == "awaiting" ? COLORS.red : COLORS.green,
                  backgroundColor:
                    item.orderDetail == "awaiting" ? "#ffc2c2" : COLORS.green,

                  color:
                    item.orderDetail == "awaiting" ? COLORS.red : COLORS.green,
                }}
              >
                {item.orderDetail}
              </Text>
              <Text>{item.date}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
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

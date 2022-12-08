import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
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
      <SafeAreaView style={{ marginBottom: height * 0.5 }}>
        <ImageBackground
          style={{ width: width, height: height }}
          source={require("../../../app/assets/logo_wallpaper_2.png")}
        >
          <View>
            <Text style={styles.pageTitle}>Film Cam Shop</Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",

              marginHorizontal: width * 0.05,
            }}
          >
            <FlatList
              style={{
                marginTop: height * 0.03,
                marginBottom: height * 0.15,
              }}
              data={this.state.dataSource}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    width: width * 0.9,
                    borderColor: COLORS.green,
                    borderWidth: 2,
                    borderRadius: 20,
                    padding: 10,
                    marginBottom: 10,
                    backgroundColor: "rgba(217, 217, 217, 0.7)",
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("UpdateOrder", item);
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {item.productName}
                  </Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text style={{ fontSize: 15 }}>Shipping Address: {item.address}</Text>
                  <Text>Order date: {item.date}</Text>
                  <Text
                    style={{
                      padding: 5,
                      borderWidth: 2,
                      borderRadius: 30,
                      width: width * 0.28,
                      fontWeight: "bold",
                      fontSize: 20,
                      textAlign: "center",
                      borderColor:
                        item.orderDetail == "Awaiting"
                          ? COLORS.red
                          : COLORS.green,
                      backgroundColor:
                        item.orderDetail == "Awaiting"
                          ? "#ffc2c2"
                          : COLORS.green,
                      alignContent: "center",
                      color: COLORS.white,
                    }}
                  >
                    {item.orderDetail}
                  </Text>
                  
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    paddingTop: height * 0.15,
    paddingHorizontal: width * 0.07,
    paddingBottom: height * 0.06,
    flexDirection: "row",
    backgroundColor: COLORS.green,
    justifyContent: "space-between",
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
  pageTitle: {
    color: COLORS.green,
    paddingTop: height * 0.1,
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
});

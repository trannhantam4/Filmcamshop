import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../consts/colors";
import HeaderSc from "../Header";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");
const [date, setDate] = "";
export default class RevenueScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }
  componentDidMount() {
    return fetch("http://www.filmcamshop.com/api/getRevenue.php", {
      method: "POST",
      headers: {
        Accepts: "applicattion/json",
        "Content-Type": "application.json",
      },
      body: JSON.stringify({
        date: date,
      }),
    })
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
      return <View style={{ flex: 1, paddingTop: 20 }}></View>;
    }
    return (
      <View>
        <HeaderSc></HeaderSc>
        <View style={styles.header2}>
          <TextInput></TextInput>
          <TouchableOpacity
            style={styles.buttonMenuTop}
            onPress={() => navigation.navigate("ShopDetails")}
          >
            <Ionicons
              name="ios-information-circle-outline"
              style={styles.icon}
            ></Ionicons>
            <Text style={styles.buttonText}>Shop info</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={{
              width: width,
              height: height,
              alignContent: "center",
              backgroundColor: "#bfbfbf",
            }}
          >
            <ImageBackground
              style={{ width: width, height: height }}
              source={require("../../../app/assets/market.png")}
            >
              <SafeAreaView>
                <ScrollView>
                  <FlatList
                    style={{
                      marginTop: height * 0.03,
                      marginBottom: height * 0.01,
                    }}
                    data={this.state.dataSource}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          width: width * 0.9,
                          alignSelf: "center",
                          backgroundColor: COLORS.white,
                          marginBottom: height * 0.01,
                          borderRadius: 20,
                          padding: 10,
                        }}
                        onPress={() => {}}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                          {item.productName}
                        </Text>

                        <Text>Sold: {item.quantity}</Text>
                        <Text>Revenue: {item.price}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index}
                  />
                </ScrollView>
              </SafeAreaView>
            </ImageBackground>
          </View>
        </ScrollView>
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
  header2: {
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.01,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
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

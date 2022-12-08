import React, { useState, useEffect, Component } from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
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
      <SafeAreaView
        style={{
          width: width,
          height: height,
        }}
      >
      <ImageBackground
        style={{ width: width, height: height }}
        source={require("../../../app/assets/logo_wallpaper_2.png")}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: height * 0.08,
            marginHorizontal: width * 0.05,
          }}
        >
          <View>
            <Text style={styles.pageTitle}>Film Cam Shop</Text>
          </View>

          <FlatList
            style={{
              marginTop: height * 0.03,
              marginBottom: height * 0.05,
            }}
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  width: width * 0.9,
                  borderColor: COLORS.green,
                  backgroundColor: "rgba(217, 217, 217, 0.7)",
                  borderWidth: 2,
                  borderRadius: 20,
                  padding: 10,
                  marginBottom: 10,
                }}
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  this.props.navigation.navigate("UpdateUser", item);
                }}
              >
                <Text style={{ fontSize: 16, margin: 10 }}>
                  {item.userEmail}
                </Text>

                <Text
                    style={{
                      padding: 5,
                      borderWidth: 2,
                      borderRadius: 30,
                      alignItems: "center",
                      alignContent: "center",
                      width: width * 0.25,
                      fontWeight: "bold",
                      fontSize: 20,
                      textAlign: "center",
                      borderColor:
                      item.active == "disable"
                          ? COLORS.red
                          : COLORS.green,
                      backgroundColor:
                      item.active == "disable"
                          ? "#ffc2c2"
                          : COLORS.green,
                      alignContent: "center",
                      color: COLORS.white,
                    }}
                  >
                    {item.active}
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
  pageTitle: {
    color: COLORS.green,
    paddingTop: height * 0.1,
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
});

import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

import COLORS from "../../consts/colors";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

export default class PhotoshootManageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    return fetch("http://www.filmcamshop.com/api/getBookingList.php")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.booking,
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
      <View>
        <ImageBackground
          style={{ width: width, height: height }}
          source={require("../../../app/assets/logo_wallpaper_2.png")}
        >
          <Text style={styles.pageTitle}>Booking Detail</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: height * 0.08,
              marginHorizontal: width * 0.05,
            }}
          >
            <FlatList
              style={{
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
                  // onPress={() => {this.props.navigation.navigate("UpdateBooking", item);}}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {item.userEmail}
                  </Text>
                  <Text style={{ fontSize: 15 }}>
                    {item.dateTime}
                  </Text>
                  <Text style={{ fontSize: 15 }}>Booking Type: {item.type}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        </ImageBackground>
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
  pageTitle: {
    color: COLORS.green,
    paddingTop: height * 0.08,
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
});

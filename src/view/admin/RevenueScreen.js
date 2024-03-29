import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  Button,
  TouchableOpacity,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import COLORS from "../../consts/colors";
import HeaderSc from "../Header";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");
export default class RevenueScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      date: "",
    };
  }
  searchRev = () => {
    var date = this.state.date;
    if (date.length == 0) {
      alert("require field is missing");
    } else {
      var searchAPIURL = "http://www.filmcamshop.com/api/getRevenue.php";
      var header = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      var Data = {
        date: date,
      };
      fetch(searchAPIURL, {
        method: "POST",
        headers: header,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            dataSource: responseJson.orders,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  render() {
    return (
      <View>
        <HeaderSc></HeaderSc>
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
            <ScrollView>
              <View style={styles.header2}>
                <TextInput
                  style={{
                    margin: 5,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    height: height * 0.06,
                    width: width * 0.7,

                    backgroundColor: COLORS.white,
                  }}
                  keyboardType={"visible-password"}
                  placeholder={"YYYY-MM Example 2022-08"}
                  onChangeText={(date) => this.setState({ date })}
                ></TextInput>
                <Button
                  style={styles.buttonMenuTop}
                  title={"Report"}
                  onPress={this.searchRev}
                ></Button>
              </View>
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
          </ImageBackground>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header2: {
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.01,
    flexDirection: "row",
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

  buttonMenuTop: {
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: "gray",
    alignContent: "center",
    backgroundColor: "#fff",
    padding: 10,

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
});

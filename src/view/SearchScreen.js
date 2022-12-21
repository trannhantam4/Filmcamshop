import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ImageBackground,
  Image,
} from "react-native";

import COLORS from "../consts/colors";
import { Picker } from "@react-native-picker/picker";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],

      searchData: props.route.params.searchData_otherScreen,
    };
  }
  checkInput = () => {
    const { searchData } = this.state;

    if (searchData == "") {
      this.setState(isLoading = false)
      alert("Please ask me something!");
    } else {
      this.componentDidMount();
    }
  };
  componentDidMount() {
    const { searchData } = this.state;

    return fetch("http://www.filmcamshop.com/api/searchFunction.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        // we will pass our input data to server
        searchData: searchData,
        isLoading: false,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.results,
          isLoading: false,
        });
        console.log(responseJson.results)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { searchData } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ImageBackground
        style={{ width: width, height: height }}
        source={require("../../app/assets/logo_wallpaper_2.png")}
      >
        <View>
          <Text style={styles.pageTitle}>Film Cam Shop</Text>
        </View>
        <View>
          <Text style={styles.sub_pageTitle}>Searching</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: height * 0.05,
            marginHorizontal: width * 0.05,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TextInput
                style={styles.inputText}
                // placeholder="Looking for somethings..?"
                defaultValue={searchData}
                onChangeText={(text) => this.setState({ searchData: text })}
              ></TextInput>

              <TouchableOpacity style={styles.searchButton}>
                <Text
                  style={styles.buttonText}
                  
                  onPress={() => {
                    this.checkInput();
                  }}>
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            style={{
              marginTop: height * 0.02,
              height: height*0.6,
              width: width*0.9,
            }}
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  borderColor: COLORS.green,
                  
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 10,

                  backgroundColor: "rgba(217, 217, 217, 0.8)",
                }}
                onPress={() => {
                  this.props.navigation.navigate("Details", item);
                }}
              >
                <View style={{
              flexDirection: "row",
            }}>
                  <Image
                    style={{
                      width: width * 0.3,
                      height: height * 0.1,
                      borderRadius: 10,
                      marginRight: 10
                    }}
                    source={{ uri: item.imgURL }}
                  ></Image>
                  <View style={{
              flexDirection: "column",
              width: width*0.53,
              
            }}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    {item.productName}
                  </Text>
                  <View>
                  <Text style={{fontSize: 15 , marginTop: 8}} numberOfLines={3} ellipsizeMode='tail'>
                    {item.productDescription}
                  </Text>
                  </View>
                  </View>
                  
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </ImageBackground>
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
    paddingTop: 10,
  },
  inputText: {
    borderColor: "grey",
    paddingLeft: 10,
    width: width * 0.6,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 1,

    backgroundColor: "rgba(217, 217, 217, 0.7)",

    marginRight: 15,
  },
  searchButton: {
    width: width * 0.2,
    backgroundColor: "#fff",
    borderRadius: 10,

    borderColor: "#61d47c",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  header: {
    paddingTop: height * 0.15,
    paddingHorizontal: width * 0.07,
    paddingBottom: height * 0.06,
    flexDirection: "row",
    backgroundColor: COLORS.green,
    justifyContent: "space-between",
  },
  pageTitle: {
    color: COLORS.green,
    marginTop: height * 0.1,
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
  sub_pageTitle: {
    color: COLORS.green,
    fontWeight: "bold",
    marginTop: height * 0.03,
    fontSize: 30,
    textAlign: "center",
  },
});

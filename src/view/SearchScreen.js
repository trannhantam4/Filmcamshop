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
} from "react-native";

import COLORS from "../consts/colors";
import { Picker } from "@react-native-picker/picker";
import NumericInput from "react-native-numeric-input";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],

      searchData: "",
      searchData_temp: "",
      
      category_brand: ["Nikon", "Olympus", "Canon", "Fujifilm", "Pentax", "Minolta" ],
    };
  }

  updateSearchData = (searchData) => {
    this.setState({ searchData: searchData });
  };

  checkInput = () => {
    const { searchData_temp } = this.state;

    if (searchData_temp == "") {
      alert("Please ask me something!");
    } else {
      this.componentDidMount();
    }
  };

  componentDidMount() {
    const { searchData, searchData_temp } = this.state;
    this.setState({ searchData: searchData_temp });

    return fetch("http://www.filmcamshop.com/api/searchFunction.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        // we will pass our input data to server
        searchData: searchData,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.results,
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
            marginTop: height / 10,
            backgroundColor: COLORS.white,
            borderRadius: 40,
            width: width * 0.7,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <View style={{ marginTop: height / 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Looking for somethings..?"
              onChangeText={(text) => this.setState({ searchData_temp: text })}
            ></TextInput>

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
              selectedValue={this.state.selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ selectedValue: itemValue });
              }}>
              {this.state.category_brand.map((item, index) => (
                  <Picker.Item label={item} value={item} key={index} />
                ))}
            </Picker>

            

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.checkInput();
              }}
            >
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </View>
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
              onPress={() => {
                this.props.navigation.navigate("Details", item);
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                {item.productName}
              </Text>
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
    color: COLORS.green,
    fontWeight: "bold",
    fontSize: width / 22,
  },
  btn: {
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: width / 2.3,
    marginTop: 15,
    alignItems: "center",
    padding: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#61d47c",
  },
  input: {
    borderColor: "grey",
    padding: 10,
    width: width * 0.6,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    alignItems: "center",
    fontSize: height / 40,
    height: height / 15,
    fontWeight: "bold",
    borderWidth: 1,
    alignContent: "center",
    alignSelf: "center",
    marginTop: height / 40,
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
  detailContainer: {
    height: height * 1.7,
    backgroundColor: COLORS.light,
    borderRadius: 20,
    paddingTop: 30,
    marginTop: height * 0.1,
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
  },
});

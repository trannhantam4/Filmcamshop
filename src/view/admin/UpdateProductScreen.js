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
  Image,
} from "react-native";

import COLORS from "../../consts/colors";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

export default class UpdateProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],

      dataSource_disable: [],
      dataSource_display: [],
    };
  }

  dataSource_control_component = () => {
    const { dataSource_disable, dataSource_display } = this.state;
    this.setState({ dataSource_display: dataSource_disable });


  }

  componentDidMount() {
    return fetch("http://www.filmcamshop.com/api/SearchProductList.php")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.item,
          isLoading: false,
          dataSource_display: responseJson.item.filter((item) => item.status == "active"),
          dataSource_disable: responseJson.item.filter((item) => item.status == "disable")
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
      <SafeAreaView>
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
            <TouchableOpacity style={styles.button} 
            onPress={() => {this.props.navigation.navigate("AddProduct");}}>
              <Text style={styles.buttonText}>Add New Product</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} 
            onPress={() => {this.dataSource_control_component()}}>
              <Text style={styles.buttonText}>Disable List</Text>
            </TouchableOpacity> 
          </View>

          <FlatList
            data={this.state.dataSource_display}
            renderItem={({ item, index, separators }) => (
              <TouchableOpacity
                style={{
                  width: width * 0.9,
                  borderColor: COLORS.green,
                  borderWidth: 2,
                  borderRadius: 20,
                  padding: 10,
                  backgroundColor: COLORS.white,
                }}
                onPress={() => {
                  this.props.navigation.navigate("UpdateProduct", item);
                }}
              >
                <Image
                  style={{
                    width: width * 0.84,
                    height: height * 0.3,
                    borderRadius: 20,
                  }}
                  source={{ uri: item.imgURL }}
                ></Image>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {item.productName}
                </Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text numberOfLines={2}>{item.productDescription}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
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
    paddingTop: 7,
  },
  button: {
    marginHorizontal: width * 0.025,
    width: width * 0.4,
    height: height * 0.05,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignContent: "center",
    alignItems: "center",
    borderColor: "#61d47c",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
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

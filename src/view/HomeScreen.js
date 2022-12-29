import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import COLORS from "../consts/colors";
import { auth } from "../../firebase";
const { width } = Dimensions.get("window");
const height = width * 0.5;

const images = [
  "https://lh3.googleusercontent.com/gyAvgly0xYf0JOdr7oVbUn1EZ1a3XhyvbrVs73iizK_dZO-Gp3oxNiLh2qYX8t91zP-d3evUtIaqkTu0ZO29PClWhXi3BUGg5ETFp3asK5hLCbG3sx_oL8gfmciLmMrWEISSufOYjSeseMdGCsc0YompwflHl40NiLXTkKq4jlV7eQ0-ADtPwoBFsNmKCwY2oyaIn7L3LV5uDlp2I3FX3tK5Jk6-l66YMdr4g6lLwJfGThsF-9XrC1FbJ6fh1732ivlA_NlZlmtxOszulgk_wpVXLGm-j9w6QmGLw8yiDXCjvfql_gf0vLdToW-x8B7R32zdTnvennAh72o4O3QmtPEePS-YS65IGrZBGVjGdN3MbTYorLH71eZtT0G1b7esuf2Ecc4tRtn9fmHi5V78nDJahuyHfg0L_6zRGL_sfHh59BjFZFhG23CpkOBtofYhOO4B1sqfyNen26lU6WwCGomYsZiu-iedghv1ABXSKHjSasMJYTHDD7Jkx4WWY0MPlvFaCnW1y_eX2mAj_jvhbbePqFsy_cbCBIQLHc98kk4uOaa1zj7y35YiMCk58HF5bvlmpRyrt3LtduuY--amr7gt5OluZ-EqXBNYsdRadKXvEIYnDCJdsMqtnUzlqb6qEmKhH0-JGv-0L3PdHxZ430Q1OELCcTd5d6AsDcbeoyOGkcyRjGE2b5WpN_xnAqQvuRDYdVzsoPlsrpwe2vPpnp2J=w1295-h870-no?authuser=1",
  "https://lh3.googleusercontent.com/8tTYzOPAcVq1hDUXUY1OqUMKWfXgjH-UuJPICETS-H-bFEQ6pe4b-vXRptJ9QwBa1yZcnTdmLrPp8FpK7DWPKEA81n-ccxAjvO7UnSS4x6QS3-jvAuPMdaNV60hf2N9xWfAq0Y3Bi4E4H7688-Auwg7U1Xbg70GY-Ml2sw_FgoVz19wCUU7HfwdZsva-eAcYIe-HjmJjAvQRID1WflaNFrAWocCDIFryZ5Jjwp-HI5lMCYlUR0y3fef0DTGcUg7qwyv7mCIV_kXYAkPoPoSceMeexCmy2TTcDx50CL22Rg8fbcvYRpUgZd3sanZOYHN9g3ktZukoex0QhAbL49tJBt9F33FP6fLQxYLOeez7effr2gYTo4B3TXoD2NvZuNlZuNlQFJF1cno2pl-el5JJ_tLXMAnbUSRzVlOKdF_7Sqes63URFsqq_21-rcbsD5iNRMYMsiunZ_qia_TFqik8ASNHl_Ccq-B-OSOq99tfte12xJCIGyO_xJ40fRjUm03bZEpN7XUI7QWjM3SrEOaj1Vj-OvBlttxWMeUYbslS6duL_yfo6WIhXLf_FEZrlRJQUi5q5ES2hC0poGnBQQhJab4jzJfMPPgA3v1uOfpjZQSfK9ZCkx4qHAC1Qpzw8gPTfGLwj_B7-th_rwNxVFFkI68xNgxoTh5EKXSDGMCdfx4L7_RuYLC4ro0CRxbTrEmXMCxDHJ2zAJLk_tqVd-U0tXtT=w1295-h870-no?authuser=1",
  "https://lh3.googleusercontent.com/VrAk30zqup82C0UZCayL20NeyVmI-Ny2RjBZqTA8al2rl9WyWDuDZK9M4qLBgJ2maS9EuaD3zZaIO9pnP6n729z_dREBBXhMpyr59O4LFJ53vr15d1ZK05xIEjQDLvqfoROhhMwRmQbhV-hFzsEemBOelM1cejsc-_bGYOd12E-bkRCs8Bo4RCXv69MkA7a_sTtPBPkBnLgiDSQ8xuKfhnzqUDMCqpMsXVpud3qGHrnKmnOG2rcDvsnQZfgJdv72BoXE6zgcHsyHQ9_JqWxGxXYmDJ9rqOUO3IyC3MLwXznKAqv3QmnryCyO3rJrwd8TYmgHnC1KTG7eYnDDacpYdNxyeshqhNbNmAKHnRRweLvRYTEDnaL7PtzeiKTV8090gLWc_CVEaigR7SCisduzLp5jwgQEaRDGJRdyi_8BysrpsyKpQWG3Fdhl0H3Li5OuHXWe0hU2-9R-CnFNnisFMYBEFcNwpT4UINpSLvD3EjYRzI1r4YHOh8KSNYMAPlTyiDBkw_w3xxkwKKlWkNk87Z76XCqZj80HaWRsdF6DCF88iD6R8wIwoEGw3L7neWb6Ba8Ofnm-CLVrwUid3Yo7IVqGwOI8iR9xa8-aqQREmGmcLn3WoCMDGmKDMon6ZYHn64nUbf1v3LQoPqG6YqlnK6bfLIYZmRxJN0f64R-FsVCAmzZby8PV40fxwDIhjvDCdIJgmK5RIkHjRTucGS0oe9eZ=w1295-h870-no?authuser=1",
  "https://lh3.googleusercontent.com/1Mgzl4m_9-hL0a_fFfwa_tD_E6nQl4H5sdswNtB0w0oXoD64gl59CBH8Su7SKL67aI89rqrNXu6lFSAxydqXCuvqaWzzRmhdFHStpD3yfVmZ9XSQ7xwxOGRd2J9qfrIqzrW7AAHWZW3sWeVw68k_OS_M6FMLYcimWFQ7eB7DfIQA5FTkWEVfyPkgZBYvV6YdZs3Gxl9jdRXDivr3238Kcj_D4nOQMc_6UAwhsdLgBexEqdb8D9_P7B6oD206aKlGzhEjcQD3FMAxEvwKUdcsHuUnnr3XbWvBzMbCUstyT6ipNmpQh5eR0jGZnJTPt_j8JOVzJ6xKpuppNZiibxRh5I4oQ-tODDjmIUHjrZ1FIfDHhFoZGXrllRHwHkh8IM4VRuS0OQZALeNDDYsvgFAs0qf1kZe0VDdeTKAi2Sn4ny31Jpv8rMdp5HICMNCIwqqn8RKH7kjpuJvkpcgYIqUYd77iaDlyXvaeIfuuFbSOuOSB32ulIhlOhrHg3BwuH3PMW-DKQJg-h7v9ZI8Nj6P8Ju-oJIz0r7zsfLJUMlxkHSjWVI9GGpaF9Gz1-VbK_WDDCdgVot8w5pNytN6pt5zib7fEGG_KB3PFRfNnZ7vrUmn7j4QUiC9QE6drQ2VgYb8UwZ1UIUmGaN7PuseKtt0cMax_MQg6-J4rWy4CMZQJtVnLrcaQHFbKXzjwcC2-F_0A6laci4CbvugM83NLUJRige8b=w1295-h870-no?authuser=1",
  "https://lh3.googleusercontent.com/aqKuQ1h8VJxH3V_atx7Hik5Wx6VJSOT7i3he2gBKy-_X6uAwD3LyANfnD6pnCa0uiIZgYZPIH-BPrlaV4TZrAud024EjZDkZwmiIBeXJqrVGsXn2BRT3EfrjolsQuWf_vqf1j9k4_OftRLgNwoikKw3mxH3UU0BDlxf3jb6gm5L3iuFu8MfCnOukEmDIKFm2dB6FKIv270fJ5hTY3vL2Ac6PlTMC40V-rRiQtNbYvZyUF2qBlyfVRZh0ScnKUgsHtrkSiQ9cPS51VYYLq0L5dqA0KWM7vjU5xiYdoRaLbopvlEG_CwT8J2Hp1AJoof9v7NwpkQ72vNIHc7bPilpuHh8uN6ZD4DbajIjSZ1bXUIduczF6pmRzHGuB-1xDbcpls4wIbd0gQr48C1cME-JMweZK2rnMctw4L58fdWFighudVZ2Qp00LD0dNHNesYEOoLJjPrAt4SK8ozJgutVZZ6oD8P7IioNsqPvv5sMz6KaHdd2XJ6gU6yGwKo-F2_yqYRkofIDoixVv1W7BW-NPaTCB48_qyDAJPcQrEiy0YaScaknHzFcBiV7wk_D3nL2bmW5nPBOmYc7FsydU_4O5Yi6rKBZfHLGkFEhK5FmmvcTD0vPfSzrfnQ3hwIQUYJ4sNq0e2tWyj6Hn_JBWBG8J71zgg-dTrYQVQ7iyamZVsVNk5u02R7IK59Zasc19fgMaYz6zzz4v4c-SDL4YiOG0A4InZ=w1295-h870-no?authuser=1",
];

function HomeScreen({ navigation }) {
  const categories = ["PRODUCT"];
  const [categoryIndex, setCategoryIndex] = React.useState(0);
  const [searchData_otherScreen, setsearchData_otherScreen] = useState("");

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getItem = async () => {
    try {
      const response = await fetch(
        "http://www.filmcamshop.com/api/SearchProductList.php"
      );
      const json = await response.json();
      setData(json.item.filter((item) => item.status == "active"));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItem();
  }, []);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  const CategoryList = () => {
    return (
      <View style={styles.CategoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}
          >
            <Text
              style={[
                styles.categoryText,
                categoryIndex == index && styles.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 20, backgroundColor: COLORS.green }}>
        <View style={styles.header}>
          <Text
            style={auth.currentUser == null ? styles.hiden : styles.emailText}
          >
            Email: {auth.currentUser?.email}
          </Text>
          <TouchableOpacity
            style={auth.currentUser == null ? styles.hiden : styles.buttonMenu}
            onPress={() => {
              handleSignOut();
            }}
          >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 10,
          }}
        >
          <TextInput
            style={styles.inputText}
            placeholder="Looking for somethings..?"
            onChangeText={(text) => setsearchData_otherScreen(text)}
          ></TextInput>

          <TouchableOpacity style={styles.searchButton}>
            <Text
              style={styles.buttonText}
              onPress={() => {
                navigation.navigate("SearchScreen", { searchData_otherScreen });
              }}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: height * 0.02 }}>
          <SliderBox
            images={images}
            onCurrentImagePressed={(index) =>
              console.warn(`image ${index} pressed`)
            }
            sliderBoxHeight={200}
            dotColor="#61d47c"
            inactiveDotColor="#90A4AE"
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 15,
              marginRight: width * 0.01,
              padding: 0,
              margin: 0,
            }}
          />
        </View>
      </View>
      <View style={styles.header2}>
        <TouchableOpacity
          style={styles.buttonMenuTop}
          onPress={() => navigation.navigate("Address")}
        >
          <Ionicons
            name="ios-information-circle-outline"
            style={styles.icon}
          ></Ionicons>

          <Text style={styles.buttonText}>Shop info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonMenuTop}
          onPress={() => navigation.navigate("Booking")}
        >
          <FontAwesome name="bookmark" style={styles.icon}></FontAwesome>
          <Text style={styles.buttonText}>Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonMenuTop}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <FontAwesome name="list" style={styles.icon}></FontAwesome>
          <Text style={styles.buttonText}>My Profile</Text>
        </TouchableOpacity>
      </View>
      <CategoryList />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
            borderRadius: 40,
          }}
          horizontal={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 10, paddingBottom: 50 }}
          numColumns={2}
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Details", item)}
            >
              <View style={styles.card}>
                <View
                  style={{
                    height: height * 0.45,
                    paddingTop: 0,
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ flex: 1, width: width * 0.4, borderRadius: 10 }}
                    source={{ uri: item.imgURL }}
                  ></Image>
                </View>
                <Text
                  adjustsFontSizeToFit
                  style={{ fontWeight: "bold", marginTop: height * 0.01 }}
                >
                  {item.productName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ fontWeight: "bold", flex: 1 }}>
                    {item.price} Vnd
                  </Text>
                  <View
                    style={{
                      height: height * 0.13,
                      width: height * 0.13,
                      backgroundColor: COLORS.green,
                      borderRadius: 3,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "flex-end",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: COLORS.white }}>
                      +
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hiden: {
    width: 0,
    height: 0,
  },
  card: {
    height: height * 0.9,
    backgroundColor: COLORS.white,
    width: width * 0.425,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  categoryTextSelected: {
    color: "#61d47c",
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#61d47c",
  },
  categoryText: {
    fontSize: 16,
    color: "grey",
    fontWeight: "bold",
  },
  CategoryContainer: {
    flexDirection: "row",
    marginTop: height * 0.05,
    opacity: 0.8,
    color: COLORS.white,
    marginHorizontal: width * 0.02,
    justifyContent: "center",
    fontWeight: "bold",
  },
  container: {
    flex: 2,
    backgroundColor: "#D9D9D9",
    width: width,
    height: height / 0.7,
  },
  buttonMenu: {
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: "gray",
    textAlign: "center",
    alignItems: "center",
    width: "30%",
    backgroundColor: "#fff",
    marginRight: width * 0.03,
    padding: 10,
    marginTop: height * 0.03,

    borderRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#61d47c",
  },
  buttonMenuTop: {
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: "gray",
    textAlign: "center",
    flexDirection: "column",
    width: "30%",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: height * 0.03,
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

    alignSelf: "center",
  },
  header2: {
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.01,
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    backgroundColor: COLORS.green,
    justifyContent: "space-between",
  },

  buttonText: {
    color: COLORS.green,
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  emailText: {
    marginLeft: width * 0.03,
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: height * 0.08,
    alignSelf: "center",
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
  icon: {
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    fontSize: 20,
    padding: 0,
    color: COLORS.green,
  },
  inputText: {
    borderColor: "grey",
    padding: 5,
    width: width * 0.6,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: "bold",
    borderWidth: 1,

    marginLeft: 30,
    marginRight: 15,
  },
  searchButton: {
    fontSize: 15,
    paddingTop: 7,
    width: width * 0.2,

    backgroundColor: "#fff",
    borderRadius: 10,

    borderColor: "grey",
    borderWidth: 1,
  },
});
export default HomeScreen;

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";

function Splash({ changePage }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../imgs/concert-background.jpg")}
      >
        <Image style={styles.logo} source={require("../imgs/white-logo.png")} />
        <Text style={styles.text}>
          Welcome to the music tour of Manchester. Point your phone along the
          pavement and hit 'Start Tour' to begin your journey.
        </Text>
        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              changePage("split", "nav", "map");
            }}
          >
            <Text style={styles.buttonText}>Start Tour</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  map: {
    flex: 1
  },
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  logo: {
    marginTop: 100
  },
  header: {
    flex: 2,
    textAlign: "center",
    fontSize: 40,
    paddingTop: 60,
    padding: 20,
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 2
  },
  text: {
    flex: 3,
    justifyContent: "flex-start",
    fontSize: 25,
    padding: 50,
    marginTop: 130,
    textAlign: "center",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 5
  },
  container2: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50
  },
  button: {
    backgroundColor: "white",
    margin: 10
  },
  buttonText: {
    color: "black",
    padding: 10
  }
});

export default Splash;

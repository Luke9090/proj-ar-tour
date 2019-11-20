"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity
} from "react-native";

export default class Arrival extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { changePage, name } = this.props;
    return (
      <View style={styles.window}>
        <View style={styles.box}>
          <Text style={styles.text}>{"You have arrived at:"}</Text>
          <Text style={styles.text1}>{`${name}`}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            changePage("split", "portal", "content");
          }}
        >
          <Text style={styles.buttonText}>ENTER VENUE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // mapPin: {
  //   width: 38,
  //   height: 35
  // },

  // locationLabel: {
  //   fontFamily: "Arial",
  //   borderRadius: 10,
  //   fontSize: 14,
  //   color: "#fff",
  //   fontWeight: "bold",
  //   padding: 4,
  //   textAlignVertical: "center",
  //   textAlign: "center",
  //   backgroundColor: "rgba(0, 0, 0, 0.4)"
  // },
  text: {
    color: "black",
    fontSize: 30,
    textAlign: "center"
  },
  text1: {
    color: "black",
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold"
  },
  box: {
    borderWidth: 1,
    borderColor: "black",
    padding: 20
  },
  window: {
    // flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    height: 300,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center"
  },
  button: {
    height: 60,
    width: 90,
    backgroundColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 40,
    textAlignVertical: "center",
    paddingTop: 10
  },
  buttonText: { fontSize: 15, color: "white", textAlign: "center", opacity: 1 }
});

module.exports = Arrival;

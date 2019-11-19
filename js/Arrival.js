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

    this.state = {
      arrival: "You have arrived."
    };
  }

  render() {
    const { handleArrivalChange } = this.props;
    return (
      <ImageBackground style={{ height: 300, width: "100%" }}>
        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center"
            }}
          >
            {this.state.arrival}
          </Text>
          <TouchableOpacity
            style={{ opacity: 1 }}
            onPress={() => {
              handleArrivalChange();
            }}
          >
            <Text>ENTER VENUE!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mapPin: {
    width: 38,
    height: 35
  },

  locationLabel: {
    fontFamily: "Arial",
    borderRadius: 10,
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    padding: 4,
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  }
});

module.exports = Arrival;
"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView
} from "react-native";

export default class Content extends Component {
  constructor() {
    super();

    this.state = {
      content: {}
    };
  }

  componentDidMount = () => {
    // Placeholder for fetching specific location data from backend
    const { currLoc } = this.props;
    this.setState({ content: require("./data/location") });
  };

  render() {
    const { text } = this.state.content;
    const { name } = this.props;
    return (
      <View style={styles.window}>
        <ScrollView>
          <Text>{`${name}`}</Text>

          <Text style={styles.text}>{text}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  window: {
    height: 300,
    width: "100%",
    backgroundColor: "white",
    paddingTop: 0
  },
  text: {
    fontSize: 20,
    textAlign: "justify",
    padding: 20,
    color: "black"
  }
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
  // }
});

module.exports = Content;

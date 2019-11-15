"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { ViroARScene, ViroFlexView, ViroImage, ViroText } from "react-viro";

var createReactClass = require("create-react-class");
var Sidebar = createReactClass({
  render: function() {
    const styles = StyleSheet.create({
      title: {
        fontFamily: "Arial",
        fontSize: 30,
        color: "#000000",
        textAlignVertical: "bottom",
        textAlign: "center",
        flex: 0.2,
        marginBottom: 0.2
      },
      info: {
        fontFamily: "Arial",
        fontSize: 12,
        color: "#000000",
        textAlignVertical: "center",
        textAlign: "left",
        flex: 0.5
      }
    });
    const { title, img, text } = this.props;
    return (
      <ViroFlexView
        style={{ flexDirection: "column", padding: 0.1 }}
        width={3.0}
        height={3.0}
        position={[0, 0.0, -2.0]}
        rotationPivot={[0, 0, 2]}
        rotation={[0, 20, 0]}
      >
        <ViroText
          text={title}
          style={styles.title}
          outerStroke={{ type: "Outline", width: 2, color: "#FFFFFF" }}
        />
        <ViroFlexView style={{ flex: 0.8, flexDirection: "row" }}>
          <ViroImage source={img} style={{ flex: 0.5 }} />
          <ViroText
            text={text}
            style={styles.info}
            outerStroke={{ type: "Outline", width: 1, color: "#FFFFFF" }}
          />
        </ViroFlexView>
      </ViroFlexView>
    );
  }
});

module.exports = Sidebar;

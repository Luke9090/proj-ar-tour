"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions
} from "react-native";

export default class LocationsMap extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { locations } = this.props;
    const mapHeight = Math.round(Dimensions.get("window").height * 0.33);
    const mapWidth = Math.round(Dimensions.get("window").width);
    return (
      <ImageBackground
        style={{ height: 250, width: "100%" }}
        source={require("./res/Manchester-Map-Small.png")}
      >
        {locations.map(location => {
          const latBase = 53.471965; // latitude at bottom of map
          const longBase = 2.250271; // longitude at left of map
          const mapHeightInLat = 0.007624; // difference in latitude from top to bottom
          const mapWidthInLong = 0.019947; // diference in longitude from left to right
          const latPixelRatio = mapHeightInLat / mapHeight; // height in latitude divided by height in pixels
          const longPixelRatio = mapWidthInLong / mapWidth; // width in longitude divided by width in pixels
          const latPixels = Math.round(
            (location.coords._lat - latBase) / latPixelRatio
          ); // actual latitude minus base latitude divided by pixel ratio to give pixels from left
          const longPixels = Math.round(
            (longBase + location.coords._long) / longPixelRatio
          ); // actual longitude minus base longitude divided by pixel ratio to give pixels from bottom

          const locationStyle = StyleSheet.create({
            location: {
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              left: longPixels,
              bottom: latPixels
            }
          });

          return (
            <View key={location.name} style={locationStyle.location}>
              <Image
                style={styles.mapPin}
                source={require("./res/mapPin.png")}
              />
              <Text style={styles.locationLabel}>{location.name}</Text>
            </View>
          );
        })}
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

module.exports = LocationsMap;

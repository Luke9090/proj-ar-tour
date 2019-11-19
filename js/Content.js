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
      content:
        "The band released their debut album, The Stone Roses, in 1989. The album was a breakthrough success for the band and garnered critical acclaim, with many critics regarding it as one of the greatest British albums ever recorded. At this time the group decided to capitalise on their success by signing to a major label. Their record label at the time, Silvertone, would not let them out of their contract, which led to a long legal battle that culminated with the band signing with Geffen Records in 1991. The Stone Roses then released their second album, Second Coming, which was met with mixed reviews in 1994.[2] The group soon disbanded after several lineup changes throughout the supporting tour, which began with Reni first departing in early 1995, followed by Squire in April 1996. Brown and Mani dissolved the remains of the group in October 1996 following their appearance at Reading Festival.Following much intensified media speculation, [3] The Stone Roses called a press conference on 18 October 2011 to announce that the band had reunited and would perform a reunion world tour in 2012, including three homecoming shows in Heaton Park, Manchester.[4][5] Plans to record a third album in the future were also floated. In June 2012, Chris Coghill, the writer of the new film which is set during the Stone Roses 1990 Spike Island show, revealed that the band.  In June 2013, a documentary about the band's reformation directed by Shane Meadows and titled The Stone Roses: Made of Stone was released.In 2016 they released their first new material in two decades.The band members continued to tour until June 2017, at which point cryptic remarks by Ian Brown indicated the band had split again, later confirmed in a 2019 interview with John Squire."
    };
  }

  render() {
    const { locations } = this.state;

    return (
      <ImageBackground style={{ height: 300, width: "100%" }}>
        <ScrollView>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            {this.state.content}
          </Text>
        </ScrollView>
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

module.exports = Content;

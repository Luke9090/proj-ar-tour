'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, ImageBackground, Image, ScrollView } from 'react-native';

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
    this.setState({ content: require('./data/location') });
  };

  render() {
    const { text } = this.state.content;
    return (
      <ImageBackground style={{ height: 300, width: '100%' }}>
        <ScrollView>
          <Text style={{ fontSize: 20, textAlign: 'center' }}>{text}</Text>
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
    fontFamily: 'Arial',
    borderRadius: 10,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    padding: 4,
    textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
});

module.exports = Content;

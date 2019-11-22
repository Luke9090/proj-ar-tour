'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';

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
    const locData = require('./data/location')[currLoc];
    this.setState({ content: locData });
  };

  render() {
    const { text, name } = this.state.content;
    const { changePage, currLoc } = this.props;
    return (
      <View style={styles.window}>
        <ScrollView>
          <Text style={styles.title}>{`${name}`}</Text>

          <Text style={styles.text}>{text}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              changePage('splash', 'nav', 'arrival', currLoc ? 0 : 1);
            }}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  window: {
    height: 300,
    width: '100%',
    backgroundColor: 'rgb(231, 231, 231)',
    paddingTop: 0,
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 10
  },
  text: {
    fontSize: 20,
    textAlign: 'justify',
    padding: 20,
    color: 'black'
  },
  button: {
    height: 30,
    width: 60,
    backgroundColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    marginBottom: 40,
    textAlignVertical: 'center',
    padding: 5,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    opacity: 1
  }
});

module.exports = Content;

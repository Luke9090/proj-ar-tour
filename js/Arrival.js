'use strict';

import React, { Component } from 'react';

import { StyleSheet, Text, ImageBackground, View, TouchableOpacity } from 'react-native';

export default class Arrival extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { changePage, name, currLoc } = this.props;
    return (
      <View style={styles.window}>
        <View>
          {/* style={styles.box}> */}
          <Text style={styles.text}>{'You have arrived at:'}</Text>
          <Text style={styles.text1}>{`${name}`}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            changePage('split', 'portal', 'content', currLoc);
          }}
        >
          <Text style={styles.buttonText}>ENTER VENUE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  text1: {
    color: 'black',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  window: {
    // flex: 1,
    flexDirection: 'column',
    paddingTop: 40,
    height: 300,
    width: '100%',
    backgroundColor: 'rgb(231, 231, 231)',

    alignItems: 'center'
  },
  button: {
    height: 60,
    width: 90,
    backgroundColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 40,
    textAlignVertical: 'center',
    paddingTop: 10
  },
  buttonText: { fontSize: 15, color: 'white', textAlign: 'center', opacity: 1 }
});

module.exports = Arrival;

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

function Splash({ changePage }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={require('../imgs/concert-background.jpg')}>
        <Text style={styles.header}>Manchest-AR</Text>
        <Text style={styles.text}>
          Welcome to the music tour of Manchester. Point your phone along the pavement and hit 'Start Tour' to begin your journey.
        </Text>
        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              changePage('split');
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  map: {
    flex: 1
  },
  background: {
    width: '100%',
    height: '100%'
  },
  header: {
    flex: 2,
    textAlign: 'center',
    fontSize: 40,
    paddingTop: 60,
    padding: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 2
    // borderColor: "black",
    // borderWidth: 1
  },
  text: {
    flex: 2,
    justifyContent: 'flex-start',
    fontSize: 20,
    padding: 40,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 2
    // borderColor: "black",
    // borderWidth: 1
  },
  container2: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50
  },
  button: {
    backgroundColor: 'white',
    margin: 10
  },
  buttonText: {
    color: 'black',
    padding: 10
  }
});

export default Splash;

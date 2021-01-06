import React, {Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'

export default function App() {
  return (
    <WelcomeScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

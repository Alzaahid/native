import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import Nav from './Nav'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./pages/Home"
import Manage from "./Manage"
import Category from "./pages/category/Category"
import Stories from "./pages/stories/Stories"

export default function App() {


  const Stack = createStackNavigator();
  

  const Img = () => {
    return (
      <Image
        style={styles.tinyLogo}
        source={require('./assets/logo.png')}
      />
    )

  }

  

  
    return (
      <View style={styles.container}>

        <NavigationContainer >
          <Stack.Navigator>
            <Stack.Screen name=" " component={Nav} options={{ headerStyle: { backgroundColor: 'white' }, headerLeft: () => <Img />, headerTitleStyle: { color: 'black' } }} />
       
            <Stack.Screen name="Manage" component={Manage} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Stories" component={Stories} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  login: {
    flex: 1,
    backgroundColor: '#a29f9f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    backgroundColor: 'whitesmoke',
    height: 300,
    width: 350,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  col2: {
    flex: 3,
    backgroundColor: 'lightblue',
    textAlign: 'center',
  },

  input: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: 10,
  },
 
 
  submitButton: {
    backgroundColor: '#007bff',
    width: 100,
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',

  },



});

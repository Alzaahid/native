import React from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function Home({navigation}) {
    const Stack = createStackNavigator();

    return (
        <View>
            <Button
            title="Go to about"
            onPress={() =>
                navigation.navigate('About', { name: 'Jane' })
                }
                />
            <Button
            title="Go to about1"
            onPress={() =>
                navigation.navigate('About1', { name: 'Jane' })
                }
                />
            <Button
            title="Go to nav"
            onPress={() =>
                navigation.navigate('Nav', { name: 'Jane' })
                }
                />
                
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "dodgerblue",
        padding: 10,
        marginRight : 10
    },
    div: {
        marginTop: 10,
        width: 100
    }

});
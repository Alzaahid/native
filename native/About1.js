import React from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from "react-native";

export default function About({navigation}) {

    return (
        <View>
            <Text>
            this is about1
            </Text>
            <Button
            title="Go to Home"
            onPress={() =>
                navigation.navigate('Home')
                }
                />
        </View>
    );
};

const styles = StyleSheet.create({

});
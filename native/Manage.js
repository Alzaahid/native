import React from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from "react-native";

export default function Manage({ navigation, route }) {

  

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate('Category', {
                       
                    })
                }>
                <Text style={{ color: 'white' }}>
                    Manage Category
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate('Stories', {
                      
                    })
                }>
                <Text style={{ color: 'white' }}>
                    Manage Stories 
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: "center",

    },
    button: {
        backgroundColor: 'teal',
        height: 40,
        width: 200,
        marginBottom: 80,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20,
    }
});
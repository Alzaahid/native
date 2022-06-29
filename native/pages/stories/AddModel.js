import React, { useState, useEffect } from "react";
import { Text, Alert, View, Modal, StyleSheet, Button, TouchableOpacity, ScrollView, TextInput, Picker } from "react-native";
import DatePicker from 'react-native-datepicker'


export default function AddModel({ Alert, populate  }) {

    const [categories, setCategories] = useState([])

    const getCat = () => {
        fetch('http://192.168.43.4:8080/category')
            .then(res => res.json())
            .then((res) => {
                setCategories(res)
            })
    }

    useEffect(() => {
        let isMounted = true
        getCat()

        return () => { isMounted = false };
    })

    const [validation, setValidation] = useState('')
    /* add releted variables */
    const [addModalVisible, setAddModalVisible] = useState(false);

    /* Adding record state variables */
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [date, setDate] = useState('')


    /* add function  */
    const newCat = (c) => {
        setAddModalVisible(true)
    }

    const submitCat = () => {
        if (title.length == 0) {
            setValidation(<Alert mess="Title cannot be emty" color="#f8d7da" />)
            setTimeout(() => { setValidation(''); }, 1000);

        }
        else if (description.length == 0) {
            setValidation(<Alert mess="Description cannot be emty" color="#f8d7da" />)
            setTimeout(() => { setValidation(''); }, 1000);

        }
        else if (date.length == 0) {
            setValidation(<Alert mess="date cannot be emty" color="#f8d7da" />)
            setTimeout(() => { setValidation(''); }, 1000);

        }
        else if (categoryId.length == 0) {
            setValidation(<Alert mess="Please Select a Category" color="#f8d7da" />)
            setTimeout(() => { setValidation(''); }, 1000);

        }
        fetch("http://192.168.43.4:8080/news-stories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title, description: description, date: date, category_id: categoryId })
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.msg == "true") {
                    populate()
                    setValidation(<Alert mess="data added" color="#f8d7da" />)
                    setTimeout(() => { setValidation(''); }, 1000);

                    setTitle('')
                    setDescription('')
                    setDate('')
                    setCategoryId('')
                }
            })

    }
    /* end add function */

    return (
        <View>
            <View>
                <TouchableOpacity
                    style={styles.addbutton}
                    onPress={() => newCat()}
                >
                    <Text style={styles.textStyle}>Add new Story </Text>
                </TouchableOpacity>
            </View>

            {/* add modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={addModalVisible}
                onRequestClose={() => {
                    setModalVisible(!addModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.addModalView}>
                        <Text style={styles.modalText}>Add Category</Text>

                        <Text style={{ marginBottom: 5 }}>
                            {validation}
                        </Text>

                        <TextInput
                            style={{ height: 40, width: 350, borderWidth: 1, borderColor: '#ababc2', padding: 5, borderRadius: 10, marginBottom: 10 }}
                            placeholder="Enter Category"
                            value={title}
                            onChangeText={setTitle}
                        />

                        <TextInput
                            style={{ height: 200, width: 350, borderWidth: 1, borderColor: '#ababc2', padding: 5, borderRadius: 10, marginBottom: 10, textAlignVertical: 'top', }}
                            placeholder="Enter Description"
                            value={description}
                            onChangeText={setDescription}
                            multiline={true}
                        />
                        <DatePicker
                            style={{ width: 350, borderColor: '#ababc2', borderRadius: 10, marginBottom: 10, }}
                            date={date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            onDateChange={setDate}
                        />
                        <View style={{ height: 50, width: 350, borderWidth: 1, marginBottom: 10, borderRadius: 10, borderColor: '#ababc2' }}>
                            <Picker
                                selectedValue={categoryId}
                                onValueChange={(itemValue, itemIndex) => setCategoryId(itemValue)}
                            >
                                <Picker.Item label="Select Category" />
                                {
                                    categories.map((c) => {
                                        return (
                                            <Picker.Item key={c.id} label={c.name} value={c.id} />
                                        );
                                    })
                                }

                            </Picker>

                        </View>


                        <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 100 }}>
                            <TouchableOpacity
                                style={styles.hideButton}
                                onPress={() => setAddModalVisible(!addModalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={() => submitCat()}
                            >
                                <Text style={styles.textStyle}>Submit</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>

    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 200,
        width: 300
    },
    addModalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 550,
        width: 380
    },
    button: {
        padding: 10,
        elevation: 2,
        backgroundColor: 'dodgerblue',
        width: 50
    },
    addbutton: {
        backgroundColor: '#28a745',
        width: 150,
        padding: 8,
        borderRadius: 5,
        marginLeft: 230,
        marginTop: 20,
        marginBottom: 10,
    },
    editbutton: {
        backgroundColor: '#007bff',
        borderRadius: 10,
        marginRight: 5,
        padding: 8,
    },
    deletebutton: {
        backgroundColor: '#ff4c5b',
        borderRadius: 10,
        marginRight: 5,
        padding: 8,
    },
    hideButton: {
        backgroundColor: '#ababc2',
        width: 60,
        padding: 8,
        borderRadius: 10
    },
    submitButton: {
        backgroundColor: '#007bff',
        width: 100,
        padding: 8,
        borderRadius: 10,
        marginLeft: 5

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    },
});
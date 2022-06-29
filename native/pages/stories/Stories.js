import React, { useState, useEffect } from "react";
import { Text, Alert, View, Modal, StyleSheet, Button, TouchableOpacity, ScrollView, TextInput } from "react-native";
import DatePicker from 'react-native-datepicker'
import AddModel from './AddModel'
import { FontAwesome } from '@expo/vector-icons';

export default function Stories({route}) {



    const [categories, setCategories] = useState([])
    const [validation, setValidation] = useState('')


    const [date, setDate] = useState()

    const populate = () => {
        fetch('http://192.168.43.4:8080/news-stories')
            .then(res => res.json())
            .then((res) => {
                setCategories(res)
            })
    }

    useEffect(() => {
        let isMounted = true
        populate()

        return () => { isMounted = false };
    })

    /* edit releted variables */
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editId, setEditId] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editCatId, setEditCatId] = useState('')
    const [editValidation, setEditValidation] = useState('')
    const [editMess, setEditMess] = useState('')

    /* edit fucntion */
    const editStory = (s) => {
        setEditModalVisible(true)
        setEditId(s.id)
        setEditTitle(s.title)
        setEditDescription(s.description)
        setEditCatId(s.category_id)
    }


    const updateStory = () => {
        if (editTitle.length == 0) {
            setValidation(<Alert mess="Enter Title" color="#d4edda" />)
            setTimeout(() => { setValidation(''); }, 200);
        }
        else if (editDescription.length == 0) {
            setValidation(<Alert mess="Enter Description" color="#d4edda" />)
            setTimeout(() => { setValidation(''); }, 200);
        }
        else {
            fetch("http://192.168.43.4:8080/news-stories", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: editTitle, description: editDescription, id: editId })
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    if (res.msg == "true") {
                        populate()
                        setValidation(<Alert mess="Updated " color="#d4edda" />)
                        setTimeout(() => { setValidation(''); }, 200);
                    }
                })
        }


    }
    /* end edit function */



    /* delete function */
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const removeStory = (s) => {
        setDeleteModalVisible(true)
        setEditId(s.id)
        setEditTitle(s.title)

    }
    const deleteCat = (c) => {
        fetch("http://192.168.43.4:8080/news-stories", {
            method: "Delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editId })
        })
            .then(res => res.json())
            .then((res) => {
                if (res.msg == "true") {
                    populate()
                    setDeleteModalVisible(false)
                }
            })

    }

    const Alert = ({ mess, color }) => {
        return (
            <View style={{
                borderRadius: 10,
                width: 200,
                height: 30,
                backgroundColor: color,
                justifyContent: 'center',
                alignItems: "center",
            }}>
                <Text>{mess}</Text>
            </View>
        )

    }

    return (
        <View style={styles.main}>
            <AddModel Alert={Alert} populate={populate}  />

            <View style={styles.table}>
                <View style={styles.tr}>
                    <View style={styles.td}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Name</Text>
                    </View>
                    <View style={styles.td}>
                        <Text></Text>
                    </View>
                </View>
                {
                    categories.map((s) => {
                        return (
                            <View key={s.id} style={styles.tr}>
                                <View key={s.id} style={styles.td}>
                                    <Text>{s.title.substr(0, 20)}...</Text>
                                </View>
                                <View style={styles.td}>
                                    {/*  <Button title="x" color="red" onPress={() => editStory(c)} /> */}
                                    <TouchableOpacity
                                        style={styles.deletebutton}
                                        onPress={() => removeStory(s)}
                                    >
                                        <FontAwesome name="trash-o" size={24} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.editbutton}
                                        onPress={() => editStory(s)}
                                    >
                                        <FontAwesome name="edit" size={24} color="white" />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        );
                    })
                }

            </View>


            {/* edit modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => {
                    setModalVisible(!editModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit Category</Text>
                        <Text style={{ marginBottom: 5 }}>
                            {validation}
                        </Text>
                        <TextInput
                            style={{ height: 40, width: 350, borderWidth: 1, borderColor: '#ababc2', padding: 5, borderRadius: 10, marginBottom: 10 }}
                            placeholder="Enter Category"
                            value={editTitle}
                            onChangeText={setEditTitle}
                        />

                        <TextInput
                            style={{ height: 200, width: 350, borderWidth: 1, borderColor: '#ababc2', padding: 5, borderRadius: 10, marginBottom: 10, textAlignVertical: 'top', }}
                            placeholder="Enter Description"
                            value={editDescription}
                            onChangeText={setEditDescription}
                            multiline={true}
                        />
                        
                        <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 100 }}>
                            <TouchableOpacity
                                style={styles.hideButton}
                                onPress={() => setEditModalVisible(!editModalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#007bff',
                                    width: 150,
                                    padding: 8,
                                    borderRadius: 5,
                                    marginLeft: 5
                                }}
                                onPress={() => updateStory()}
                            >
                                <Text style={styles.textStyle}>Save Changes</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
            {/* delete modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => {
                    setModalVisible(!deleteModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.deleteModalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete {editTitle} ?</Text>

                        <View style={{ flexDirection: "row", marginTop: 10 }}>


                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#ababc2',
                                    width: 50,
                                    padding: 8,
                                    borderRadius: 5,
                                    marginRight: 5,

                                }}
                                onPress={() => deleteCat()}
                            >
                                <Text style={styles.textStyle}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.hideButton}
                                onPress={() => setDeleteModalVisible(!deleteModalVisible)}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

        </View>


    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: 1000
    },
    input: {
        width: "100%",
        borderWidth: 1,
        backgroundColor: "white",
        marginTop: 10,
    },
    table: {
        backgroundColor: 'whitesmoke',
    },

    tr: {
        height: 50,
        backgroundColor: "whitesmoke",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#ababc2',
        marginBottom: 5,
        borderRadius: 9,

    },

    td: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',


    },
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
        height: 500,
        width: 380
    },
    deleteModalView: {
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
        width: 380
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
        height: 220,
        width: 380
    },
    button: {
        padding: 10,
        elevation: 2,
        backgroundColor: 'dodgerblue',
        width: 50
    },
    addbutton: {
        backgroundColor: 'teal',
        width: 150,
        padding: 8,
        borderRadius: 20,
        marginLeft: 230,
        marginTop: 20,
    },
    editbutton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    deletebutton: {
        backgroundColor: '#ff4c5b',
        borderRadius: 5,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,

    },
    hideButton: {
        backgroundColor: '#ababc2',
        width: 60,
        padding: 8,
        borderRadius: 5
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
    alert: {
        borderRadius: 10,
        width: 200,
        height: 30,
        backgroundColor: '#f8d7da',
        justifyContent: 'center',
        alignItems: "center",



    }

});
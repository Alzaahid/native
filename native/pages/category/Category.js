import React, { useState, useEffect } from "react";
import { Text, Alert, View, Modal, StyleSheet, Button, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default function Category({ route }) {


    const [categories, setCategories] = useState([])

    const populate = () => {
        fetch('http://192.168.43.4:8080/category')
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
    const [editName, setEditName] = useState('')
    const [validation, setvalidation] = useState('')

    /* edit fucntion */
    const editCat = (c) => {
        setEditModalVisible(true)
        setEditId(c.id)
        setEditName(c.name)
    }


    const updateCat = () => {
        if (editName.length == 0) {
            setvalidation(<Alert mess="Name cannot be emty" color="#f8d7da" />)
            setTimeout(() => { setvalidation(''); }, 200);
        }
        else {
            fetch('http://192.168.43.4:8080/category', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'name': editName, 'id': editId })
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.msg == 'true') {
                        populate()
                        /* setvalidation(<Alert mess="Updated" color="#fd7da" />) */
                        setvalidation(<Alert mess="Updated" color="#d4edda" />)
                        setTimeout(() => { setvalidation(''); }, 200);
                    }
                })
        }


    }
    /* end edit function */

    /* add releted variables */
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [name, setAddName] = useState('')

    /* add function  */
    const newCat = (c) => {
        setAddModalVisible(true)
    }

    const submitCat = () => {
        if (name.length == 0) {
            setvalidation(<Alert mess="Name cannot be emty" color="#f8d7da" />)
            setTimeout(() => { setvalidation(''); }, 200);

        }
        else {
            fetch('http://192.168.43.4:8080/category', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'name': name })
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.msg == 'true') {
                        setAddName('')
                        populate()
                        setvalidation(<Alert mess="Added" color="#d4edda" />)
                        setTimeout(() => { setvalidation(''); }, 500);
                    }
                })
        }

    }
    /* end add function */

    /* delete function */
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const removeCat = (c) => {
        setDeleteModalVisible(true)
        setEditId(c.id)
        setEditName(c.name)

    }
    const deleteCat = (c) => {
        fetch('http://192.168.43.4:8080/category', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'id': editId})
        })
            .then(res => res.json())
            .then((res) => {
                if (res.msg == 'true') {
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
        <View>
            <View>
                <TouchableOpacity
                    style={styles.addbutton}
                    onPress={() => newCat()}
                >
                    <Text style={styles.textStyle}>Add Category</Text>
                </TouchableOpacity>
            </View>

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
                    categories.map((c) => {
                        return (
                            <View key={c.id} style={styles.tr}>
                                <View style={styles.td}>
                                    <Text>{c.name}</Text>
                                </View>
                                <View style={styles.td}>
                                    {/*  <Button title="x" color="red" onPress={() => editCat(c)} /> */}
                                    <TouchableOpacity
                                        style={styles.deletebutton}
                                        onPress={() => removeCat(c)}
                                    >
                                        <FontAwesome name="trash-o" size={24} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.editbutton}
                                        onPress={() => editCat(c)}
                                    >
                                        <FontAwesome name="edit" size={24} color="white" />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        );
                    })
                }

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
                            style={{ height: 40, width: 350, borderWidth: 1, borderColor: '#ababc2', padding: 5, borderRadius: 5, marginBottom: 10 }}
                            placeholder="Enter Category"
                            value={name}
                            onChangeText={setAddName}
                        />
                        <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 200 }}>
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
                                <Text style={styles.textStyle}>Add</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

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
                            style={{ height: 40, width: 250, borderWidth: 1, borderColor: '#ababc2', padding: 5, borderRadius: 10, marginBottom: 10 }}
                            placeholder="Enter Name"
                            value={editName}
                            onChangeText={setEditName}
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
                                    width: 120,
                                    padding: 8,
                                    borderRadius: 5,
                                    marginLeft: 5
                                }}
                                onPress={() => updateCat()}
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
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete {editName} ?</Text>

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
    input: {
        width: "100%",
        borderWidth: 1,
        backgroundColor: "white",
        marginTop: 10,
    },
    table: {
        backgroundColor: 'whitesmoke',
        marginTop: 40
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
        height: 250,
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
        backgroundColor: '#28a745',
        width: 150,
        padding: 8,
        borderRadius: 5,
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
        width: 55,
        padding: 8,
        borderRadius: 5,
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
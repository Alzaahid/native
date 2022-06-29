import React, { useRef, useState, useEffect } from "react";
import { Button, DrawerLayoutAndroid, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Picker, ScrollView, Modal } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./pages/Home"
import About from "./Manage"
import DatePicker from 'react-native-datepicker'

export default function Nav({ navigation }) {
    const drawer = useRef(null);
    const Stack = createStackNavigator();

    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState()
    const [validationEmail, setValidationEmail] = useState()
    const [validationPassword, setValidationPassword] = useState()
    

    const test = () => {
        console.log('hello')
    }


    /* contains all cat records from database */
    const [category, setCategory] = useState([])

    const getData = () => {
        fetch("http://192.168.43.4:8080/category")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setCategory(res)
            })
    };

    const [news, setNews] = useState([])

    const getNews = () => {
        fetch("http://192.168.43.4:8080/all-news")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setNews(res)
            })
    };

    useEffect(() => {
        getData();
        getNews();
    }, []);

    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
            {/* <Button
            title="Close drawer"
            onPress={() => drawer.current.closeDrawer()}
          /> */}
            {/* <Button
                title="Go to about"
                onPress={() =>
                    navigation.navigate('About', { name: 'Jane' })
                }
                style={styles.menuButton}
            /> */}
            { <TouchableOpacity
                onPress={() =>
                    navigation.navigate('Manage', {
                    
                    })
                }>
                <Text style={{ color: 'white', marginLeft: 100, fontSize: 25 }}>
                    Manage
                </Text>
            </TouchableOpacity> }
            <TouchableOpacity
                onPress={() => handleAll()}
            >
                <Text style={{ color: '#818181', marginLeft: 90, fontSize: 30, marginBottom: 20 }}>
                    All
                </Text>
            </TouchableOpacity>
            {
                category.map(item => {
                    return (
                        <TouchableOpacity
                            onPress={() => filter(item.id, item.name)}
                            key={item.id}
                        >
                            <Text style={{ color: '#818181', marginLeft: 90, fontSize: 30, marginBottom: 20 }}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
    const [drawerPosition, setDrawerPosition] = useState("right");

    const login = () => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email.length == 0) {
            setValidationEmail('Please enter email')
            setTimeout(() => { setValidationEmail(''); }, 3000);

        }
        else if (!email.match(validRegex)) {
            setValidationEmail(
                "Please Enter a valid email"
            )
            setTimeout(() => { setValidationEmail(''); }, 2000);

        }
        else if (password.length == 0) {
            setValidationPassword(
                "Please enter your password."
            )
            setTimeout(() => { setValidationPassword(''); }, 2000);
        }
        else {
            fetch("http://192.168.43.4:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password })
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.msg == "true") {
                     
                        setLoggedIn(true)
                    }
                    else if (res.msg == "false") {
                        setValidation(
                            "Email Or Password Was Incoorect"
                        )
                        setTimeout(() => { setValidation(''); }, 5000);
                    }
                })
        }
    }

    const [filters, setFilters] = useState([])
    const [filterId, setFilterId] = useState([])

    const filter = (id, name) => {
        let new_list = [...filters, { id: id, name: name }]
        setFilters(new_list)

        let new_filter_id = [...filterId, id]
        setFilterId(new_filter_id)
        console.log(filters)


    }

    const removeFilter = (id) => {
        let newList = filters.filter((ele) => {
            if (ele.id != id) {
                return (ele)
            }
        })
        setFilters(newList)

        let newListIds = filterId.filter((ele) => {
            if (ele != id) {
                return (ele)
            }
        })
        setFilterId(newListIds)
    }

    const getFilterNews = () => {
        setNews([])
        fetch("http://192.168.43.4:8080/news-filter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filters: filterId, date: tdate })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setNews(res)

            })
    }


    const [tdate, setTdate] = useState('')
    const [date, setDate] = useState('')



    const [modalVisible, setModalVisible] = useState(false);

    const handleAll = () => {
        setTdate('')
        setFilters([])
    }


    useEffect(() => {
        getFilterNews()
    }, [filterId, tdate]);

    if (loggedIn == true) {
        return (

            <DrawerLayoutAndroid
                ref={drawer}
                drawerWidth={300}
                drawerPosition={drawerPosition}
                renderNavigationView={navigationView}
            >
                <View>
                    

                    <ScrollView horizontal={true}>
                        <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 5 }}>
                            {
                                filters.map(f => {
                                    return (
                                        <View style={{ flexDirection: "row", backgroundColor: "#6c757d", marginRight: 5, padding: 3, borderRadius: 4 }}
                                        
                                        >
                                            <Text style={{
                                                color: 'white'
                                            }}
                                            >{f.name}

                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => removeFilter(f.id)}
                                                style={{ backgroundColor: '#c3c3c3', borderRadius: 5, marginLeft: 4, paddingBottom: 2, }}
                                            >
                                                <Text style={{ color: 'white', paddingLeft: 3, paddingRight: 3, marginLeft: 3, marginRight: 3 }}>
                                                    x
                                                </Text>
                                            </TouchableOpacity>
                                        </View>


                                    )
                                })
                            }
                        </View>
                    </ScrollView>

                    <ScrollView>

                        {
                            news.map(c => {
                                return (
                                    <View style={{ margin: 10 }}>
                                  
                                  <Image
                        
                            source={require('./assets/tech.jpg')}
                            style = {{height :100 ,width : 320}}
                        />
                        <View>
                        <Text style={{ fontSize: 15, marginBottom: 5, border: '2px solid grey' }}>{c.description}</Text>
                        <View
                                            style={{
                                                borderBottomColor: '#bbbbbb',
                                                borderBottomWidth: 2,
                                            }}
                                        />
                                        <Text style={{ fontSize: 15, marginBottom: 5 }}>Category :{c.name}</Text>
                                     
                                    
                                      
                                   
                                        <View
                                            style={{
                                                borderBottomColor: '#bbbbbb',
                                                borderBottomWidth: 2,
                                            }}
                                        />
                                        <Image
                        
                        source={require('./assets/admin.png')}
                        style = {{height :20 ,width : 20, borderRadius : 100/2}}
                    />
                                        <Text style={{ fontSize: 15, marginBottom: 5 }}>Posted By Admin on | {
                                            new Date(
                                                c.date
                                            ).toLocaleDateString("en-US", {
                                                weekday: "short",
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                            })
                                        }</Text>
                                        <View
                                            style={{
                                                borderBottomColor: '#bbbbbb',
                                                borderBottomWidth: 2,
                                            }}
                                        />
                        </View>
                                   
                                    </View>
                                )
                            })
                        }
                    </ScrollView>

                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <DatePicker
                                        style={{ width: 350, borderColor: '#ababc2', borderRadius: 10, marginBottom: 10, }}
                                        date={tdate}
                                        mode="date"
                                        placeholder="select date"
                                        format="YYYY-MM-DD"
                                        onDateChange={setTdate}
                                    />
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: '#d5d2d2',
                                                width: 50,
                                                alignContent: 'center',
                                                alignItems: 'center',
                                                padding: 6,
                                                marginRight: 4
                                            }}
                                            onPress={() => setTdate('')}
                                        >
                                            <Text style={styles.textStyle}>Reset</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: '#717981',
                                                width: 130,
                                                alignContent: 'center',
                                                alignItems: 'center',
                                                padding: 6,
                                            }}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}>Done</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </DrawerLayoutAndroid>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <View style={styles.login}>
                    <View style={styles.loginBox}>
                      
                        <Text style={{
                            color: '#992929',
                        }}>
                            {validation}
                        </Text>

                        <TextInput
                            style={{ height: 40, width: 300, borderWidth: 1, borderColor: '#ababc2', padding: 5, borderRadius: 5, }}
                            placeholder="Enter Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text style={{
                            marginLeft: 180,
                            color: '#992929',
                        }}>
                            {validationEmail}
                        </Text>

                        <TextInput
                            style={{ height: 40, width: 300, borderWidth: 1, borderColor: '#ababc2', padding: 5, borderRadius: 5, }}
                            placeholder="Enter Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            type="password"
                        />
                        <Text style={{
                            marginLeft: 100,
                            color: '#992929',
                        }}>
                            {validationPassword}
                        </Text>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => login()}
                        >
                            <Text style={{
                                color: "white"
                            }}>Login</Text>
                        </TouchableOpacity>




                    </View>
                </View>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "whitesmoke",
    },
    navigationContainer: {
        backgroundColor: "black"
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: "center"
    },
    titleText: {
        fontSize: 50,
        fontWeight: "bold"
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
    tinyLogo: {
        width: 30,
        height: 50,
        position: 'absolute',
        marginLeft: 5
    },
    loginLogo: {
        width: 40,
        height: 70,
        marginBottom: 30,
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
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

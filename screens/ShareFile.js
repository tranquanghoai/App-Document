import { Body, Button, Container, Header, Left, Right, Row, Title } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { FlatList, ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from "react-redux"


import FolderVertical from '../components/folder/FolderVertical';
import FolderHorizontal from '../components/folder/FolderHorizontal';
import SelectFolder from '../components/folder/SelectFolder';
import FileHorizontal from '../components/file/FileHorizontal';
import FileVertical from '../components/file/FileVertical';
import { getListFolder, chooseFolderTransfer } from '../store/action/folder'
import { handleShareFile } from '../store/action/share'
import Entypo from 'react-native-vector-icons/Entypo'
import FactoryService from '../service/FactoryService'

export const ShareType = ({ name, icon, additionnalStyle }) => {
    return (
        <View style={[{
            width: 170,
            height: 35,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            borderColor: '#ccc',
            borderWidth: 1,
            backgroundColor: '#fcfcfc'

        }, additionnalStyle]}>
            <View style={{
                margin: 4
            }}>
                <AntDesign name={icon} color="#000" size={20} />
            </View>
            <Text style={{
                fontSize: 15,
                // fontWeight: 'bold',
                margin: 4,
                color: '#000'
            }}>{name}</Text>
        </View>
    )
}
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export const Employee = ({ employee }) => {
    return (
        <View style={{
            backgroundColor: '#f7f5f2',
            width: '48%',
            height: 30,
            margin: '1%',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        }}>
            {/* <View style={{
                height: 30,
                width: 30,
                borderColor: '#f57811',
                borderWidth: 1,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 16
                }}>T</Text>
            </View> */}
            <View style={{
                flex: 1,
                alignSelf: 'center'
            }}>
                <Text style={{
                    textAlign: 'center'
                }}>{employee.username}</Text>
            </View>

        </View>
    )
}

export default ShareFile = ({ navigation, route }) => {
    const [isPersonal, setIsPersonal] = useState(true)
    const dispatch = useDispatch()
    const employee = useSelector(state => state.auth.employee)
    // const selectFolderTransfer = useSelector(state => state.folder.selectFolderTransfer)


    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', async () => {
    //         await dispatch(chooseFolderTransfer(route.params.selectFolderTransferId))
    //     });

    //     return unsubscribe;
    // }, [navigation]);

    // const saveTransferFolder = () => {
    //     const message = selectFolderTransfer ? selectFolderTransfer.name : 'Thư mục gốc'
    //     global.props.showConfirm(
    //         'Chuyển thư mục',
    //         `Bạn có muốn chuyển tệp tin đến thư mục ${message}?`,
    //         () => dispatch(handleTransferFolder())
    //     )
    // }

    const [keyword, setKeyword] = useState('')
    const [employees, setEmployees] = useState([])
    const [chooseEmployees, setChooseEmployees] = useState([])

    const getEmployees = async () => {
        try {
            const filter = {
                departmentId: employee.departmentId
            }
            const response = await FactoryService.request('AuthService').getListEmployee({ filter: filter, search: keyword })
            const data = response.data
            setEmployees(data.data.filter(e => {
                const found = chooseEmployees.find(choose => choose.id === e.id)
                return found ? false : true
            }))
        } catch (error) {
            console.log(error, 'error')
        }

    }

    const handleChooseEmployee = (employee) => {
        const newChooseEmployee = [...chooseEmployees, employee]
        setChooseEmployees(newChooseEmployee)
    }

    const shareFile = () => {
        const range = isPersonal ? 'people' : 'department'
        const shareWith = isPersonal ? chooseEmployees.map(e => e.id) : []
        global.props.showConfirm(
            'Chia sẻ tệp tin',
            'Bạn có muốn chia sẽ tệp tin đã chọn?',
            () => dispatch(handleShareFile(range, shareWith))
        )
    }

    const deleteChooseEmployee = (employee) => {
        console.log(employee, 'employee')
        console.log(chooseEmployees, 'chooseEmployees')
        let newChooseEmployee = [...chooseEmployees]
        const findIndex = newChooseEmployee.findIndex(e => e.id == employee.id)
        // console.log(findIndex, 'findIndex')
        if (findIndex !== -1) {
            newChooseEmployee.splice(findIndex, 1)
            setChooseEmployees(newChooseEmployee)
        }
    }

    useEffect(() => {
        if (keyword) {
            getEmployees()
        } else {
            setEmployees([])
        }
    }, [keyword]);
    const additionnalStyle = {
        borderRadius: 20,
        borderColor: '#f57811',
        borderWidth: 1,
        backgroundColor: '#fcfcfc'
    }
    let additionnalStylePersonal = {}
    let additionnalStyleDepart = {}
    if (isPersonal) {
        additionnalStylePersonal = { ...additionnalStyle }
    } else {
        additionnalStyleDepart = { ...additionnalStyle }
    }
    return (
        <View style={{
            flex: 1
        }}>
            <Container style={{
                flex: 1
            }}>
                <Header style={{
                    backgroundColor: '#fff',
                }}>
                    <Left>
                        <TouchableOpacity transparent onPress={() => navigation.pop()}>
                            <Feather name="arrow-left" color="#000" size={25} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{
                        flex: 1
                    }}>
                        <Title style={{
                            color: '#000'
                        }}>Chia sẻ</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={shareFile}>
                            <Button transparent>
                                <Entypo name="save" color="#f57811" size={25} />
                            </Button>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={styles.scrollViewWrapper}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginBottom: 8
                    }}>
                        <TouchableOpacity onPress={() => setIsPersonal(true)}>
                            <ShareType name="Cá nhân" icon="adduser" additionnalStyle={additionnalStylePersonal} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsPersonal(false)}>
                            <ShareType name="Phòng ban" icon="addusergroup" additionnalStyle={additionnalStyleDepart} />
                        </TouchableOpacity>
                    </View>
                    {isPersonal ? (
                        <View style={{ marginVertical: 8 }}>
                            <View style={{
                                marginTop: 12,
                                marginBottom: 4
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 16
                                }}>Thành viên được chia sẻ</Text>
                            </View>
                            <FlatList
                                data={chooseEmployees}
                                numColumns={2}
                                style={{
                                    // backgroundColor: 'red',
                                    flexGrow: 0
                                }}
                                renderItem={({ item }) => (
                                    <View style={{
                                        backgroundColor: '#f7f5f2',
                                        width: '48%',
                                        height: 30,
                                        margin: '1%',
                                        borderRadius: 20,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            height: 30,
                                            width: 30,
                                            borderColor: '#f57811',
                                            borderWidth: 1,
                                            borderRadius: 50,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 16
                                            }}>{item.username ? item.username[0] : ''}</Text>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            alignSelf: 'center'
                                        }}>
                                            <Text style={{
                                                textAlign: 'center'
                                            }}>{item.username}</Text>
                                        </View>
                                        <TouchableOpacity style={{
                                            marginRight: 2
                                        }}
                                            onPress={() => deleteChooseEmployee(item)}>
                                            <Entypo name="cross" color="#000" size={20} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={item => item.id}
                            />
                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                                marginVertical: 8

                            }}>
                                <AntDesign name="adduser" color="#000" size={20} />
                                <TextInput
                                    style={{ height: 40, marginLeft: 12 }}
                                    placeholder="Nhập tên thành viên"
                                    onChangeText={(search) => setKeyword(search)}
                                    value={keyword}
                                />
                            </View>
                            {
                                employees.map(employee => (
                                    <TouchableOpacity
                                        key={employee.id}
                                        onPress={() => handleChooseEmployee(employee)}
                                    >
                                        <Employee employee={employee} />
                                    </TouchableOpacity>
                                ))
                            }

                        </View>

                    )
                        :
                        (
                            // <ImageBackground source={require('../assets/departmen1png.png')}
                            //     style={{
                            //         flex: 1,
                            //         resizeMode: "cover",
                            //         justifyContent: "center",
                            //         height: 100
                            //     }}>
                            //     <Text>Tổ chức</Text>
                            // </ImageBackground>
                            <View style={{
                                flex: 1,
                                marginTop: 30
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    textAlign: 'center'
                                }}>Chia sẻ tệp tin với phòng ban của bạn</Text>
                            </View>

                        )}




                </View>


            </Container >

        </View >
    )
}

const styles = StyleSheet.create({
    scrollViewWrapper: {
        margin: 15,
        padding: 4,
        flex: 1
    },
    titleArea: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold"
    }
});
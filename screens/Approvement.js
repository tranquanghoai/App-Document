import { Body, Button, Header, Input, Item, Label, Left, Right, Title } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import ModalAddFileInfo from '../components/modal/ModalAddFileInfo'
import { useSelector, useDispatch } from "react-redux"
import { openModalAddFileInfo } from '../store/action/system'
import { handleCreateTextFile, handleChooseFile, handleUpdateTextFile } from '../store/action/file'
import StepIndicator from 'react-native-step-indicator';
import { Dimensions } from 'react-native';

const labels = ["Cart", "Delivery Address", "Order Summary", "Payment Method", "Track"];
let a = 'Messi đã lập cú đúp giúp Barcelona đánh bại Granada 4-0 tại vòng 18 La Liga. Đó đã là bàn thắng thứ 4 của siêu sao người Argentina trong 2 trận đấu gần nhất, trước đó là cú đúp vào lưới Athletic Bilbao. Phong độ ghi bàn ấn tượng đó đã đưa cầu thủ 33 tuổi vươn lên dẫn đầu cuộc đua Vua phá lưới tại La'
const data = [a, a, a, a, a];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
}
export default function Approvement({ navigation, route }) {
    const [currentPosition, setCurrentPosition] = useState(0)
    // const [name, setName] = useState('Tên tệp tin')
    // const [description, setDescription] = useState('')
    // const [content, setContent] = useState('')
    // const [isNew, setIsNew] = useState(true)
    // const currentFile = useSelector(state => state.file.currentFile)
    // const [displayAsterisk, setDisplayAsterisk] = useState(false)
    // const dispatch = useDispatch()

    // const onHandleSaveFile = () => {
    //     if (!name) return
    //     if (isNew) {
    //         dispatch(handleCreateTextFile(name, description, content)).then((result) => {
    //             navigation.pop()
    //         })
    //     } else {
    //         dispatch(handleUpdateTextFile(name, description, content)).then((result) => {
    //             navigation.pop()
    //         })
    //     }
    // }

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', async () => {
    //         if (route.params?.fileId) {
    //             await dispatch(handleChooseFile(route.params.fileId))
    //             setIsNew(false)
    //         }
    //     });
    //     return unsubscribe;
    // }, [navigation]);

    // useEffect(() => {
    //     if (!isNew) {
    //         if (currentFile) {
    //             const { name, description, content } = currentFile
    //             console.log({ name, description, content })
    //             setName(name)
    //             setDescription(description)
    //             setContent(content)
    //         }
    //     }
    // }, [isNew]);

    return (
        <View style={{
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
                    }}>Ten file</Title>
                </Body>
            </Header>

            <View style={{
                flex: 1,
                margin: 16
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: 'black',
                    marginVertical: 8
                }}>Tình Trạng Duyệt Bài</Text>
                <FlatList
                    style={{ flexGrow: 1 }}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{
                            flexDirection: 'row',
                            // backgroundColor: 'yellow',
                            // alignItems: 'center',
                            // borderBottomColor: '#ccc',
                            // borderBottomWidth: 1,
                            marginBottom: 16,
                            padding: 16,
                            // backgroundColor: 'red'
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                borderColor: 'red',
                                borderWidth: 1,
                                alignItems: 'center',
                            }}>

                                <Text style={{
                                    color: 'green',
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                }}>1</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                marginLeft: 32,
                                // backgroundColor: 'red',
                                paddingLeft: 8,
                                // borderLeftColor: '#ccc',
                                // borderLeftWidth: 1
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>

                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginBottom: 8,

                                    }}>TEN</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontStyle: 'italic',
                                            color: 'red'
                                        }}>Đang chờ</Text>
                                        <View style={{
                                            width: 10,
                                            height: 10,
                                            backgroundColor: 'red',
                                            borderWidth: 1,
                                            borderColor: 'red',
                                            borderRadius: 20,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: 8
                                        }}>
                                            {/* <Text>Duyệt</Text> */}
                                        </View>
                                    </View>

                                </View>

                                <View style={{
                                    marginTop: 8
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        margin: 2
                                    }}>
                                        <Text style={{}}>Nguời duyệt</Text>
                                        <Text> Tran Quang Hoai</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        margin: 2
                                    }}>
                                        <Text style={{}}>Ngày duyệt</Text>
                                        <Text> 26/12/1002</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        margin: 2
                                    }}>
                                        <Text style={{}}>Lời phê</Text>
                                        <Text> Good job, amazing</Text>
                                    </View>
                                </View>

                                {/* <Text>Nguời duyệt: Tran Quang Hoai</Text>
                            <Text>Ngày duyệt: 26/12/1002</Text>
                            <Text>Lời phê: Good job, amazing</Text> */}
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 0,
        fontSize: 16
    },
    buttonStyle: {
        alignSelf: "flex-end",
        margin: 4,
        padding: 8,
        paddingHorizontal: 15,
        borderRadius: 8
    },
    textButton: {
        fontSize: 18,
        color: '#f57811'
    }
});
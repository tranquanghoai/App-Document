import { Body, Button, Header, Input, Item, Label, Left, Right, Title } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import ModalAddFileInfo from '../components/modal/ModalAddFileInfo'
import { useSelector, useDispatch } from "react-redux"
import { openModalAddFileInfo } from '../store/action/system'
import { handleCreateTextFile, handleChooseFile, handleUpdateTextFile } from '../store/action/file'
import { getListTransition } from '../store/action/transition'
import StepIndicator from 'react-native-step-indicator';
import moment from 'moment';
import { Dimensions } from 'react-native';

let a = 'Messi đã lập cú đúp giúp Barcelona đánh bại Granada 4-0 tại vòng 18 La Liga. Đó đã là bàn thắng thứ 4 của siêu sao người Argentina trong 2 trận đấu gần nhất, trước đó là cú đúp vào lưới Athletic Bilbao. Phong độ ghi bàn ấn tượng đó đã đưa cầu thủ 33 tuổi vươn lên dẫn đầu cuộc đua Vua phá lưới tại La'
const data = [a, a, a, a, a];

export default function Approvement({ navigation, route }) {
    const [submitFile, setSubmitFile] = useState(null)
    const dispatch = useDispatch()
    const transitions = useSelector(state => state.transition.transitions)
    const listSubmitFile = useSelector(state => state.submit.listSubmitFile)
    const listLatestSubmit = useSelector(state => state.overview.latestSubmit)

    const formatDate = (date) => {
        return moment(date).format("DD-MM-YYYY")
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params?.submitId) {
                console.log(route.params.submitId, 'route.params.submitId')
                const type = route.params.type
                let submit
                if (type == 'home') {
                    submit = listLatestSubmit.find(s => s.id === route.params.submitId)
                } else {
                    submit = listSubmitFile.find(s => s.id === route.params.submitId)
                }
                console.log(submit, 'submit')
                setSubmitFile(submit)

            }
        });
        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        if (!transitions && !transitions.length) {
            dispatch(getListTransition())
        }
    }, [transitions]);

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
                    }}>{submitFile?.fileId?.name ? submitFile.fileId.name : ''}</Title>
                </Body>
            </Header>

            <ScrollView style={{
                flex: 1,
                margin: 16
            }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: 'black',
                    marginVertical: 8
                }}>Tình Trạng Duyệt Bài</Text>
                <FlatList
                    style={{ flexGrow: 1 }}
                    data={transitions}

                    renderItem={({ item, index }) => {
                        const approved = submitFile ? submitFile.approved : []
                        const foundApprove = approved.find(a => a?.statusTransitionId?.id && a.statusTransitionId.id === item.id)
                        const color = foundApprove ? foundApprove.result === 'accept' ? 'green' : 'red' : '#f57811'
                        return (
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 16,
                                padding: 16,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    justifyContent: 'center',
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                    borderColor: color,
                                    borderWidth: 1,
                                    alignItems: 'center',
                                }}>

                                    <Text style={{
                                        color: color,
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}>{index + 1}</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    marginLeft: 12,
                                    paddingLeft: 8,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>

                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: '400',
                                            marginBottom: 8,
                                            color,
                                            maxWidth: '70%'
                                        }}>{item.name}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontStyle: 'italic',
                                                color: color,
                                            }}>{foundApprove ? foundApprove.result === 'accept' ? 'Chấp thuận' : 'Từ chối' : 'Đang chờ'}</Text>
                                            <View style={[{
                                                width: 10,
                                                height: 10,
                                                borderWidth: 1,
                                                borderColor: '#ccc',
                                                borderRadius: 20,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: color,
                                                marginLeft: 8
                                            }]}>
                                            </View>
                                        </View>

                                    </View>
                                    {foundApprove && (
                                        <View style={{
                                            marginTop: 8
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                margin: 2
                                            }}>
                                                <Text style={{ fontStyle: 'italic' }}>Người duyệt </Text>
                                                <Text style={{ fontStyle: 'italic' }}> {foundApprove?.adminId?.username ? foundApprove.adminId.username : ''}</Text>
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                margin: 2
                                            }}>
                                                <Text style={{ fontStyle: 'italic' }}>Ngày </Text>
                                                <Text style={{ fontStyle: 'italic' }}>{foundApprove?.createdAt ? formatDate(foundApprove.createdAt) : ''}</Text>
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                margin: 2
                                            }}>
                                                <Text style={{ fontStyle: 'italic' }}>Nhận xét</Text>
                                                <Text style={{ fontStyle: 'italic' }}>{foundApprove?.comment ? foundApprove.comment : ''}</Text>
                                            </View>
                                        </View>
                                    )}

                                </View>
                            </View>
                        )
                    }}
                />
            </ScrollView>
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
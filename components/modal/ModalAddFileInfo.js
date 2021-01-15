import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { closeModalAddFileInfo } from '../../store/action/system'
import { handleCreateFolder } from '../../store/action/folder'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-gesture-handler'


export default ModalAddFileInfo = () => {
    const isOpenModalAddFileInfo = useSelector(state => state.system.isOpenModalAddFileInfo)
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [displayAsterisk, setAsterisk] = useState(false)

    const resetText = () => {
        setName('')
        setDescription('')
    }
    const createFolder = () => {
        if (!name) return setAsterisk(true)
        try {
            dispatch(handleCreateFolder(name, description))
            resetText()
            dispatch(closeModalAddFileInfo())
        } catch (error) {
            console.log(error, 'error')
        }
    }
    const onHandleNameChange = (name) => {
        if (displayAsterisk && name) {
            setAsterisk(false)
        }
        setName(name)
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpenModalAddFileInfo}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >

            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }}>
                <TouchableWithoutFeedback onPress={() => dispatch(closeModalAddFileInfo())} >
                    <View style={{
                        width: '100%',
                        height: '35%',
                    }}>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{
                    width: '90%',
                    height: '30%',
                    minHeight: 200,
                    borderRadius: 20,
                    backgroundColor: '#fff',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 1,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingVertical: 8,
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                color: '#f57811'
                            }}>Thông Tin Tệp Tin</Text>
                        </View>
                    </View>

                    <View style={{
                        flex: 1,
                        paddingHorizontal: 20
                    }}>
                        <View style={{
                            flexDirection: "row",
                            // justifyContent: "center"
                            alignItems: "center"
                        }}>
                            <TextInput
                                style={[styles.textInput, { flex: 1 }]}
                                onChangeText={onHandleNameChange}
                                placeholder="Tên tệp tin"
                                autoFocus={true}
                                value={name}
                            />
                            {
                                displayAsterisk && (
                                    <FontAwesome name="asterisk" color="red" size={12} />
                                )
                            }
                        </View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => setDescription(text)}
                            placeholder="Mô tả"
                            value={description}
                        />
                        <View style={{
                            flexDirection: 'row',
                            alignSelf: "flex-end"
                        }}>
                            <TouchableOpacity
                                onPress={resetText}
                                style={styles.buttonStyle}
                            >
                                <Text style={styles.textButton}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={createFolder}
                                style={styles.buttonStyle}
                            >
                                <Text style={styles.textButton}>Tạo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => dispatch(closeModalAddFileInfo())} >
                    <View style={{
                        width: '100%',
                        height: '35%',
                    }}>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
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
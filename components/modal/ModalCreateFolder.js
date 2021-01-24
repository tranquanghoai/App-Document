import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { closeModalCreateFolder } from '../../store/action/system'
import { handleCreateFolder, handleUpdateFolder } from '../../store/action/folder'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-gesture-handler'
import { showMessage, hideMessage } from "react-native-flash-message";

export default ModalCreateFolder = () => {
    const isOpenModalCreateFolder = useSelector(state => state.system.isOpenModalCreateFolder)
    const folder = useSelector(state => state.folder.handleFolder)
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [displayAsterisk, setAsterisk] = useState(false)

    useEffect(() => {
        if (isOpenModalCreateFolder) {
            if (folder) {
                const { name, description } = folder
                setName(name)
                setDescription(description)
            }
        } else {
            setName('')
            setDescription('')
        }
    }, [isOpenModalCreateFolder]);

    const updateFolder = () => {
        dispatch(handleUpdateFolder(folder.id, { name, description })).then((result) => {
            showMessage({
                message: "Cập Nhật Thư Mục Thành Công",
                type: "info",
            });
            resetText()
            dispatch(closeModalCreateFolder())
        })
    }

    const resetText = () => {
        setName('')
        setDescription('')
    }
    const createFolder = async () => {
        if (!name) return setAsterisk(true)
        try {
            await dispatch(handleCreateFolder(name, description))
            showMessage({
                message: "Tạo Thư Mục Thành Công",
                type: "info",
            });
            resetText()
            dispatch(closeModalCreateFolder())
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
            visible={isOpenModalCreateFolder}
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
                <TouchableWithoutFeedback onPress={() => dispatch(closeModalCreateFolder())} >
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
                                fontSize: 16,
                                fontWeight: "bold",
                                color: '#f57811'
                            }}>{
                                    folder ? 'Chinh Sửa Thư Mục' : 'Tạo Thư Mục'
                                }</Text>
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
                                placeholder="Tên thư mục"
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
                            {
                                folder ? (
                                    <TouchableOpacity
                                        onPress={updateFolder}
                                        style={styles.buttonStyle}
                                    >
                                        <Text style={styles.textButton}>Lưu</Text>
                                    </TouchableOpacity>
                                ) : (
                                        <TouchableOpacity
                                            onPress={createFolder}
                                            style={styles.buttonStyle}
                                        >
                                            <Text style={styles.textButton}>Tạo</Text>
                                        </TouchableOpacity>
                                    )
                            }
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => dispatch(closeModalCreateFolder())} >
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
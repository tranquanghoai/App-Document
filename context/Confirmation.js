import React, { Component, createContext } from 'react'
import {
    Text,
    StyleSheet,
    View,
    Modal,
    StatusBar,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native"
import PropTypes from 'prop-types'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Item, Input } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
const ConfirmationContext = createContext({})
export const ConfirmationConsumer = ConfirmationContext.Consumer

export class ConfirmationProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            checkFunction: () => { },
            loading: false
        };
        this.showConfirm = this.showConfirm.bind(this);
        this.hideConfirm = this.hideConfirm.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
    }
    hideConfirm = () => {
        if (this.state.loading) {
            this.setState({
                modalVisible: false,
                loading: false
            })
        } else {
            this.setState({
                modalVisible: false
            })
        }
    }
    showConfirm = (notifcation, content, callback) => {
        this.setState({
            loading: false,
            modalVisible: true,
            notifcation,
            content,
            checkFunction: callback,
        })
    }
    showLoading = () => {
        this.setState({
            modalVisible: true,
            loading: true
        })
    }
    hideLoading = () => {
        this.setState({
            modalVisible: false,
            loading: false
        })
    }
    handleConfirm = () => {
        this.state.checkFunction()
        this.setState({
            modalVisible: false
        })
    }
    render() {
        let { modalVisible, notifcation, content } = this.state
        notifcation = notifcation || 'Thông báo'
        content = content || 'Bạn có muốn thực hiện hành động'
        return (
            <ConfirmationContext.Provider
                value={{
                    hideConfirm: this.hideConfirm,
                    showConfirm: this.showConfirm,
                    showLoading: this.showLoading,
                    hideLoading: this.hideLoading
                }}
            >

                {this.props.children}
                {
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={this.hideConfirm}
                    >
                        {/* <StatusBar backgroundColor={Colors.BLACK_03} /> */}
                        {/* <BaseView
                                containerStyle={{
                                    backgroundColor: Colors.BLACK_03,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            > */}
                        <View style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            alignItems: 'center'
                        }}>
                            {
                                this.state.loading ? (
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <ActivityIndicator size="small" color="white" />
                                        <Text style={{
                                            marginTop: 8,
                                            color: 'white'
                                        }}>Loading</Text>
                                    </View>
                                ) : (
                                        <React.Fragment>
                                            <TouchableWithoutFeedback onPress={this.hideConfirm} >
                                                <View style={{
                                                    width: '100%',
                                                    height: '37.5%',
                                                }}>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <View
                                                style={{
                                                    width: '90%',
                                                    height: '25%',
                                                    backgroundColor: '#fff',
                                                    borderRadius: 20,
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    paddingVertical: 20,
                                                    paddingHorizontal: 10
                                                }}
                                            >
                                                <Text style={styles.notifcation}>{notifcation}</Text>
                                                <Text style={styles.content}>{content}</Text>
                                                <View style={styles.handle}>
                                                    <TouchableOpacity
                                                        onPress={this.handleConfirm}
                                                        style={[styles.button, styles.poleButtonRight]}
                                                    >
                                                        <AntDesign name="check" color="#27AE60" size={24} />

                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={[styles.button, styles.poleButtonLeft]}
                                                        onPress={this.hideConfirm}
                                                    >
                                                        <AntDesign name="close" color="#EB5757" size={24} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <TouchableWithoutFeedback onPress={this.hideConfirm} >
                                                <View style={{
                                                    width: '100%',
                                                    height: '37.5%',
                                                }}>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </React.Fragment>
                                    )
                            }
                        </View>
                    </Modal>
                }
            </ConfirmationContext.Provider>
        );
    }
}

ConfirmationProvider.propTypes = {
    notifcation: PropTypes.string,
    content: PropTypes.string
};

const styles = StyleSheet.create({
    wrapperConfirm: {
        width: '100%',
        height: '30%',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'red',
        // flex: 1
    },
    notifcation: {
        color: '#f57811',
        fontSize: 24
    },
    content: {
        color: '#000',
        fontSize: 18,
        textAlign: "center"
    },
    handle: {
        flexDirection: "row",
        width: '100%'
    },
    button: {
        width: '50%',
        justifyContent: "center",
        alignItems: "center",
        padding: 4
    },
    poleButtonLeft: {
        borderLeftColor: '#000',
        borderLeftWidth: 0.5
    },
    poleButtonRight: {
        borderRightColor: '#000',
        borderRightWidth: 0.5
    }
})
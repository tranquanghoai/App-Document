import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { useSelector, useDispatch } from "react-redux";
import { openModalAddDocument } from '../../store/action/system'
export default function ButtonAddDocument() {
    const dispatch = useDispatch()

    return (
        <TouchableOpacity
            onPress={() => dispatch(openModalAddDocument())}
            style={{
                backgroundColor: '#f57811',
                width: 60,
                height: 60,
                position: 'absolute',
                right: 20,
                bottom: 70,
                borderRadius: 30,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 11,
            }}>
            <Entypo name="plus" color="#fff" size={35} />
        </TouchableOpacity>
    )
}

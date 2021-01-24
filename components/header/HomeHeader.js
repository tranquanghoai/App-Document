import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import { Button, Header, Thumbnail } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'

export default function HomeHeader({ navigation }) {
    const employee = useSelector(state => state.auth.employee)
    const enterPersonalInfomation = () => {
        navigation.navigate('PersonalInfo')
    }
    return (
        <Header style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Button transparent onPress={() => navigation.openDrawer()}>
                <Entypo name="menu" color="#f57811" size={25} />
            </Button>
            <TouchableOpacity style={{
                flex: 1,
                height: 45,
                marginHorizontal: 8,
                borderRadius: 20,
                justifyContent: "center"
            }}
                onPress={() => navigation.push('Search')}
            >
                <Text style={{
                    fontSize: 18,
                    color: '#87878d',
                    marginLeft: 8
                }}>Tìm Kiếm Tài Liệu</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={enterPersonalInfomation}
            >
                <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#f57811',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>{employee?.username ? employee.username[0] : '?'}</Text>
                </View>
            </TouchableOpacity>
        </Header>
    )
}

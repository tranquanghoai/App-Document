import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import { Button, Header, Thumbnail } from 'native-base';

export default function HomeHeader({ navigation }) {
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
            }}>
                <Text style={{
                    fontSize: 18,
                    color: '#87878d',
                    marginLeft: 8
                }}>Tìm Kiếm Tài Liệu</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={enterPersonalInfomation}
            >
                <Thumbnail small
                    source={{
                        uri: "https://www.bridgestorecovery.com/wp-content/uploads/2017/10/Understanding-BPD-Emotional-Manipulation-Techniques-and-How-Treatment-Can-Help-1280x720.jpg"
                    }}
                />
            </TouchableOpacity>
        </Header>
    )
}

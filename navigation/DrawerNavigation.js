import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import Animated from 'react-native-reanimated'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import { Body, Button, Container, Content, Footer, H3, Header, Icon, Left, ListItem, Right, Thumbnail } from 'native-base'
import FactoryService from '../service/FactoryService'
import { domain } from '../service/BaseService'

export default function DrawerNavigation({ progress, ...props }) {

    const [organization, setOrganization] = useState(null)
    const [department, setDepartment] = useState(null)

    const getOrganization = async () => {
        const response = await FactoryService.request('OrganizationService').getMyOrganization()
        setOrganization(response.data)
        const responseDep = await FactoryService.request('DepartmentService').getMyDepartment()
        setDepartment(responseDep.data)
    }

    useEffect(() => {
        getOrganization()
    }, [])

    const translateX = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0]
    })
    return (
        <Container style={{ margin: 18 }}>
            <View style={{
                marginLeft: 4
            }}>
                {
                    organization?.logo ? (
                        <Thumbnail large source={{
                            uri: `${domain}${logo}`
                        }}
                            style={{ marginBottom: 14 }}
                        />
                    ) : (
                            <View style={{
                                width: 100,
                                height: 100,
                                borderColor: '#f57811',
                                borderWidth: 1,
                                borderRadius: 50,
                                marginBottom: 8,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <Text style={{
                                    fontSize: 30
                                }}>{organization?.name ? organization.name[0] : '?'}</Text>
                            </View>
                        )
                }

                <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 14,
                    color: '#000'
                }}>
                    {organization?.name ? organization.name : '?'}
                </Text>

                <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 14,
                    color: '#000'
                }}>
                    {department?.name ? `Phòng ban ${department.name}` : ''}
                </Text>

                <Text style={{
                    fontSize: 18,
                    marginBottom: 14,
                    color: '#000'
                }}>
                    {organization?.address ? `Địa Chỉ ${organization.address}` : ''}
                </Text>
            </View>

            <DrawerItem
                label="Thông tin"
                style={{ backgroundColor: '#000000' }}
                labelStyle={{
                    color: '#000',
                    fontSize: 15
                }}
                onPress={() => { }}
                style={{
                    width: '100%',
                    marginLeft: 0,
                    padding: 0,
                }}
                icon={
                    ({ focused, color, size }) => <AntDesign name="infocirlceo" color="#f57811" size={20} />
                }
            />
            <DrawerItem
                label="Cài đặt"
                style={{ backgroundColor: '#000000' }}
                labelStyle={{
                    color: '#000',
                    fontSize: 15
                }}
                onPress={() => { }}
                style={{
                    width: '100%',
                    marginLeft: 0,
                    padding: 0,
                }}
                icon={
                    ({ focused, color, size }) => <AntDesign name="setting" color="#f57811" size={20} />
                }
            />
            <DrawerItem
                label="Chế độ ban đêm"
                style={{ backgroundColor: '#000000' }}
                labelStyle={{
                    color: '#000',
                    fontSize: 15
                }}
                onPress={() => { }}
                style={{
                    width: '100%',
                    marginLeft: 0,
                    padding: 0,
                }}
                icon={
                    ({ focused, color, size }) => <Fontisto name="night-clear" color="#f57811" size={20} />
                }
            />
            <DrawerItem
                label="Chính sách"
                style={{ backgroundColor: '#000000' }}
                labelStyle={{
                    color: '#000',
                    fontSize: 15
                }}
                onPress={() => { }}
                style={{
                    width: '100%',
                    marginLeft: 0,
                    padding: 0,
                }}
                icon={
                    ({ focused, color, size }) => <Entypo name="star-outlined" color="#f57811" size={20} />
                }
            />
        </Container >

    )
}

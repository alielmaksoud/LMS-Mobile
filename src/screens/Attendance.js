import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { View } from 'react-native'
import { Checkbox } from 'react-native-paper'


const Attendance = ({ navigation }) => (
  <Background>
    <BackButton goBack={navigation.goBack} />
    <Logo />
    <Header>Attendance</Header>
    <View>
    <Checkbox.Item label="Item" status="checked" />
  </View>
  </Background>
)

export default Attendance;

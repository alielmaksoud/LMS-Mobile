import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

const StartScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>LMS</Header>
    <Paragraph>
      Welcome to Learning Managment System, this app allow you to take Attendance and view Reports of the students.
    </Paragraph>
    <Button mode="outlined" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>

  </Background>
)

export default StartScreen

import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'


const Reports = ({ navigation }) => (
  <Background>
    <BackButton goBack={navigation.goBack} />
    <Logo />
    <Header>Reports</Header>
    <Paragraph>
      bla bla bla bla bla bla bla bla 
    </Paragraph>
  </Background>
)

export default Reports

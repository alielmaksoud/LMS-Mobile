import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Avatar, Card, IconButton} from 'react-native-paper'
import {
  StyleSheet,
  View,
} from "react-native";


const Dashboard = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>LMS</Header>
    <View style={styles.container}>
    <Card.Title style={styles.card}
    title="Attendance"
    subtitle="Student Attendance"
    left={(props) => <Avatar.Icon {...props} icon="calendar" />}
    right={(props) => <IconButton {...props} icon={require('../assets/enter.png')} onPress={() => navigation.navigate ('Attendance')} />}
  />
  <Card.Title style={styles.card}
    title="Reports"
    subtitle="Reports of the Students"
    left={(props) => <Avatar.Icon {...props} icon="group" />}
    right={(props) => <IconButton {...props} icon={require('../assets/enter.png')} onPress={() => navigation.navigate('Reports')} />}
  />
  <Card.Title style={styles.card}
    title="News"
    subtitle="Latest News"
    left={(props) => <Avatar.Icon {...props} icon={require('../assets/envelope.png')}/>}
    right={(props) => <IconButton {...props} icon={require('../assets/enter.png')} onPress={() => navigation.navigate('')} />}
  />
  <Card.Title style={styles.card}
    title="Settings"
    subtitle="Adjust Settings"
    left={(props) => <Avatar.Icon {...props} icon={require('../assets/settings.png')}/>}
    right={(props) => <IconButton {...props} icon={require('../assets/enter.png')} onPress={() => navigation.navigate('')} />}
  />
  </View>
  


  
    <Button
      mode="outlined"
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        })
      }
    >
      Logout
    </Button>
  </Background>
)



export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    marginBottom:20
    
  },
  card: {
    backgroundColor: 'lightgray',
    marginTop:20,
    borderRadius:15,
  }
});
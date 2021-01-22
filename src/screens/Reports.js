import * as React from 'react';
import Background from '../components/Background'
import MyPieChart from '../components/charts/donut/donut'
import Search from '../components/charts/donut/Search'
import MyBarChart from '../components/charts/bars/bars'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import BackButton from '../components/BackButton'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function HomeScreen() {
  return (
    // <Background>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{padding: 30, paddingBottom:20}}>Student Attendance</Text>
      {/* <View     style={styles.head}> */}
      <MyPieChart/> 
      {/* </View> */}
      {/* <View  style={styles.foot}> */}
      {/* </View> */}
      
    </View>
    // </Background>
    
  );
}

function SettingsScreen() {
  return (
    <Background>
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Section Attendance</Text>
      <MyBarChart/>
      </View>
    </Background>
   
  );
}

const Tab = createMaterialTopTabNavigator();
console.log(Tab)
const Reports = ({ navigation }) => (
  
 
  
    //<BackButton goBack={navigation.goBack} /> not appearning at any position
    <SafeAreaView style={{
    flex: 1,
    top:getStatusBarHeight()
    }}>
      <Tab.Navigator backBehavior='none'>
        <Tab.Screen name="Student Attendance" component={HomeScreen}  />
        <Tab.Screen name="Section Attendance" component={SettingsScreen} />
      </Tab.Navigator>
    </SafeAreaView>

   
  );
  export default Reports;





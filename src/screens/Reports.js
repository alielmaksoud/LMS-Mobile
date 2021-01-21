import * as React from 'react';
import Background from '../components/Background'
import MyPieChart from '../components/charts/donut/donut'
import MyBarChart from '../components/charts/bars/bars'
import { createStackNavigator } from '@react-navigation/stack'

import BackButton from '../components/BackButton'

import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="A"
        component={MyPieChart}
        options={{ tabBarLabel: 'Home!' }}
      />
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="B"
        component={MyBarChart}
        options={{ tabBarLabel: 'Settings!' }}
      />
    </SettingsStack.Navigator>
  );
}



const Tab = createMaterialTopTabNavigator();
console.log(Tab)
const Reports = ({ navigation }) => (
  
    <Background>
    <BackButton goBack={navigation.goBack} />
      
      <Tab.Navigator >
        <Tab.Screen name="Home" component={HomeStackScreen}  />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>

    </Background>
  );
  export default Reports;





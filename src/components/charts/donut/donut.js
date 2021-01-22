import React, { useEffect, useState } from "react";
import Search from './Search'

import axios from 'axios'
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

//import React Native chart Kit for different kind of Chart
import {
  
  PieChart,
  
} from 'react-native-chart-kit';

const MyPieChart = () => {
  const [studentId, setStudentId] = useState(1);
  const [singleAttendance, setSingleAttendance] = useState([]);
  const [totalAttendance, setTotalAttendance] = useState([]);
  const [Present, setPresent] = useState(5);
  const [Late, setLate] = useState(3);
  const [Absent, setAbsent] = useState(1);

 
  const setStudent = (student) => {
    console.log('lala')
    setStudentId(student);
}

  useEffect (  () => {
    
      var config = {
        method: 'get',
        url: `http://192.168.0.109:8000/api/attendance/${studentId}`,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
       
         axios(config)
         .then(res => {
            if(res.data !==undefined) {
          setSingleAttendance(res.data)
          setTotalAttendance(res.data.length)
          }
         })
         .catch(err => {
          console.log(err.request)
        }) 
 
       
        
    },[studentId]);

    
    useEffect (  () => {
       var Present =[];
       var Late =[];
       var Absent =[];
       try{
          singleAttendance.forEach((item) =>{
             
              if(item.status === 'present'){
                Present.push(item);
                  
              }else if(item.status === 'late'){
                Late.push(item);
             }else if(item.status === 'absent'){
              Absent.push(item);
          }
          }) 
          setPresent(Present.length)
          setLate(Late.length)
          setAbsent(Absent.length)
        }
        catch(e){
          console.log(e)
        }
    },[singleAttendance]);




    
    return (
      <View style={styles.container}>
        <View  style={styles.test}>
        <Search setStudent={setStudent} />
        </View>
       

      <View style={styles.test1}>
        <PieChart

          data={[
            {
              name: 'Present',
              population: Present,
              color: 'rgba(131, 167, 234, 1)',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Absent',
              population: Absent,
              color: '#F00',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Late',
              population: Late,
              color: '#ffffff',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
           
          ]}
          width={Dimensions.get('window').width }
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            flex:1,
            position:'relative',
            marginVertical: 8,
            borderRadius: 16,
            marginBottom:0
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute //for the absolute number remove if you want percentage
        />
        </View>
        </View>
    );
  };

  export default MyPieChart 

  const styles = StyleSheet.create({
    container: {
      flex:1,
      marginBottom:20,
      position:"relative"
     },
     test:{
      flex:1,
     },
     test1:{
      flex:1,
      
     }
    });
    
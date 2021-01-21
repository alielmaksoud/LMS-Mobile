import React, { useState, useEffect } from 'react';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import {
  StyleSheet,
  View,
} from "react-native";
import { DataTable,} from 'react-native-paper'
import { Dropdown } from 'react-native-material-dropdown';




let data = [
 ];




const itemsPerPage = 2;
const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
  {
    key: 4,
    name: 'Page 4',
  },
  {
    key: 5,
    name: 'Page 5',
  },
  {
    key: 6,
    name: 'Page 6',
  },
];




const Attendance = ({ navigation }) => {


  const [page, setPage] = useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  
  const [value, setValue] = React.useState('first');
  
  return(
  <Background>
    <BackButton goBack={navigation.goBack} />
    <Logo />
    <Header>Attendance</Header>
    <View style={styles.container}>

  //we will add 2 drop down one for the class and second for the section

  <Dropdown
        label='class'
        data={data}
      />

<Dropdown
        label='section'
        data={data}
      />

    <DataTable>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.floor(items.length / itemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
      />
    </DataTable>

    // we will fetch all the student in the class and section selected above and make new drop down 
    to select if student if present, absent or late 
    <View>
    
  </View>
  
  </View>
  </Background>
  )
}

export default Attendance;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    marginBottom:20,
   }
  });

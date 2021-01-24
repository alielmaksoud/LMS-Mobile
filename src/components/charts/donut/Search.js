// import React in our code
import React, { useState, useEffect } from "react";

// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

//import SearchableDropdown component
import SearchableDropdown from "react-native-searchable-dropdown";

import axios from "axios";

export default function Search(props) {
  const API = Expo.Constants.manifest.extra.API_URL;
  const [Loading, setLoading] = useState(true);
  const [Student, setStudent] = useState([]);

  useEffect(() => {
    setLoading(true);
    var config = {
      method: "get",
      url: `${API}/api/student`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    axios(config)
      .then((res) => {
        if (res.data !== undefined) {
          let items = [];
          res.data.forEach((item) =>
            items.push({
              id: item.id,
              name: item.first_name + " " + item.last_name,
            })
          );
          setStudent(items);
        }
      })
      .catch((err) => {
        console.log(err.request);
      });
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={(item) => (item ? props.setStudent(item.id) : null)}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 0 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            backgroundColor: "#FAF7F6",
          }}
          itemStyle={{
            //single dropdown item style
            padding: 5,
            marginTop: 0,
            backgroundColor: "#FAF9F8",
            borderColor: "#bbb",
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: "#222",
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: "60%",
          }}
          items={Student}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="Select a student"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
});

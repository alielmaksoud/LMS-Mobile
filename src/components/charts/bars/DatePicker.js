import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DatePicker from "react-native-datepicker";
import { onChange } from "react-native-reanimated";

const DatePicker1 = (props) => {
  const correct = (wrongdate) => {
    let todate = wrongdate.split("-");
    let day = parseInt(todate[2]) + 1;
    todate.splice(2, 1, day);
    return todate.toString().replace(/,/g, "-");
  };
  const [date, setdate] = useState("");

  const handleChanges = (value) => {
    props.setDate(value.toISOString().substring(0, 10));
    setdate(correct(value.toISOString().substring(0, 10)));
  };
  return (
    <View style={styles.container}>
      <DatePicker
        style={styles.datePickerStyle}
        date={date} //initial date from state
        mode="date" //The enum of date, datetime and time
        placeholder={date}
        format="YYYY-MM-DD"
        minDate="2021-1-1"
        maxDate="2022-1-1"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            //display: 'none',
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
        }}
        onDateChange={(event, value) => (value ? handleChanges(value) : null)}
      />
    </View>
  );
};
export default DatePicker1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});

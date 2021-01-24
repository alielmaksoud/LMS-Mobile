import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import Button from "../components/Button";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import ClassSelector from "../components/AttendanceSelectors/ClassSelector";
import SectionSelector from "../components/AttendanceSelectors/SectionSelector";
import styles from "../components/AttendanceSelectors/Attendance.styles";
import { DataTable } from "react-native-paper";
import axios from "axios";

const Attendance = ({ navigation }) => {
  const API = Expo.Constants.manifest.extra.API_URL;
  const [Status, setStatus] = React.useState([]);
  const [FetchedSections, setFetchedSections] = useState([]);
  const [FetchedClasses, setFetchedClasses] = useState([]);
  const [EnableSelector, setEnableSelector] = useState(true);
  const [SelectedClass, setSelectedClass] = useState([]);
  const [SelectedSection, setSelectedSection] = useState([]);
  const [SectionStudents, setSectionStudents] = useState([]);

  var radio_props = [
    { value: "Present" },
    { value: "Late" },
    { value: "Absent" },
  ];

  const getdate = () => {
    let date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    return date.toISOString().substring(0, 10);
  };

  const HandleClass = (prop) => {
    setSelectedClass(prop, testing(prop));
    setSelectedSection({ name: "", id: "" });
    setSectionStudents([]);
  };

  const testing = (test) => {
    if (
      test === undefined ||
      test.length == 0 ||
      test.sections === undefined ||
      test.sections.length == 0
    ) {
      setEnableSelector(false);
      setFetchedSections([{ name: "", id: "" }]);
    } else {
      setEnableSelector(true);
      setSectionStudents([]);
      setFetchedSections([
        { name: "", id: "" },
        ...test.sections.map((item) => {
          return {
            name: item.section_name,
            id: item.id,
          };
        }),
      ]);
    }
  };

  const HandleSection = (prop) => {
    setSelectedSection(prop);
  };

  useEffect(() => {
    axios
      .get(`${API}/api/classesinfo`)
      .then((res) => {
        setFetchedClasses(
          res.data.sections.map((item) => {
            return {
              name: item.class_name,
              id: item.id,
              sections: item.getsections,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (SelectedSection.id !== "") {
      let id = SelectedSection.id;
      axios
        .get(`${API}/api/sectionstudents/${id}`)
        .then((res) => {
          setSectionStudents(res.data.getstudents);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [SelectedSection]);

  const SubmitSheet = (data) => {
    axios
      .post(`${API}/api/massattendance`, data)
      .then((res) => {
        console.log(res.data, "lala");
      })
      .catch((error) => {
        console.log(error);
      });
    setStatus([]);
  };

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Text style={styles.title}>Attendance</Text>
        <View style={styles.selectors}>
          <View>
            <Text>Select Class</Text>
            <ClassSelector
              Objects={FetchedClasses}
              enable={true}
              HandleFunction={HandleClass}
            />
          </View>
          <View>
            <Text>Select Section</Text>
            <SectionSelector
              Objects={FetchedSections}
              enable={EnableSelector}
              HandleFunction={HandleSection}
            />
          </View>
        </View>
        <View style={styles.statusTitles}>
          <Text>Present</Text>
          <Text>Late</Text>
          <Text>Absent</Text>
        </View>
        <ScrollView style={styles.Container}>
          {SectionStudents !== undefined && SectionStudents.lenght !== 1 ? (
            SectionStudents.map((student) => {
              return (
                <View key={student.id} style={styles.mainContainer}>
                  <View>
                    <Text style={styles.studentName}>
                      {student.first_name + " " + student.last_name}
                    </Text>
                  </View>
                  <View key={student.id} style={styles.RadioButtons}>
                    <RadioForm
                      key={student.id}
                      radio_props={radio_props}
                      initial={"Late"}
                      formHorizontal={true}
                      buttonColor={"green"}
                      selectedButtonColor={"green"}
                      onPress={(value) => {
                        let deleted = Status.filter(
                          (item) => item.student_id != student.id
                        );
                        if (
                          Status.filter((item) => item.student_id == student.id)
                        ) {
                          setStatus([
                            ...deleted,
                            {
                              student_id: student.id,
                              section_id: student.section_id,
                              status: value,
                              date: getdate(),
                            },
                          ]);
                        } else {
                          setStatus([
                            ...Status,
                            {
                              student_id: student.id,
                              section_id: student.section_id,
                              status: value,
                              date: getdate(),
                            },
                          ]);
                        }
                      }}
                      buttonSize={10}
                      labelStyle={{
                        marginRight: 46,
                        padding: 0,
                        color: "green",
                      }}
                    />
                  </View>
                </View>
              );
            })
          ) : (
            <Text>Empty Section</Text>
          )}
        </ScrollView>
      </View>
      <Button mode="outlined" onPress={() => SubmitSheet(Status)}>
        Submit
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })
        }
      >
        Logout
      </Button>
    </SafeAreaView>
  );
};

export default Attendance;

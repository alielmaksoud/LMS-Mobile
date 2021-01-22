import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import Button from "../components/Button";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import ClassSelector from "./ClassSelector";
import SectionSelector from "./SectionSelector";
import styles from "./Attendance.styles";
import axios from "axios";

const Dashboard = ({ navigation }) => {
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
      .get("http://192.168.1.104:8000/api/classesinfo")
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
        .get(`http://192.168.1.104:8000/api/sectionstudents/${id}`)
        .then((res) => {
          setSectionStudents(res.data.getstudents);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [SelectedSection]);
  console.log(Status);
  return (
    <Background>
      <SafeAreaView>
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
        <View style={styles.Container}>
          {/* {SectionStudents !== undefined
            ? SectionStudents.map((item) => console.log(item))
            : null} */}
          {SectionStudents !== undefined && SectionStudents.lenght !== 0 ? (
            SectionStudents.map((student) => {
              return (
                <View key={student.id} style={styles.mainContainer}>
                  <View>
                    <Text style={styles.studentName}>
                      {student.first_name + " " + student.last_name}
                    </Text>
                  </View>
                  <View style={styles.RadioButtons}>
                    <RadioForm
                      radio_props={radio_props}
                      initial={0}
                      formHorizontal={true}
                      buttonColor={"green"}
                      selectedButtonColor={"green"}
                      onPress={(value) =>
                        setStatus([
                          ...Status,
                          {
                            student_id: student.id,
                            section_id: student.section_id,
                            status: value,
                            date: getdate(),
                          },
                        ])
                      }
                      buttonSize={15}
                      labelStyle={{
                        marginLeft: 30,
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
        </View>
      </SafeAreaView>

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
    </Background>
  );
};

export default Dashboard;

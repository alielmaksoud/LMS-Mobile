import React, { useState, useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import ClassSelector from "./ClassSelector";
import SectionSelector from "./SectionSelector";
import styles from "./Attendance.styles";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";
import DatePicker from "./DatePicker";

const MyBarChart = () => {
  const todaysdate = () => {
    let today = new Date();
    let d = today.getDate();
    let m = today.getMonth() + 1;
    let y = today.getFullYear();
    if (d < 10) {
      d = "0" + d;
    }
    if (m < 10) {
      m = "0" + m;
    }
    return (today = y + "-" + m + "-" + d);
  };
  const API = Expo.Constants.manifest.extra.API_URL;
  const [FetchedSections, setFetchedSections] = useState([]);
  const [FetchedClasses, setFetchedClasses] = useState([]);
  const [EnableSelector, setEnableSelector] = useState(true);
  const [SelectedClass, setSelectedClass] = useState([]);
  const [SelectedSection, setSelectedSection] = useState([]);
  const [OneSectionAttendance, setOneSectionAttendance] = useState([]);
  const [BarPresent, setBarPresent] = useState(5);
  const [BarLate, setBarLate] = useState(3);
  const [BarAbsent, setBarAbsent] = useState(1);
  const [datee, setdatee] = useState(todaysdate());

  const setDate = (wrongdate) => {
    let todate = wrongdate.split("-");
    let day = parseInt(todate[2]) + 1;
    todate.splice(2, 1, day);
    setdatee(todate.toString().replace(/,/g, "-"), testing(SelectedClass));
    setBarPresent(0);
    setBarLate(0);
    setBarAbsent(0);
  };

  const HandleClass = (prop) => {
    setSelectedClass(prop, testing(prop));
    setSelectedSection({ name: "", id: "" });
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
    setSelectedSection(prop, setOneSectionAttendance(""));
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
        .get(`${API}/api/section/${id}`)
        .then((res) => {
          setOneSectionAttendance(
            res.data.getattendance.filter((item) => item.date == datee)
          );
          ////I still need to make a filter got Section attendance that filters only the dates needed
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [SelectedSection]);

  // const filterAttendance = () => {
  //   if (sectionAttendance !== undefined) {
  //     var dataa = sectionAttendance.filter((item) => item.date == datee);
  //     setOneSectionAttendance(dataa);
  //   }
  // };

  useEffect(() => {
    var barPresent = [];
    var barLate = [];
    var barAbsent = [];

    // filterAttendance();

    if (OneSectionAttendance.length > 0) {
      OneSectionAttendance.forEach((item) => {
        if (item.status === "Present") {
          barPresent.push(item);
        } else if (item.status === "Late") {
          barLate.push(item);
        } else if (item.status === "Absent") {
          barAbsent.push(item);
        }
      });
      setBarPresent(barPresent.length);
      setBarLate(barLate.length);
      setBarAbsent(barAbsent.length);
    } else {
      setBarPresent(0);
      setBarLate(0);
      setBarAbsent(0);
    }
  }, [OneSectionAttendance]);
  console.log(BarPresent, BarAbsent, BarLate);
  return (
    <View>
      <View style={{ flex: 1 }}>
        <DatePicker setDate={setDate} />
      </View>

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

      <View style={{ flex: 2, marginLeft: 20 }}>
        <BarChart
          data={{
            labels: [
              "Present" + BarPresent,
              "Absent" + BarAbsent,
              "Late" + BarLate,
            ],
            datasets: [
              {
                data: [BarPresent, BarAbsent, BarLate],
              },
            ],
          }}
          width={Dimensions.get("window").width - 15}
          height={220}
          yAxisLabel={""}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};
export default MyBarChart;

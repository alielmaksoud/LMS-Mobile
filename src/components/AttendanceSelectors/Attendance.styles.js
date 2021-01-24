import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  screen: {
    margin: 5,
    marginTop: 20,
  },
  RadioButtons: {
    paddingLeft: 25,
    paddingLeft: 25,
  },
  studentName: {
    fontSize: 15,
    width: 150,
    textAlign: "left",
    paddingLeft: 35,
  },
  Container: {
    flexDirection: "column",
    borderStyle: "solid",
    borderColor: "green",
    borderWidth: 1,
    height: 340,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
  },
  statusTitles: {
    fontSize: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 145,
    marginRight: 20,
  },
  selectors: {
    flexDirection: "row",
    height: 80,
    marginBottom: 10,
    borderRadius: 20,
  },
});

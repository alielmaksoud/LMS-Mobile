import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "green",
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  RadioButtons: {
    marginLeft: 40,
  },
  studentName: {
    fontSize: 20,
    marginLeft: 20,
  },
  Container: {
    flexDirection: "column",

    height: 200,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    margin: 20,
  },
  statusTitles: {
    fontSize: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 170,
    marginRight: 40,
  },
  selectors: {
    flexDirection: "row",
    height: 50,
    paddingLeft: 20,
    marginBottom: 10,
  },
});

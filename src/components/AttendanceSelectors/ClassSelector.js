import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

const ClassSelector = (props) => {
  const [state, setstate] = useState("lala");
  const [items, setitems] = useState([]);
  const [enabled, setenabled] = useState(true);

  useEffect(() => {
    setitems(props.Objects);
    setenabled(props.enable);
  }, [props]);

  useEffect(() => {
    props.HandleFunction(state);
  }, [state]);

  return (
    <Picker
      selectedValue={state}
      style={{ height: 50, width: 180 }}
      onValueChange={(itemValue, itemIndex) => setstate(itemValue)}
      enabled={enabled}
    >
      {items.map((item, i) => {
        return <Picker.Item key={i} label={item.name} value={item} />;
      })}
    </Picker>
  );
};

export default ClassSelector;

//<Picker.Item key={i} label={item} value={item} />
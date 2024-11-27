import { Icon } from "@iconify/react";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function SelectSmall() {
  const [language, setLanguage] = React.useState("");

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: 150 }}
      size="small"
      className="flex flex-row gap-4 align-center"
    >
      <Icon
        icon="ion:language"
        style={{
          color: "#DF6690",
          marginRight: "4px",
          width: "1.375rem",
          height: "1.375rem",
        }}
      />
      <NativeSelect
        defaultValue={10}
        inputProps={{
          id: "uncontrolled-native",
          onChange: { handleChange },
        }}
      >
        <option value={10}>SLovenčina</option>
        <option value={20}>Ukrajinčina</option>
        <option value={30}>Angličtina</option>
      </NativeSelect>
    </FormControl>
  );
}

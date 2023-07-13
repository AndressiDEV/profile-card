import { useState } from "react";
import TextField from "../TextField";
function Form() {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <TextField
        label="Outlined"
        value={value}
        variant="outlined"
        onChange={handleChange}
      />
    </div>
  );
}
export default Form;

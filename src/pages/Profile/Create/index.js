import clsx from "clsx";
import styles from "./CreateProfile.module.scss";
import TextField from "../../../components/TextField";
import AutoComplete from "../../../components/AutoComplete";
import { useState } from "react";
const _listOptions = [
  //let or const
  { id: 1, title: "Good Communication" },
  { id: 2, title: "Work hard" },
  { id: 3, title: "Something" },
  { id: 4, title: "Good Coding" },
  { id: 5, title: "Pratical experience" },
];
function Profile() {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeOccupation = (e) => {
    setOccupation(e.target.value);
  };
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.formProfile)}>
        <label>Enter Profile Details</label>
        <TextField
          className="marginTop-16"
          variant="outlined"
          value={name}
          label="Name"
          inputProps={{ maxLength: 50 }}
          onChange={handleChangeName}
        />
        <TextField
          className="marginTop-24"
          variant="standard"
          value={occupation}
          label="Ocuppation"
          inputProps={{ maxLength: 20 }}
          onChange={handleChangeOccupation}
          focused
        />
        <label className="marginTop-16">Short Bio</label>
        <textarea
          className={clsx(styles.customTextArea)}
          placeholder="Enter your bio (The max length is under 60)"
          rows={2}
          maxLength={60}
        />
        <label className="marginTop-24">Bio</label>
        <textarea
          className={clsx(styles.customTextArea)}
          placeholder="Enter your bio (The max length is under 200)"
          rows={4}
          maxLength={200}
        />
        <AutoComplete
          className="marginTop-24"
          label="Skills"
          options={_listOptions}
          getOptionLabel={(option) => {
            //this function as a prop is used for two component(should enhance);
            return option.title;
          }}
          placeholder="Enter some text"
        />
      </div>
      <div className={clsx(styles.previewProfile)}></div>
    </div>
  );
}
export default Profile;

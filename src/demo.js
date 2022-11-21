/* eslint-disable no-use-before-define */
import React from "react";
import { useEffect, useState } from "react";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "./Autocomplete";
import Radio from "@mui/material/Radio";
import Avatar from "@mui/material/Avatar";
// import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const icon = <RadioButtonUncheckedIcon fontSize="small" />;
const checkedIcon = <RadioButtonCheckedIcon fontSize="small" />;

export default function CheckboxesTags() {
  const [user, setUser] = useState([]);
  const [stages, setStages] = useState([]);
  const [owner, setOwner] = useState([]);

  const fetchDataSources = () => {
    return fetch("https://testapi.buopso.com/lms/sources/")
      .then((response) => response.json())
      .then((data) => setUser(data.result));
  };

  const fetchDataStages = () => {
    return fetch("https://testapi.buopso.com/lms/stages/")
      .then((response) => response.json())
      .then((data) => setStages(data.result));
  };

  const fetchDataOwners = () => {
    return fetch("https://testapi.buopso.com/lms/owners/")
      .then((response) => response.json())
      .then((data) => setOwner(data.result));
  };

  useEffect(() => {
    fetchDataOwners();
  }, []);

  useEffect(() => {
    fetchDataSources();
  }, []);

  useEffect(() => {
    fetchDataStages();
  }, []);

  function randomColor() {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = "#" + hex.toString(16);

    return color;
  }

  return (
    <>
      <Autocomplete
        // multiple
        id="checkboxes-tags-demo"
        options={owner}
        disableCloseOnSelect
        getOptionLabel={(option) => option.firstName + option.lastName}
        renderOption={(option, { selected, inputValue }) => {
          return (
            <React.Fragment>
              <Radio
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />

              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  margin: 2,
                  backgroundColor: randomColor()
                }}
              >
                {option.firstName[0]}
              </Avatar>
              {option.firstName + " " + option.lastName}
            </React.Fragment>
          );
        }}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Lead Owner"
            placeholder="Search"
            fullWidth
          />
        )}
      />
      <Divider style={{ margin: "20px 0" }} />
      <Autocomplete
        // multiple
        id="checkboxes-tags-demo"
        options={user}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        renderOption={(option, { selected, inputValue }) => {
          return (
            <React.Fragment>
              <Radio
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </React.Fragment>
          );
        }}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Lead Sources"
            placeholder="Search"
            fullWidth
          />
        )}
      />
      <Divider style={{ margin: "20px 0" }} />
      <Autocomplete
        // multiple
        id="checkboxes-tags-demo"
        options={stages}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        renderOption={(option, { selected, inputValue }) => {
          return (
            <React.Fragment>
              <Radio
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </React.Fragment>
          );
        }}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Stages"
            placeholder="Search"
            fullWidth
          />
        )}
      />
    </>
  );
}

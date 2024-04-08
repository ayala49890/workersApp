import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRole } from "../service/serviceRole";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Typography,
} from "@mui/material";
import Header from "../header";
import { useNavigate } from "react-router-dom";


export default function AddRole() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isAdministrative, setIsAdministrative] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleIsAdministrativeChange = (event) => {
    setIsAdministrative(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() !== "") {
      dispatch(addRole({ name: name.trim(), isAdministrative }));
      navigate(`/roles`);
      setName("");
      setIsAdministrative(false);
    } else {
      setError("שם התפקיד אינו יכול להיות ריק");
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h5" component="h2" gutterBottom>
          הוספת תפקיד חדש
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="שם התפקיד"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            error={error !== ""}
            helperText={error}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdministrative}
                onChange={handleIsAdministrativeChange}
              />
            }
            label="ניהולי?"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={name.trim() === ""}
          >
            הוסף תפקיד
          </Button>
        </form>
      </Container>
    </>
  );
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRole } from "../service/serviceRole";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Typography,
  Snackbar,
} from "@mui/material";
import Header from "../header";
import { useNavigate } from "react-router-dom";

export default function AddRole() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isAdministrative, setIsAdministrative] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const rolesList = useSelector((state) => state.roles.roles);
  const navigate = useNavigate();

  dispatch({ type: "SET_SELECTED_WORKER", payload: null });

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleIsAdministrativeChange = (event) => {
    setIsAdministrative(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const trimmedName = name.trim();

    const existingRole = rolesList.find((role) => role.name === trimmedName);
    if (existingRole && existingRole.isAdministrative == isAdministrative) {
      setError("תפקיד זה כבר קיים עם אותו ערך ניהולי ");
      setOpenSnackbar(true);
      return;
    }

    if (trimmedName !== "") {
      dispatch(addRole({ name: trimmedName, isAdministrative }));
      navigate(`/roles`);
      setName("");
      setIsAdministrative(false);
    } else {
      setError("שם התפקיד אינו יכול להיות ריק");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={error}
        />
      </Container>
    </>
  );
}

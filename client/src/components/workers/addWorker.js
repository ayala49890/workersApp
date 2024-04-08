import React, { useState, useEffect } from "react";
import Header from "../header";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editWorker, addWorker } from "../service/serviceWorker";
import { getRoles } from "../service/serviceRole";
import { useNavigate } from "react-router-dom";

const AddWorker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    dateOfBirth: "",
    startWorkingDate: "",
    gender: "",
    roles: [],
    status: "",
  });
  const rolesList = useSelector((state) => state.roles.roles);
  const worker = useSelector((state) => state.workers.selectedWorker);

  useEffect(() => {
    dispatch(getRoles());
    if (worker) {
      setFormData(worker);
    } else {
      // איפוס הנתונים במקרה של הוספת עובד חדש
      setFormData({
        firstName: "",
        lastName: "",
        idNumber: "",
        dateOfBirth: "",
        startWorkingDate: "",
        gender: "",
        roles: [],
        status: "",
      });
    }
  }, [dispatch, worker]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e, index) => {
    const updatedRoles = [...formData.roles];
    updatedRoles[index] = { roleId: e.target.value, entryDate: "" };
    setFormData({ ...formData, roles: updatedRoles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let workerToSend = {
      ...formData,
      roles: formData.roles?.map((role) => ({
        ...role,
        entryDate: role.entryDate || "",
      })),
    };
    if (!worker) {
      workerToSend = {
        ...workerToSend,
        firstName: "",
        lastName: "",
        idNumber: "",
        dateOfBirth: "",
        startWorkingDate: "",
        gender: "",
        status: "",
      };
      dispatch(addWorker(workerToSend));
    } else {
      dispatch({ type: "SET_SELECTED_WORKER", payload: null });
      dispatch(editWorker(worker.id, workerToSend));
    }
    navigate("/workers");
  };

  const handleAddRole = () => {
    setFormData({
      ...formData,
      roles: [...formData.roles, { roleId: "", entryDate: "" }],
    });
  };

  return (
    <>
      <Header />
      <Grid container justifyContent="center" style={{ marginTop: "100px" }}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="שם פרטי"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="שם משפחה"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="idNumber"
                  name="idNumber"
                  label="תעודת זהות"
                  fullWidth
                  value={formData.idNumber || ""}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label="תאריך לידה"
                  type="date"
                  fullWidth
                  value={
                    formData.dateOfBirth
                      ? formData.dateOfBirth.substring(0, 10)
                      : ""
                  }
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="startWorkingDate"
                  name="startWorkingDate"
                  label="תאריך תחילת העבודה"
                  type="date"
                  fullWidth
                  value={
                    formData.startWorkingDate
                      ? formData.startWorkingDate.substring(0, 10)
                      : ""
                  }
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="gender-label">מגדר</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="male">זכר</MenuItem>
                    <MenuItem value="female">נקבה</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {formData.roles?.map((role, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id={`role-label-${index}`}>תפקיד</InputLabel>
                      <Select
                        labelId={`role-label-${index}`}
                        id={`role-${index}`}
                        value={role.roleId}
                        onChange={(e) => handleRoleChange(e, index)}
                        required
                      >
                        {rolesList?.map((roleOption) => (
                          <MenuItem key={roleOption.id} value={roleOption.id}>
                            {roleOption.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id={`entryDate-${index}`}
                      name={`entryDate-${index}`}
                      label={`תאריך התחלת תפקיד`}
                      type="date"
                      fullWidth
                      value={role.entryDate || ""}
                      onChange={(e) => {
                        const updatedRoles = [...formData.roles];
                        updatedRoles[index].entryDate = e.target.value;
                        setFormData({ ...formData, roles: updatedRoles });
                      }}
                      required
                    />
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAddRole}
                >
                  הוסף תפקיד
                </Button>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">סטטוס</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="active">פעיל</MenuItem>
                    <MenuItem value="inactive">לא פעיל</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              שלח
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AddWorker;

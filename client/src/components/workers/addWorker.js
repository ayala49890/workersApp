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
  FormHelperText,
  IconButton,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editWorker, addWorker } from "../service/serviceWorker";
import { getRoles } from "../service/serviceRole";
import { useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";

const GenderEnum = {
  Male: 1,
  Female: 2,
};

const AddWorker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      identity: "",
      dateOfBirth: "",
      startWorkingDate: "",
      gender: GenderEnum.Male,
      roles: [{ roleId: "", entryDate: "" }],
      status: true,
    });
    navigate("/workers");
  };

  const isValidIsraeliID = (id) => {
    if (typeof id !== "string") return false;
    id = id.trim();
    if (id.length !== 9 || isNaN(id)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let digit = parseInt(id.charAt(i));
      if (i % 2 === 0) {
        digit *= 1;
      } else {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    identity: "",
    dateOfBirth: "",
    startWorkingDate: "",
    gender: GenderEnum.Male,
    roles: [{ roleId: "", entryDate: "" }],
    status: true,
  });
  const [roleIsManager, setRoleIsManager] = useState([false]);
  const [addRoleEnabled, setAddRoleEnabled] = useState(false);
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    identity: false,
    dateOfBirth: false,
    startWorkingDate: false,
    gender: false,
    roles: false,
    status: false,
    duplicateRole: false,
  });
  const rolesList = useSelector((state) => state.roles.roles);
  const worker = useSelector((state) => state.workers.selectedWorker);

  useEffect(() => {
    dispatch(getRoles());
    if (worker) {
      setFormData({
        ...worker,
        dateOfBirth: worker.dateOfBirth
          ? new Date(worker.dateOfBirth).toISOString().split("T")[0]
          : "",
        startWorkingDate: worker.startWorkingDate
          ? new Date(worker.startWorkingDate).toISOString().split("T")[0]
          : "",
        gender: worker.gender || GenderEnum.Male,
        status: worker.status || true,
        roles: worker.roles?.map((role) => ({
          ...role,
          entryDate: role.entryDate
            ? new Date(role.entryDate).toISOString().split("T")[0]
            : "",
        })) || [{ roleId: "", entryDate: "" }],
      });
      setRoleIsManager(worker.roles?.map((role) => role.isManager) || [false]);
    }
  }, [dispatch, worker]);

  useEffect(() => {
    const enableButton = formData.roles.some(
      (role) => role.roleId && role.entryDate
    );
    setAddRoleEnabled(enableButton);
  }, [formData.roles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "startWorkingDate") {
      const isValidStartWorkingDate = isValidStartDate(
        value,
        formData.dateOfBirth
      );
      setErrors({ ...errors, startWorkingDate: !isValidStartWorkingDate });
    } else {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleRoleChange = (e, index) => {
    const updatedRoles = [...formData.roles];
    updatedRoles[index] = { ...updatedRoles[index], roleId: e.target.value };
    setFormData({ ...formData, roles: updatedRoles });
    setErrors({ ...errors, roles: false });
  };

  const handleManagerCheckboxChange = (e, index) => {
    const updatedRoleIsManager = [...roleIsManager];
    updatedRoleIsManager[index] = e.target.checked;
    setRoleIsManager(updatedRoleIsManager);
  };

  const isValidStartDate = (startDate, dateOfBirth) => {
    const minStartDate = new Date(dateOfBirth);
    minStartDate.setFullYear(minStartDate.getFullYear() + 16);
    return new Date(startDate) >= minStartDate;
  };

  const handleAddRole = () => {
    const updatedRoles = [{ roleId: "", entryDate: "" }, ...formData.roles];
    setFormData({ ...formData, roles: updatedRoles });
    setRoleIsManager([false, ...roleIsManager]);
  };

  const handleRemoveRole = (index) => {
    const updatedRoles = [...formData.roles];
    updatedRoles.splice(index, 1);
    setFormData({ ...formData, roles: updatedRoles });
    const updatedRoleIsManager = [...roleIsManager];
    updatedRoleIsManager.splice(index, 1);
    setRoleIsManager(updatedRoleIsManager);
    // Reset errors when a role is removed
    const newErrors = { ...errors };
    delete newErrors.duplicateRole;
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = true;
      formIsValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = true;
      formIsValid = false;
    }
    if (!isValidIsraeliID(formData.identity)) {
      newErrors.identity = true;
      formIsValid = false;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = true;
      formIsValid = false;
    }
    if (!formData.startWorkingDate) {
      newErrors.startWorkingDate = true;
      formIsValid = false;
    }
    if (!isValidStartDate(formData.startWorkingDate, formData.dateOfBirth)) {
      newErrors.startWorkingDate = true;
      formIsValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = true;
      formIsValid = false;
    }
    if (formData.roles.length === 0) {
      newErrors.roles = true;
      formIsValid = false;
    }
    if (!formData.status) {
      newErrors.status = true;
      formIsValid = false;
    }

    const roleCounts = {};
    formData.roles.forEach((role) => {
      if (role.roleId in roleCounts) {
        roleCounts[role.roleId]++;
      } else {
        roleCounts[role.roleId] = 1;
      }
    });
    if (Object.values(roleCounts).some((count) => count > 1)) {
      newErrors.duplicateRole = true;
      formIsValid = false;
    }

    if (
      new Date(formData.startWorkingDate) < new Date(formData.dateOfBirth) ||
      formData.roles.some(
        (role) =>
          !role.entryDate ||
          new Date(role.entryDate) < new Date(formData.startWorkingDate)
      )
    ) {
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    // Reset errors when form is valid
    setErrors({});

    const workerToSend = {
      ...formData,
      roles: formData.roles.map((role, index) => ({
        roleId: role.roleId,
        entryDate: role.entryDate ? new Date(role.entryDate) : new Date(),
        workerId: formData.workerId,
      })),
      dateOfBirth: new Date(formData.dateOfBirth),
      startWorkingDate: formData.startWorkingDate
        ? new Date(formData.startWorkingDate)
        : new Date(),
    };
    if (!worker) {
      dispatch(addWorker(workerToSend));
    } else {
      dispatch(editWorker(workerToSend));
    }
    navigate("/workers");
  };

  return (
    <>
      <Header />
      <div
        style={{
          position: "sticky",
          top: "50%",
          transform: "translateY(50%)",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCancel}
          style={{
            borderRadius: "30px",
            marginTop: "20px",
            background: "#ff4f4f",
            color: "white",
            fontWeight: "bold",
            boxShadow: "none",
            "&:hover": { background: "#ff0000" },
          }}
        >
          ביטול
        </Button>
      </div>
      <Grid container justifyContent="center" style={{ marginTop: "10px" }}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="שם פרטי"
                    fullWidth
                    value={formData.firstName || ""}
                    onChange={handleInputChange}
                    required
                    error={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="שם משפחה"
                    fullWidth
                    value={formData.lastName || ""}
                    onChange={handleInputChange}
                    required
                    error={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="identity"
                    name="identity"
                    label="מספר תעודת זהות"
                    fullWidth
                    value={formData.identity || ""}
                    onChange={handleInputChange}
                    required
                    error={errors.identity}
                  />
                  {errors.identity && (
                    <FormHelperText error>
                      יש להזין מספר תעודת זהות ישראלי תקין
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="תאריך לידה"
                    type="date"
                    fullWidth
                    value={formData.dateOfBirth || ""}
                    onChange={handleInputChange}
                    required
                    error={errors.dateOfBirth}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={errors.gender}>
                    <InputLabel id="gender-label">מגדר</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      name="gender"
                      value={formData.gender || GenderEnum.Male}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value={GenderEnum.Male}>זכר</MenuItem>
                      <MenuItem value={GenderEnum.Female}>נקבה</MenuItem>
                    </Select>
                    {errors.gender && (
                      <FormHelperText>יש לבחור מגדר</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="startWorkingDate"
                    name="startWorkingDate"
                    label="תאריך תחילת עבודה"
                    type="date"
                    fullWidth
                    value={formData.startWorkingDate || ""}
                    onChange={handleInputChange}
                    required
                    error={errors.startWorkingDate}
                  />
                  <FormHelperText error>
                    {errors.startWorkingDate &&
                      "תאריך תחילת העבודה חייב להיות לפחות 16 שנים אחרי תאריך הלידה"}
                  </FormHelperText>
                </Grid>
                {formData.roles.map((role, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={12} sm={5}>
                      <FormControl
                        fullWidth
                        error={errors.roles || errors.duplicateRole}
                      >
                        <InputLabel id={`role-label-${index + 1}`}>
                          תפקיד
                        </InputLabel>
                        <Select
                          labelId={`role-label-${index + 1}`}
                          id={`role-${index + 1}`}
                          value={role.roleId || ""}
                          onChange={(e) => handleRoleChange(e, index)}
                          required
                        >
                          {rolesList
                            .filter(
                              (roleOption) =>
                                (roleIsManager[index] &&
                                  roleOption.isAdministrative) ||
                                !roleIsManager[index]
                            )
                            .map((roleOption) => (
                              <MenuItem
                                key={roleOption.id}
                                value={roleOption.id}
                              >
                                {roleOption.name}
                              </MenuItem>
                            ))}
                        </Select>
                        {(errors.roles || errors.duplicateRole) && (
                          <FormHelperText error>
                            {errors.duplicateRole
                              ? "לא ניתן להוסיף תפקיד זהה יותר מפעם אחת"
                              : "יש לבחור תפקיד"}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        id={`entryDate-${index + 1}`}
                        name={`entryDate-${index + 1}`}
                        label={`תאריך תחילת תפקיד`}
                        type="date"
                        fullWidth
                        value={role.entryDate || ""}
                        onChange={(e) => {
                          const updatedRoles = [...formData.roles];
                          updatedRoles[index].entryDate = e.target.value;
                          setFormData({ ...formData, roles: updatedRoles });
                        }}
                        required
                        error={
                          role.entryDate &&
                          new Date(role.entryDate) >
                            new Date(formData.startWorkingDate)
                        }
                      />
                      {role.entryDate &&
                        new Date(role.entryDate) <
                          new Date(formData.startWorkingDate) && (
                          <FormHelperText error>
                            תאריך תחילת התפקיד חייב להיות אחרי או שווה לתאריך
                            תחילת העבודה
                          </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <FormControl>
                        <Checkbox
                          id={`manager-checkbox-${index + 1}`}
                          name={`manager-checkbox-${index + 1}`}
                          checked={roleIsManager[index]}
                          onChange={(e) =>
                            handleManagerCheckboxChange(e, index)
                          }
                        />
                        <FormHelperText>תפקיד ניהולי</FormHelperText>
                      </FormControl>
                    </Grid>
                    {index >= 0 && (
                      <Grid item xs={12} sm={1}>
                        <Tooltip title="לחץ להסרה">
                          <span>
                            <IconButton
                              aria-label="remove-role"
                              onClick={() => handleRemoveRole(index)}
                              disabled={formData.roles.length === 1}
                              style={{
                                border: "1px solid blue",
                                borderRadius: "50%",
                              }}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Grid>
                    )}
                  </React.Fragment>
                ))}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAddRole}
                    disabled={!addRoleEnabled}
                  >
                    הוסף תפקיד
                  </Button>
                  {errors.roles && (
                    <FormHelperText error>
                      יש להוסיף לפחות תפקיד אחד
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={errors.status}>
                    <InputLabel id="status-label">סטטוס</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status"
                      name="status"
                      value={formData.status || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value="true">פעיל</MenuItem>
                      <MenuItem value="false">לא פעיל</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={
                      !formData.dateOfBirth ||
                      !formData.firstName ||
                      !formData.gender ||
                      !formData.identity ||
                      !formData.lastName ||
                      !formData.roles ||
                      !formData.startWorkingDate ||
                      !formData.status ||
                      formData.roles.some(
                        (role) => !role.roleId || !role.entryDate
                      )
                    }
                  >
                    {worker ? "עדכן עובד" : "הוסף עובד"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AddWorker;

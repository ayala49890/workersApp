import axios from "axios";
import Swal from "sweetalert2";

export const getRoles = () => {
  return (dispatch) => {
    axios
      .get("https://localhost:7281/workers.co.il/Roles")
      .then((res) => {
        dispatch({ type: "SET_ROLES", payload: res.data });
      })
      .catch((error) => console.error(error));
  };
};

export const deleteRole = (roleId) => {
  return (dispatch) => {
    axios
      .delete(`https://localhost:7281/workers.co.il/Roles/${roleId}`)
      .then(() => {
        dispatch({ type: "DELETE_ROLE", payload: roleId });
        Swal.fire({
          icon: "success",
          position: "center",
          title: "!התפקיד נמחק בהצלחה",
        });
      })
      .catch((error) => {
        Swal.fire({ icon: "error", position: "center", title: "שגיאת מחיקה" });
      });
  };
};
export const addRole = (role) => {
  return (dispatch) => {
    axios
      .post("https://localhost:7281/workers.co.il/Roles", role)
      .then((res) => {
        dispatch({ type: "ADD_ROLE", payload: res.data });
        Swal.fire({
          icon: "success",
          position: "center",
          title: "התפקיד הוסף בהצלחה",
        });
      })
      .catch((err) => {
        Swal.fire({ icon: "error", position: "center", title: "שגיאת הוספה" });
      });
  };
};

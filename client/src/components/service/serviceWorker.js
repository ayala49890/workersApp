import axios from "axios";
import Swal from "sweetalert2";

export const getWorkers = () => {
  return (dispatch) => {
    axios
      .get("https://localhost:7281/api/Workers")
      .then((res) => {
        dispatch({ type: "SET_WORKERS", payload: res.data });
      })
      .catch((error) => console.error(error));
  };
};

export const deleteWorker = (worker) => {
  return (dispatch) => {
    axios
      .delete(`https://localhost:7281/api/Workers/${worker.id}`)
      .then(() => {
        dispatch({ type: "DELETE_WORKER", payload: worker.id });
        Swal.fire({
          icon: "success",
          position: "center",
          title: "!העובד נמחק בהצלחה",
        });
      })
      .catch((error) => {
        Swal.fire({ icon: "error", position: "center", title: "שגיאת מחיקה" });
      });
  };
};
export const addWorker = (worker) => {
  return (dispatch) => {
    axios
      .post("https://localhost:7281/api/Workers", worker)
      .then((res) => {
        dispatch({ type: "ADD_WORKER", payload: res.data });
        Swal.fire({
          icon: "success",
          position: "center",
          title: "העובד נוסף בהצלחה",
        });
      })
      .catch((err) => {
        Swal.fire({ icon: "error", position: "center", title: "שגיאת הוספה" });
      });
  };
};

export const editWorker = (worker) => {
  return (dispatch) =>
    axios
      .put(`https://localhost:7281/api/Workers/${worker.id}`, worker)
      .then((res) => {
        dispatch({ type: "EDIT_WORKER", payload: res.data });
        Swal.fire({
          icon: "success",
          position: "center",
          title: "העובד עודכן בהצלחה",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          position: "center",
          title: "שגיאת עדכון",
        });
      });
};

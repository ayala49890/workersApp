import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getWorkers, deleteWorker } from "../service/serviceWorker";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";

export default function AllWorkers() {
  const dispatch = useDispatch();
  const workers = useSelector((state) => state.workers.workers);
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  dispatch({ type: "SET_SELECTED_WORKER", payload: null });

  useEffect(() => {
    dispatch(getWorkers());
  }, []);

  useEffect(() => {
    if (workers.length > 0) {
      fetchColumns();
    }
  }, [workers]);

  const fetchColumns = () => {
    try {
      const columnsFromWorkers = getColumnsFromWorkers(workers);
      setColumns(columnsFromWorkers);
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  };

  const getColumnsFromWorkers = (workers) => {
    if (!workers || workers.length === 0) {
      return [];
    }

    const workerFields = Object.keys(workers[0]);

    const columns = workerFields
      .map((field) => {
        if (field === "id" || field === "מזהה"||field === "roles" || field === "תפקידים") {
          return null;
        }

        return {
          field: field,
          headerName: translateField(field),
          headerAlign: "center",
          align: "center",
          width: 200,
        };
      })
      .filter((column) => column !== null);

    columns.push({
      field: "actions",
      headerName: "",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "5px" }}>
          <Tooltip title="לחץ לעריכה" placement="top">
            <EditIcon
              onClick={() => handleEditWorker(params.row)}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="לחץ למחיקה" placement="top">
            <DeleteIcon
              onClick={() => handleDeleteWorker(params.row)}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        </div>
      ),
    });

    return columns;
  };

  const translateField = (field) => {
    switch (field) {
      case "firstName":
        return "שם פרטי";
      case "lastName":
        return "שם משפחה";
      case "identity":
        return "תעודת זהות";
      case "startWorkingDate":
        return field === "startWorkingDate" ? "תאריך תחילת העבודה" : field;
      case "id":
        return "מזהה";
        case "roles":
          return "תפקידים";
      default:
        return field;
    }
  };

  const handleEditWorker = (worker) => {
    if (worker) {
      console.log("worker:", JSON.stringify(worker));
      dispatch({ type: "SET_SELECTED_WORKER", payload: worker });
      navigate("/editWorker");
    }
  };

  const handleDeleteWorker = (worker) => {
    if (Array.isArray(workers)) {
      console.log("Delete worker:", worker);
      dispatch(deleteWorker(worker));
      const updatedWorkers = workers.filter((w) => w.id !== worker.id);
      setFilteredWorkers(updatedWorkers);
    }
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredWorkers.map((worker) => ({
        ...worker,
        startWorkingDate: format(
          new Date(worker.startWorkingDate),
          "yyyy-MM-dd"
        ),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Workers");
    XLSX.writeFile(workbook, "workers.xlsx");
  };

  const handlePrintTable = () => {
    const printContents = `
      <table>
        <thead>
          <tr>
            ${columns.map((col) => `<th>${col.headerName}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${filteredWorkers
            .map(
              (row) => `
            <tr>
              ${columns.map((col) => `<td>${row[col.field]}</td>`).join("")}
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    const popupWin = window.open(
      "",
      "_blank",
      "top=0,left=0,height=100%,width=auto"
    );
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body onload="window.print(); window.close()">
          ${printContents}
        </body>
      </html>
    `);
    popupWin.document.close();

    navigate("/workers");
  };

  const handleRowSelect = (selection) => {
    const selected = selection.map((id) =>
      workers.find((worker) => worker.id === id)
    );
    setSelectedWorkers(selected);
  };

  useEffect(() => {
    if (Array.isArray(workers)) {
      const filtered = workers.filter((worker) =>
        Object.values(worker).some((value) =>
          String(value).toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      setFilteredWorkers(filtered);
    }
  }, [searchValue, workers]);

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Tooltip title="הוספת עובד חדש" placement="top">
          <Button
            style={{ marginRight: 100 }}
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/addWorker`);
            }}
            startIcon={<AddIcon />}
          >
            הוספת עובד
          </Button>
        </Tooltip>
        <Tooltip title="הקש מילת מפתח לחיפוש" placement="top">
          <TextField
            style={{ marginRight: "350px" }}
            label="חיפוש"
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Tooltip>
        <Tooltip title="הדפסת הרשימה" placement="top">
          <Button
            style={{ marginRight: "300px" }}
            variant="contained"
            color="primary"
            onClick={handlePrintTable}
            startIcon={<PrintIcon />}
          >
            הדפסה
          </Button>
        </Tooltip>
        <Tooltip title="הורדה כקובץ אקסל" placement="top">
          <Button
            style={{ marginLeft: 100 }}
            variant="contained"
            color="primary"
            onClick={handleExportToExcel}
            startIcon={<GetAppIcon />}
          >
            הורדה
          </Button>
        </Tooltip>
        {/* הכפתור מחיקה מרובה יוצג רק אם נבחר יותר מעובד אחד
        {selectedWorkers.length > 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteWorker}
            startIcon={<DeleteIcon />}
          >
            מחיקה מרובה
          </Button>
        )}*/}
      </div>
      <div
        style={{
          marginTop: "3%",
          height: 400,
          width: "100%",
          marginBottom: 20,
        }}
      >
        <DataGrid
          rows={filteredWorkers}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionModelChange={(selection) => handleRowSelect(selection)}
        />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#1976d2",
          color: "white",
          padding: "10px 20px",
          borderRadius: "14px",
          textAlign: "center",
          cursor: "default",
          zIndex: 1000,
          opacity: "90%",
        }}
      >
        {filteredWorkers.length} שורות מוצגות
      </div>
    </>
  );
}








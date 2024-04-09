import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRoles, deleteRole } from "../service/serviceRole";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

export default function AllRoles() {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.roles);
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();
  dispatch({ type: "SET_SELECTED_WORKER", payload: null });

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  useEffect(() => {
    if (roles.length > 0) {
      fetchColumns();
    }
  }, [roles]);

  const fetchColumns = () => {
    try {
      const columnsFromRoles = getColumnsFromRoles(roles);
      setColumns(columnsFromRoles);
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  };

  const getColumnsFromRoles = (roles) => {
    if (!roles || roles.length === 0) {
      return [];
    }

    const roleFields = Object.keys(roles[0]);

    const columns = roleFields
      .map((field) => {
        if (field === "id" || field === "מזהה") {
          return null;
        }

        return {
          field: field,
          headerName: translateField(field),
          width: 130,
          headerAlign: "center",
          align: "center",
          headerClassName: "header-class",
          footerClassName: "footer-class",
          headerComponent: () => (
            <div className="header-component">{translateField(field)}</div>
          ),
          footerComponent: () => (
            <div className="footer-component">{translateField(field)}</div>
          ),
        };
      })
      .filter((column) => column !== null);

    columns.push({
      field: "actions",
      headerName: "",
      width: 130,
      sortable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "header-class",
      footerClassName: "footer-class",
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
          <Tooltip title="לחץ למחיקה" placement="top">
            <DeleteIcon
              onClick={() => handleDeleteRole(params.row.id)}
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
      case "name":
        return "שם התפקיד";
      case "isAdministrative":
        return "ניהולי?";
      case "id":
        return "מזהה";
      default:
        return field;
    }
  };

  const handleDeleteRole = (roleId) => {
    console.log("Delete role:", roleId);
    dispatch(deleteRole(roleId));
    navigate(`/roles`);
  };

  return (
    <>
      <Header />
      <div className="btnCon">
        <Tooltip title="הוספת תפקיד חדש" placement="top">
          <Button
            style={{ marginBottom: "3%", marginLeft: "80%" }}
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/addRole`);
            }}
            startIcon={<AddIcon />}
          >
            הוספת תפקיד
          </Button>
        </Tooltip>
      </div>
      <div style={{ height: 400, width: "100%", marginBottom: 20 }}>
        <DataGrid
          rows={roles}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </>
  );
}

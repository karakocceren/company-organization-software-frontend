import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  DeleteOutlined as DeleteIcon,
  Save as SaveIcon,
  Close as CancelIcon,
} from "@mui/icons-material";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { trTR } from "@mui/x-data-grid/locales";
import { randomId } from "@mui/x-data-grid-generator";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";
import ErrorMessage from "./ErrorMessage";
import axios from "../api/axios";

const ADMIN_ADD_USER_URL = "/api/v1/admin/add-user";
const DELETE_USER_URL = "/api/v1/auth/users/delete";

const EditableTable = ({
  initialRows,
  newRow,
  columns,
  loading,
  setLoading,
}) => {
  const { auth } = useAuth();
  const { i18n, t } = useTranslation();
  const [rows, setRows] = useState(initialRows);
  const rowsRef = useRef(rows);
  const [rowModesModel, setRowModesModel] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const userRole = auth?.role;

  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleAdminAddUser = async (updatedRow) => {
    console.log(updatedRow);
    try {
      const response = await axios.post(
        ADMIN_ADD_USER_URL,
        JSON.stringify({
          name: updatedRow.name,
          surname: updatedRow.surname,
          email: updatedRow.emailAddress,
          role: updatedRow.userRole,
          companyId: updatedRow.companyId,
          departmentId: updatedRow.departmentId,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        }
      );

      console.log(JSON.stringify(response?.data));
      const message = response?.data?.message;

      setSnackbarMessage(message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, data: response?.data };
    } catch (error) {
      console.log(error.response?.data?.message);
      const message = error?.response?.data?.message || t("error");
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return { success: false, data: null };
    }
  };

  const handleManagerAddUser = async (updatedRow) => {
    try {
      const response = await axios.post(
        "/api/v1/manager/companies/1/departments/1/employees",
        JSON.stringify({
          email: updatedRow.emailAddress,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        }
      );

      console.log(JSON.stringify(response?.data));
      const message = response?.data?.message;

      setSnackbarMessage(message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      console.log(error.response?.data?.message);
      const message = error?.response?.data?.message || t("error");
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return { success: false };
    }
  };

  const handleDeleteRow = async (id) => {
    const rowToDelete = rows.find((row) => row.id === id);
    console.log(rowToDelete?.emailAddress);
    try {
      const response = await axios.post(
        DELETE_USER_URL,
        JSON.stringify({
          email: rowToDelete?.emailAddress,
        }),
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        }
      );

      console.log(response?.data?.message);

      // Show success message
      setSnackbarMessage(t("Row deleted successfully"));
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Remove the row from the state
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.log(error.response?.data?.message);
      const message = error?.response?.data?.message || t("Error deleting row");
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  function EditToolbar(props) {
    const { rows, setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      const newRowData = {
        id,
        ...newRow,
        isNew: true,
      };

      setRows((oldRows) => [...oldRows, newRowData]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          {t("add_user")}
        </Button>
      </GridToolbarContainer>
    );
  }

  const processRowUpdate = async (newRow) => {
    if (userRole === "ADMIN") {
      if (newRow.isNew) {
        // Only add row if it is marked as new
        const { success, data } = await handleAdminAddUser(newRow);

        if (success && data) {
          const updatedRow = {
            ...newRow,
            isNew: false, // Mark the row as not new
            companyName: data.companyName || newRow.companyName, // Use the data from the response
            departmentName: data.departmentName || newRow.departmentName, // Use the data from the response
          };
          // Mark row as no longer new after successful save
          setRows((prevRows) =>
            prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
          );
          console.log(updatedRow);
          setRowModesModel((prevModel) => ({
            ...prevModel,
            [newRow.id]: { mode: GridRowModes.View },
          }));
        } else {
          // If the row addition fails, stay in edit mode
          setRowModesModel((prevModel) => ({
            ...prevModel,
            [newRow.id]: { mode: GridRowModes.Edit },
          }));
        }
      } else {
        // Handle regular row edit (not new row)
        console.log(newRow);
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === newRow.id ? newRow : row))
        );
        setRowModesModel((prevModel) => ({
          ...prevModel,
          [newRow.id]: { mode: GridRowModes.View },
        }));
      }
    }

    if (userRole === "MANAGER") {
      console.log(newRow?.emailAddress);
      setRowModesModel({
        ...rowModesModel,
        [newRow.id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    }

    return newRow;
  };

  const handleRowEditStop = (params, event) => {
    // Prevent row from switching back to edit mode due to focus loss or another unintended event
    if (params.reason === "rowFocusOut") {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    const rowToSave = rows.find((row) => row.id === id);
    console.log(rowToSave);

    if (rowToSave) {
      setRowModesModel((prevModel) => ({
        ...prevModel,
        [id]: { mode: GridRowModes.View },
      }));
    }
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log(error.message);
  }, []);

  const columnsWithActions = [
    ...columns.map((column) => ({
      ...column,
      flex: column.flex ?? 1,
    })),
    {
      field: "actions",
      type: "actions",
      headerName: t("actions"),
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const row = rows.find((row) => row.id === id);

        if (userRole === "ADMIN") {
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteRow(id)}
              color="inherit"
            />,
          ];
        }

        if (userRole === "MANAGER" && row?.isNew) {
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteRow(id)}
              color="inherit"
            />,
          ];
        }
        return [];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows}
        columns={columnsWithActions}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={(updatedRow, originalRow) =>
          processRowUpdate(updatedRow)
        }
        onProcessRowUpdateError={handleProcessRowUpdateError}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, rows },
        }}
        loading={loading}
        localeText={
          i18n.language === "tr"
            ? trTR.components.MuiDataGrid.defaultProps.localeText
            : undefined
        }
      />
      <ErrorMessage
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </Box>
  );
};

export default EditableTable;

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
import axios from "../api/axios";

const ADMIN_ADD_USER_URL = "/api/v1/admin/add-user";

const EditableTable = ({ initialRows, newRow, columns }) => {
  const [rows, setRows] = useState(initialRows);
  const rowsRef = useRef(rows);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    rowsRef.current = rows; // Update the ref whenever rows change
  }, [rows]);

  const handleAddRow = async (updatedRow) => {
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
      //setSuccessMessage("Password set successfully! Redirecting to login...");

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(error.response?.data?.message);
      {
        /*setErrorMessage(
        error.response?.data?.message ||
          "Failed to set password. Please try again."
      );*/
      }
    } finally {
      //actions.setSubmitting(false);
    }
  };

  function EditToolbar(props) {
    const { rows, setRows, setRowModesModel } = props;

    const handleClick = () => {
      const maxId =
        rowsRef.current.length > 0
          ? Math.max(...rowsRef.current.map((row) => row.id))
          : 0;
      const id = maxId + 1;
      const newRowData = {
        id: id,
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
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };

    const updatedRows = rowsRef.current.map((row) =>
      row.id === newRow.id ? updatedRow : row
    );

    // Simulate async operation if needed
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Update the state and the ref with the new rows
    setRows(updatedRows);
    rowsRef.current = updatedRows;

    console.log("Processed Row:", updatedRow);
    console.log("Updated Rows:", rowsRef.current);
    return updatedRow;
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    // Use rowsRef to get the most recent row data
    const rowToSave = rowsRef.current.find((row) => row.id === id);
    console.log("row to save", rowToSave);

    if (rowToSave) {
      const updatedRow = processRowUpdate(rowToSave);

      setRowModesModel((prevModel) => ({
        ...prevModel,
        [id]: { mode: GridRowModes.View },
      }));

      // Send the POST request with the updated row data
      await handleAddRow(updatedRow);
    }
  };

  {
    /*const handleSaveClick = (id) => async () => {
    const rowToSave = rows.find((row) => row.id === id);
    console.log("id:", id);
    console.log("rows:", rows);
    console.log("Row to save:", rowToSave);

    if (rowToSave) {
      const updatedRow = processRowUpdate(rowToSave);
      console.log("Updated row after processing:", updatedRow);

      if (updatedRow) {
        setRowModesModel((prevModel) => ({
          ...prevModel,
          [id]: { mode: GridRowModes.View },
        }));

        //await handleAddRow(updatedRow);
        console.log("Saved row to backend:", updatedRow);
      }
    }
  };*/
  }

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

  const columnsWithActions = [
    ...columns.map((column) => ({
      ...column,
      flex: column.flex ?? 1,
    })),
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

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
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
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
        rows={rows}
        columns={columnsWithActions}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, rows },
        }}
      />
    </Box>
  );
};

export default EditableTable;

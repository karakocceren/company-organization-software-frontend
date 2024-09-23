import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { trTR } from "@mui/x-data-grid/locales";
import { useTranslation } from "react-i18next";
import ErrorMessage from "./ErrorMessage";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const Table = ({
  initialRows,
  columns,
  selectedTable,
  totalRowCount,
  paginationModel,
  onPaginationModelChange,
  loading,
  setLoading,
}) => {
  const { i18n, t } = useTranslation();
  const { auth } = useAuth();
  const [rows, setRows] = React.useState(initialRows);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const companyId = auth?.companyId;
  const departmentId = auth?.departmentId;

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleAddUser = async (row) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/v1/manager/companies/${companyId}/departments/${departmentId}/employees`,
        JSON.stringify({
          email: row?.emailAddress,
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

      const message = response?.data?.message;

      setRows((prevRows) => prevRows.filter((r) => r.id !== row.id));

      setSnackbarMessage(message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(error.response?.data?.message);
      const message = error?.response?.data?.message || t("error");
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

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
        const row = rows.find((row) => row.id === id);
        const email = row?.emailAddress;
        return [
          <Button variant="text" onClick={() => handleAddUser(row)}>
            Add
          </Button>,
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
        columns={selectedTable === "Add User" ? columnsWithActions : columns}
        pagination
        paginationMode="server"
        rowCount={totalRowCount}
        initialState={{
          pagination: {
            paginationModel: paginationModel,
          },
        }}
        onPaginationModelChange={(newModel) =>
          onPaginationModelChange(newModel)
        }
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
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

export default Table;

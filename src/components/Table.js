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
import ErrorMessage from "./ErrorMessage";
import axios from "../api/axios";

const Table = ({ initialRows, columns, loading }) => {
  const { i18n, t } = useTranslation();
  const [rows, setRows] = React.useState(initialRows);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

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
        columns={columns}
        loading={loading}
        localeText={
          i18n.language === "tr"
            ? trTR.components.MuiDataGrid.defaultProps.localeText
            : undefined
        }
      />
    </Box>
  );
};

export default Table;

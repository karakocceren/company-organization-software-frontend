import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { randomId } from "@mui/x-data-grid-generator";
import { Box, Typography, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import Table from "../../components/Table";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Profile";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const ManagerDashboard = ({ showProfile = false }) => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const { tableName } = useParams();
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(null);
  const [users, setUsers] = useState([]);
  const [addUsers, setAddUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const companyId = auth?.companyId;
  const departmentId = auth?.departmentId;

  useEffect(() => {
    if (selectedTable === "Add User") {
      fetchAddUsersData(paginationModel.page, paginationModel.pageSize);
    }
    if (selectedTable === "Department Users") {
      fetchDepartmentUsersData(paginationModel.page, paginationModel.pageSize);
    }
  }, [paginationModel]);

  useEffect(() => {
    setPaginationModel({
      page: 0,
      pageSize: 10, // Reset to the first page
    });

    if (selectedTable) {
      switch (selectedTable) {
        case "Add User":
          fetchAddUsersData(paginationModel.page, paginationModel.pageSize);
          break;
        case "Department Users":
          fetchDepartmentUsersData(
            paginationModel.page,
            paginationModel.pageSize
          );
          break;
        default:
          break;
      }
    }
  }, [selectedTable]);

  const fetchDepartmentUsersData = async (pageNumber, pageSize) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/v1/manager/companies/${companyId}/departments/${departmentId}/employees`,
        {
          params: {
            pageNumber: pageNumber,
            pageSize: pageSize,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        }
      );
      const usersData = response.data?.employees || [];

      const initialUserRows = usersData.map((user) => ({
        id: randomId(),
        emailAddress: user?.email || "",
        name: user?.name || "",
        surname: user?.surname || "",
        userRole: user?.role || "",
      }));

      setTotalRowCount(response.data?.totalElements);
      setUsers(initialUserRows);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  const fetchAddUsersData = async (pageNumber, pageSize) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/v1/manager/companies/${companyId}/departments/${departmentId}/addable-users`,
        {
          params: {
            pageNumber: pageNumber,
            pageSize: pageSize,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        }
      );
      const addUsersData = response.data?.employees || [];

      const initialAddUserRows = addUsersData.map((user) => ({
        id: randomId(),
        emailAddress: user?.email || "",
        name: user?.name || "",
        surname: user?.surname || "",
        userRole: user?.role || "",
      }));

      setTotalRowCount(response.data?.totalElements);
      setAddUsers(initialAddUserRows);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel((prevModel) => ({
      ...prevModel,
      ...newModel,
    }));
  };

  useEffect(() => {
    if (tableName) {
      const formattedTableName = tableName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setSelectedTable(formattedTableName);
    } else {
      setSelectedTable(null);
      navigate("/manager/profile");
    }
  }, [tableName, navigate]);

  const tableConfig = {
    "Department Users": {
      initialRows: users,
      newRow: {
        emailAddress: "",
        name: "",
        surname: "",
        userRole: "",
      },
      columns: [
        {
          field: "emailAddress",
          headerName: t("email_address"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "name",
          headerName: t("name"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "surname",
          headerName: t("surname"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "userRole",
          headerName: t("role"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
      ],
    },
    "Add User": {
      initialRows: addUsers,
      newRow: {
        emailAddress: "",
        name: "",
        surname: "",
        userRole: "",
      },
      columns: [
        {
          field: "emailAddress",
          headerName: t("email_address"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "name",
          headerName: t("name"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "surname",
          headerName: t("surname"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "userRole",
          headerName: t("role"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
      ],
    },
  };

  const formatTableName = (name) => {
    if (!name) return "";

    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Determine if the tableName exists in the tableConfig
  const formattedTableName = formatTableName(tableName);
  const isValidTable =
    formattedTableName && tableConfig.hasOwnProperty(formattedTableName);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar role="MANAGER" setSelectedTable={setSelectedTable} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        {showProfile ? (
          <Profile />
        ) : isValidTable ? (
          <>
            {selectedTable === "Department Users" && (
              <Alert severity="info" sx={{ marginBottom: "24px" }}>
                {t("manager_users_info")}
              </Alert>
            )}
            {selectedTable === "Add User" && (
              <Alert severity="info" sx={{ marginBottom: "24px" }}>
                {t("manager_add_user_info")}
              </Alert>
            )}
            <Table
              key={selectedTable}
              initialRows={tableConfig[selectedTable]?.initialRows || []}
              columns={tableConfig[selectedTable]?.columns || []}
              selectedTable={selectedTable || ""}
              totalRowCount={totalRowCount}
              paginationModel={paginationModel}
              onPaginationModelChange={handlePaginationModelChange}
              loading={loading}
              setLoading={setLoading}
            />
          </>
        ) : (
          <Typography variant="h6">
            Invalid table selected or table not found. Please select a valid
            table.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ManagerDashboard;

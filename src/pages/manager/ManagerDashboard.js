import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { randomId } from "@mui/x-data-grid-generator";
import { Box, Typography, Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditableTable from "../../components/EditableTable";
import Table from "../../components/Table";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Profile";
import axios from "../../api/axios";

const companyId = 1;
const departmentId = 1;

const USERS_URL = `/api/v1/manager/companies/${companyId}/departments/${departmentId}/employees`;

const ManagerDashboard = ({ showProfile = false }) => {
  const { t } = useTranslation();
  const [selectedTable, setSelectedTable] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tableName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/v1/manager/companies/${companyId}/departments/${departmentId}/employees`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("auth")).token
              }`,
            },
          }
        );
        console.log(response.data?.employees);
        const usersData = response.data?.employees || [];

        const initialUserRows = usersData.map((user) => ({
          id: randomId(),
          emailAddress: user?.email || "",
          name: user?.name || "",
          surname: user?.surname || "",
          userRole: user?.role || "",
        }));

        setUsers(initialUserRows);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(users);

  useEffect(() => {
    console.log("tableName:", tableName);
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
    "My Company": {
      initialRows: [
        {
          id: randomId(),
          name: "Delta Akıllı Teknolojiler A.Ş.",
          short_Name: "Delta",
          companyType: "Yazılım Geliştirme",
          addressStreet: "Teknopark İzmir A8 Binası",
          addressTown: "Urla",
        },
      ],
      columns: [
        { field: "name", headerName: t("name"), width: 90 },
        {
          field: "short_Name",
          headerName: t("short_name"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "companyType",
          headerName: t("company_type"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "addressStreet",
          headerName: t("address_street"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "addressTown",
          headerName: t("address_town"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
      ],
    },
    "My Department": {
      initialRows: [
        {
          id: randomId(),
          name: "Genel Müdürlük",
          company: "Delta Akıllı Teknolojiler A.Ş.",
          departmentType: "Yönetsel",
          addressStreet: "Teknopark İzmir A8 Binası",
          addressTown: "Urla",
          manager: "tolgahan.oysal@deltasmart.tech",
        },
      ],
      columns: [
        { field: "name", headerName: t("name"), width: 90 },
        {
          field: "company",
          headerName: t("company"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "departmentType",
          headerName: t("department_type"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "addressStreet",
          headerName: t("address_street"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "addressTown",
          headerName: t("address_town"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "manager",
          headerName: t("manager"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
      ],
    },
    Users: {
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
          editable: true,
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

  console.log(isValidTable);

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
          selectedTable === "Users" ? (
            <>
              <Typography sx={{ marginBottom: "16px" }}>
                You can add a user to your department by their email.
              </Typography>
              <Typography sx={{ marginTop: "16px" }}>
                The users in your department:
              </Typography>
              <EditableTable
                key={selectedTable}
                initialRows={tableConfig[selectedTable]?.initialRows || []}
                newRow={tableConfig[selectedTable]?.newRow || {}}
                columns={tableConfig[selectedTable]?.columns || []}
                loading={loading}
                setLoading={setLoading}
              />
            </>
          ) : (
            <Table
              key={selectedTable}
              initialRows={tableConfig[selectedTable]?.initialRows || []}
              columns={tableConfig[selectedTable]?.columns || []}
              loading={loading}
            />
          )
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

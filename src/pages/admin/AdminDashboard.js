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

const ALL_USERS_API = "/api/v1/admin/show-all-users";
const GET_COMPANIES_URL = "/api/v1/admin/companies";
const DEPARTMENT_TYPES_URL = "/api/v1/public/department-types";
const DEPARTMENTS_URL = "/api/v1/admin/departments";
const COMPANY_TYPES_URL = "/api/v1/public/company-types";
const CITIES_URL = "/api/v1/public/cities";

const AdminDashboard = ({ showProfile = false }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const location = useLocation();
  const { tableName } = useParams();
  const navigate = useNavigate();

  const userRoles = ["ADMIN", "MANAGER", "EMPLOYEE"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          companiesResponse,
          departmentTypesResponse,
          departmentsResponse,
          usersResponse,
          companyTypesResponse,
          citiesResponse,
        ] = await Promise.all([
          axios.get(GET_COMPANIES_URL, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("auth")).token
              }`,
            },
          }),
          axios.get(DEPARTMENT_TYPES_URL, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("auth")).token
              }`,
            },
          }),
          axios.get(DEPARTMENTS_URL, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("auth")).token
              }`,
            },
          }),
          axios.get(ALL_USERS_API, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("auth")).token
              }`,
            },
          }),
          axios.get(COMPANY_TYPES_URL, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("auth")).token
              }`,
            },
          }),
          axios.get(CITIES_URL, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("auth")).token
              }`,
            },
          }),
        ]);
        const companiesData = companiesResponse.data?.content || [];
        const departmentTypesData = departmentTypesResponse.data?.content || [];
        const departmentsData = departmentsResponse.data?.content || [];
        const usersData = usersResponse.data?.content || [];
        const companyTypesData = companyTypesResponse.data?.content || [];
        const citiesData = citiesResponse.data?.content || [];

        const usersMap = new Map(usersData.map((user) => [user.id, user]));

        const initialCompanyRows = companiesData.map((company) => ({
          id: randomId(),
          backendId: company?.id || "",
          name: company?.name || "",
          short_Name: company?.shortName || "",
          companyType: company?.companyType?.name || "",
          addressStreet: company?.addressDetail || "",
          addressTown: company?.town || "",
        }));

        const initialDepartmentTypeRows = departmentTypesData.map(
          (departmentType) => ({
            id: randomId(),
            name: departmentType?.name || "",
          })
        );

        const initialDepartmentRows = departmentsData.map((department) => ({
          id: randomId(),
          backendId: department?.id || "",
          name: department?.name || "",
          company: department?.companyId || "",
          departmentType: department?.departmentType?.id || "",
          addressStreet: department?.addressDetail || "",
          addressTown: department?.town || "",
          manager: usersMap.get(department?.managerId)?.email || "",
        }));

        const initialUserRows = usersData.map((user) => ({
          id: randomId(),
          backendId: user?.id || "",
          name: user?.name || "",
          surname: user?.surname || "",
          emailAddress: user?.email || "",
          userRole: user?.roleName || "",
          isActive: user?.active || "",
          isEnabled: user?.enabled || "",
          companyId: user?.companyId || "",
          companyName: user?.companyName || "",
          departmentId: user?.departmentId || "",
          departmentName: user?.departmentName || "",
        }));

        const initialCompanyTypeRows = companyTypesData.map((companyType) => ({
          id: randomId(),
          name: companyType?.name || "",
        }));

        const initialCityRows = citiesData.map((city) => ({
          id: randomId(),
          name: city?.name || "",
        }));

        setCompanies(initialCompanyRows);
        setDepartmentTypes(initialDepartmentTypeRows);
        setDepartments(initialDepartmentRows);
        setUsers(initialUserRows);
        setCompanyTypes(initialCompanyTypeRows);
        setCities(initialCityRows);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(companies);
  console.log(departments);
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
      navigate("/admin/profile");
    }
  }, [tableName, navigate]);

  const tableConfig = {
    Users: {
      initialRows: users,
      newRow: {
        backendId: "",
        name: "",
        surname: "",
        emailAddress: "",
        userRole: "",
        isActive: true,
        isEnabled: false,
        companyId: "",
        companyName: "",
        departmentId: "",
        departmentName: "",
      },
      columns: [
        {
          field: "name",
          headerName: t("name"),
          editable: true,
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "surname",
          headerName: t("surname"),
          editable: true,
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "emailAddress",
          headerName: t("email_address"),
          editable: true,
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "userRole",
          headerName: t("role"),
          type: "singleSelect",
          valueOptions: userRoles,
          editable: true,
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "isActive",
          headerName: t("is_active"),
          type: "boolean",
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "isEnabled",
          headerName: t("is_enabled"),
          type: "boolean",
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "companyName",
          headerName: t("company_name"),
          type: "singleSelect",
          flex: 1,
          headerAlign: "center",
          align: "center",
          valueOptions: companies.map((company) => ({
            label: company.name,
            value: company.backendId,
          })),
          editable: true,
          renderCell: (params) => params.value,
          renderEditCell: (params) => {
            // Render the autocomplete dropdown in edit mode
            return (
              <Autocomplete
                options={companies}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  console.log(newValue?.name);
                  const updatedRow = {
                    ...params.row,
                    companyId: newValue?.backendId || "",
                    companyName: newValue?.name || "",
                    departmentId: "",
                    departmentName: "",
                  };
                  params.api.updateRows([{ id: updatedRow.id, ...updatedRow }]);

                  const allRows = params.api.getRowModels();
                  console.log(
                    "All Rows After Update:",
                    Array.from(allRows.values())
                  );
                }}
                value={
                  companies.find(
                    (company) => company.backendId === params.row.companyId
                  ) || null
                }
              />
            );
          },
        },
        {
          field: "departmentName",
          headerName: t("department_name"),
          type: "singleSelect",
          flex: 1,
          headerAlign: "center",
          align: "center",
          valueOptions: departments.map((department) => ({
            label: department.name,
            value: department.backendId,
          })),
          editable: true,
          renderCell: (params) => params.value,
          renderEditCell: (params) => {
            const selectedCompany = params.row.companyId;

            //burayı sonra aç
            const filteredDepartments = departments.filter(
              (department) => department.company === selectedCompany
            );

            const isDepartmentFieldDisabled = !selectedCompany;

            return (
              <Autocomplete
                options={filteredDepartments} //burayı sonra filteredDepartments yap
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                disabled={isDepartmentFieldDisabled}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  const updatedRow = {
                    ...params.row,
                    departmentId: newValue?.backendId || "",
                    departmentName: newValue?.name || "",
                  };
                  console.log(updatedRow);
                  params.api.updateRows([{ id: updatedRow.id, ...updatedRow }]);
                }}
                value={
                  departments.find(
                    (department) =>
                      department.backendId === params.row.departmentId
                  ) || null
                }
              />
            );
          },
        },
      ],
    },
    "Department Types": {
      initialRows: departmentTypes,
      newRow: { name: "" },
      columns: [
        {
          field: "name",
          headerName: t("name"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
      ],
    },
    "Company Types": {
      initialRows: companyTypes,
      newRow: { name: "" },
      columns: [
        {
          field: "name",
          headerName: t("name"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
      ],
    },
    Cities: {
      initialRows: cities,
      newRow: { name: "" },
      columns: [
        {
          field: "name",
          headerName: t("name"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
      ],
    },
    Regions: {
      initialRows: [{ id: randomId(), name: "İzmir Güney" }],
      newRow: { name: "" },
      columns: [
        {
          field: "name",
          headerName: t("name"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
      ],
    },
    Towns: {
      initialRows: [{ id: randomId(), name: "Urla", region: 1, city: 1 }],
      newRow: { name: "", region: "", city: "" },
      columns: [
        { field: "name", headerName: t("name"), width: 90 },
        {
          field: "region",
          headerName: t("region"),
          type: "number",
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "city",
          headerName: t("city"),
          type: "number",
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
      ],
    },
    Companies: {
      initialRows: companies,
      newRow: {
        backendId: null,
        name: "",
        short_Name: "",
        companyType: "",
        addressStreet: "",
        addressTown: "",
      },
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
    Departments: {
      initialRows: departments,
      newRow: {
        name: "",
        company: "",
        departmentType: "",
        addressStreet: "",
        addressTown: "",
        manager: "",
      },
      columns: [
        { field: "name", headerName: t("name"), width: 90 },
        {
          field: "company",
          headerName: t("company"),
          type: "number",
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "departmentType",
          headerName: t("department_type"),
          type: "number",
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "addressStreet",
          headerName: t("address_street"),
          width: 90,
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "addressTown",
          headerName: t("address_town"),
          type: "number",
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "manager",
          headerName: t("manager"),
          type: "number",
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
      ],
    },
    "Department Hierarchies": {
      initialRows: [
        { id: randomId(), childDepartment: 2, parentDepartment: 1 },
      ],
      newRow: { childDepartment: "", parentDepartment: "" },
      columns: [
        {
          field: "childDepartment",
          headerName: t("child_department"),
          type: "number",
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "parentDepartment",
          headerName: t("parent_department"),
          type: "number",
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
      <Sidebar role="ADMIN" setSelectedTable={setSelectedTable} />
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
            <EditableTable
              key={selectedTable}
              initialRows={tableConfig[selectedTable]?.initialRows || []}
              newRow={tableConfig[selectedTable]?.newRow || {}}
              columns={tableConfig[selectedTable]?.columns || []}
              loading={loading}
              setLoading={setLoading}
            />
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

export default AdminDashboard;

import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { randomId } from "@mui/x-data-grid-generator";
import { Box, Typography, Autocomplete, TextField, Alert } from "@mui/material";
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
  const { tableName } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const userRoles = ["ADMIN", "MANAGER", "EMPLOYEE"];

  useEffect(() => {
    if (selectedTable === "Users") {
      fetchUsersData(paginationModel.page, paginationModel.pageSize);
    }
  }, [paginationModel]);

  useEffect(() => {
    if (selectedTable) {
      setPaginationModel({
        page: 0,
        pageSize: 10, // Reset to the first page
      });

      switch (selectedTable) {
        case "Users":
          fetchUsersData(paginationModel.page, paginationModel.pageSize);
          fetchCompaniesData();
          fetchDepartmentsData();
          break;
        case "Companies":
          fetchCompaniesData(paginationModel.page, paginationModel.pageSize);
          break;
        case "Departments":
          fetchDepartmentsData(paginationModel.page, paginationModel.pageSize);
          break;
        case "Department Types":
          fetchDepartmentTypesData(
            paginationModel.page,
            paginationModel.pageSize
          );
          break;
        case "Company Types":
          fetchCompanyTypesData(paginationModel.page, paginationModel.pageSize);
          break;
        case "Cities":
          fetchCitiesData(paginationModel.page, paginationModel.pageSize);
          break;
        case "Regions":
          setTotalRowCount(1);
          break;
        case "Towns":
          setTotalRowCount(1);
          break;
        case "Department Hierarchies":
          setTotalRowCount(1);
          break;
        default:
          break;
      }
    }
  }, [selectedTable]);

  const fetchCitiesData = async (pageNumber, pageSize) => {
    try {
      setLoading(true);
      const citiesResponse = await axios.get(CITIES_URL, {
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
      });
      const citiesData = citiesResponse.data?.content || [];

      const initialCityRows = citiesData.map((city) => ({
        id: randomId(),
        name: city?.name || "",
      }));
      setTotalRowCount(citiesResponse.data?.totalElements);
      setCities(initialCityRows);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  const fetchCompanyTypesData = async (pageNumber, pageSize) => {
    try {
      setLoading(true);
      const companyTypesResponse = await axios.get(COMPANY_TYPES_URL, {
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
      });
      const companyTypesData = companyTypesResponse.data?.content || [];

      const initialCompanyTypeRows = companyTypesData.map((companyType) => ({
        id: randomId(),
        name: companyType?.name || "",
      }));
      setTotalRowCount(1);
      setCompanyTypes(initialCompanyTypeRows);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  const fetchDepartmentsData = async (pageNumber, pageSize) => {
    try {
      setLoading(true);
      const departmentsResponse = await axios.get(DEPARTMENTS_URL, {
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
      });
      const departmentsData = departmentsResponse.data?.content || [];

      const initialDepartmentRows = departmentsData.map((department) => ({
        id: randomId(),
        backendId: department?.id || "",
        name: department?.name || "",
        company: department?.companyId || "",
        departmentType: department?.departmentType?.id || "",
        addressStreet: department?.addressDetail || "",
        addressTown: department?.town || "",
        manager: department?.managerEmail || "",
      }));
      setTotalRowCount(departmentsResponse.data?.totalElements);
      setDepartments(initialDepartmentRows);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  const fetchDepartmentTypesData = async (pageNumber, pageSize) => {
    try {
      setLoading(true);
      const departmentTypesResponse = await axios.get(DEPARTMENT_TYPES_URL, {
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
      });
      const departmentTypesData = departmentTypesResponse.data?.content || [];

      const initialDepartmentTypeRows = departmentTypesData.map(
        (departmentType) => ({
          id: randomId(),
          name: departmentType?.name || "",
        })
      );
      setTotalRowCount(2);
      setDepartmentTypes(initialDepartmentTypeRows);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  const fetchCompaniesData = async (pageNumber, pageSize) => {
    try {
      setLoading(true);
      const companiesResponse = await axios.get(GET_COMPANIES_URL, {
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
      });
      const companiesData = companiesResponse.data?.content || [];

      const initialCompanyRows = companiesData.map((company) => ({
        id: randomId(),
        backendId: company?.id || "",
        name: company?.name || "",
        short_Name: company?.shortName || "",
        companyType: company?.companyType?.name || "",
        addressStreet: company?.addressDetail || "",
        addressTown: company?.town || "",
      }));
      setTotalRowCount(companiesResponse.data?.totalElements);
      setCompanies(initialCompanyRows);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  const fetchUsersData = async (pageNumber, pageSize) => {
    try {
      setLoading(true);
      const usersResponse = await axios.get(ALL_USERS_API, {
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
      });
      const usersData = usersResponse.data?.content || [];

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
      setTotalRowCount(usersResponse.data?.totalElements);
      setUsers(initialUserRows);
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
          minWidth: 120,
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "surname",
          headerName: t("surname"),
          editable: true,
          minWidth: 120,
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "emailAddress",
          headerName: t("email_address"),
          editable: true,
          minWidth: 220,
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
          minWidth: 200,
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
            return (
              <Autocomplete
                sx={{ width: "200px" }}
                options={companies}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                onChange={(event, newValue) => {
                  const updatedRow = {
                    ...params.row,
                    companyId: newValue?.backendId || "",
                    companyName: newValue?.name || "",
                    departmentId: "",
                    departmentName: "",
                  };
                  params.api.updateRows([{ id: updatedRow.id, ...updatedRow }]);

                  const allRows = params.api.getRowModels();
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
          minWidth: 200,
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

            const filteredDepartments = departments.filter(
              (department) => department.company === selectedCompany
            );

            const isDepartmentFieldDisabled = !selectedCompany;

            return (
              <Autocomplete
                sx={{ width: "200px" }}
                options={filteredDepartments}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                disabled={isDepartmentFieldDisabled}
                onChange={(event, newValue) => {
                  const updatedRow = {
                    ...params.row,
                    departmentId: newValue?.backendId || "",
                    departmentName: newValue?.name || "",
                  };
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
      initialRows: [
        { id: randomId(), name: "Urla", region: "İzmir Güney", city: "İzmir" },
      ],
      newRow: { name: "", region: "", city: "" },
      columns: [
        { field: "name", headerName: t("name"), width: 90 },
        {
          field: "region",
          headerName: t("region"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "city",
          headerName: t("city"),
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
        {
          field: "name",
          headerName: t("name"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
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
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
      ],
    },
    "Department Hierarchies": {
      initialRows: [
        {
          id: randomId(),
          childDepartment: "Yazılım Geliştirme",
          parentDepartment: "Genel Müdürlük",
        },
      ],
      newRow: { childDepartment: "", parentDepartment: "" },
      columns: [
        {
          field: "childDepartment",
          headerName: t("child_department"),
          flex: 1,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "parentDepartment",
          headerName: t("parent_department"),
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
            <>
              <Alert severity="info" sx={{ marginBottom: "24px" }}>
                {t("admin_users_info")}
              </Alert>
              <EditableTable
                key={selectedTable}
                initialRows={tableConfig[selectedTable]?.initialRows || []}
                newRow={tableConfig[selectedTable]?.newRow || {}}
                columns={tableConfig[selectedTable]?.columns || []}
                totalRowCount={totalRowCount}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                loading={loading}
                setLoading={setLoading}
              />
            </>
          ) : (
            <Table
              key={selectedTable}
              initialRows={tableConfig[selectedTable]?.initialRows || []}
              columns={tableConfig[selectedTable]?.columns || []}
              totalRowCount={totalRowCount}
              paginationModel={paginationModel}
              onPaginationModelChange={handlePaginationModelChange}
              loading={loading}
              setLoading={setLoading}
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

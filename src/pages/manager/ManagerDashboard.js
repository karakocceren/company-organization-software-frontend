import React from "react";
import Sidebar from "../../components/Sidebar";

const companyType = [{ id: 1, name: "Yazılım Geliştirme" }];

const city = [{ id: 1, name: "İzmir" }];

const region = [{ id: 1, name: "İzmir Güney" }];

const town = [{ id: 1, name: "Urla", regionId: 1, cityId: 1 }];

const company = [
  {
    id: 1,
    name: "Delta Akıllı Teknolojiler A.Ş.",
    short_Name: "Delta",
    companyTypeId: 1,
    addressStreet: "Teknopark İzmir A8 Binası",
    addressTown: 1,
  },
];

const DepartmentType = [
  { id: 1, name: "Yönetsel" },
  { id: 2, name: "Operasyonel" },
];

const department = [
  {
    id: 1,
    name: "Genel Müdürlük",
    companyId: 1,
    departmentTypeId: 1,
    addressStreet: "Teknopark İzmir A8 Binası",
    addressTown: 1,
    managerId: 2,
  },
  {
    id: 2,
    name: "Yazılım Geliştirme",
    companyId: 1,
    departmentTypeId: 2,
    addressStreet: "Teknopark İzmir A8 Binası",
    addressTown: 1,
    managerId: 2,
  },
];

const departmentHierarchy = [
  { id: 1, childDepartmentId: 2, parentDepartmentId: 1 },
];

const userRole = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Manager" },
  { id: 3, name: "User" },
];

const initialUserRows = [
  {
    id: 1,
    userRole: 1,
    departmentId: 1,
    name: "Manager",
    surname: "Dashboard",
    emailAddress: "admin@delta.smart",
    isActive: 1,
  },
];

const newCompanyRow = [
  {
    name: "",
    short_Name: "",
    companyTypeId: "",
    addressStreet: "",
    addressTown: "",
  },
];

const newUserRow = [
  {
    userRole: "",
    departmentId: "",
    name: "",
    surname: "",
    emailAddress: "",
    isActive: "",
  },
];

const companyColumns = [
  { field: "id", headerName: "ID", type: "number", width: 90 },
  { field: "name", headerName: "Name", width: 90, editable: true },
  { field: "short_Name" },
  { field: "companyTypeId" },
  { field: "addressStreet" },
  { field: "addressTown" },
];

const userColumns = [
  { field: "id", headerName: "ID", type: "number", width: 90 },
  {
    field: "userRole",
    headerName: "User_Role_ID",
    type: "number",
    editable: true,
  },
  {
    field: "departmentId",
    headerName: "Department_ID",
    type: "number",
    editable: true,
  },
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
  {
    field: "surname",
    headerName: "Surname",
    editable: true,
  },
  {
    field: "emailAddress",
    headerName: "Email_Address",
    editable: true,
  },
  {
    field: "isActive",
    headerName: "Is_Active",
    type: "number",
    editable: true,
  },
];

const sidebarContent = ["Companies"];

const ManagerDashboard = () => {
  const tableConfig = {
    Users: {
      initialRows: [
        {
          id: 1,
          userRole: 1,
          departmentId: 1,
          companyId: 1,
          name: "System",
          surname: "Administrator",
          emailAddress: "admin@delta.smart",
          isActive: 1,
        },
        {
          id: 2,
          userRole: 2,
          departmentId: 1,
          companyId: 1,
          name: "Tolgahan",
          surname: "Oysal",
          emailAddress: "tolgahan.oysal@deltasmart.tech",
          isActive: 0,
        },
      ],
      newRow: {
        userRole: "",
        departmentId: "",
        companyId: "",
        name: "",
        surname: "",
        emailAddress: "",
        isActive: "",
      },
      columns: [
        { field: "id", headerName: "ID", type: "number", width: 90 },
        {
          field: "userRole",
          headerName: "User_Role_ID",
          type: "number",
          editable: true,
        },
        {
          field: "departmentId",
          headerName: "Department_ID",
          type: "number",
          editable: true,
        },
        {
          field: "companyId",
          headerName: "Company_ID",
          type: "number",
          editable: true,
        },
        {
          field: "name",
          headerName: "Name",
          editable: true,
        },
        {
          field: "surname",
          headerName: "Surname",
          editable: true,
        },
        {
          field: "emailAddress",
          headerName: "Email_Address",
          editable: true,
        },
        {
          field: "isActive",
          headerName: "Is_Active",
          type: "number",
          editable: true,
        },
      ],
    },
    "Department Types": {
      initialRows: [
        { id: 1, name: "Yönetsel" },
        { id: 2, name: "Operasyonel" },
      ],
      newRow: { name: "" },
      columns: [
        { field: "id", headerName: "ID", type: "number", width: 90 },
        { field: "name", headerName: "Name", width: 90, editable: true },
      ],
    },
  };

  return <Sidebar role="MANAGER" tableConfig={tableConfig} />;
};

export default ManagerDashboard;

import * as React from "react";
import Sidebar from "../../components/Sidebar";

const initialCompanyTypeRows = [{ id: 1, name: "Yazılım Geliştirme" }];

const initialCityRows = [{ id: 1, name: "İzmir" }];

const initialRegionRows = [{ id: 1, name: "İzmir Güney" }];

const initialTownRows = [{ id: 1, name: "Urla", regionId: 1, cityId: 1 }];

const initialCompanyRows = [
  {
    id: 1,
    name: "Delta Akıllı Teknolojiler A.Ş.",
    short_Name: "Delta",
    companyTypeId: 1,
    addressStreet: "Teknopark İzmir A8 Binası",
    addressTown: 1,
  },
];

const initialDepartmentTypeRows = [
  { id: 1, name: "Yönetsel" },
  { id: 2, name: "Operasyonel" },
];

const initialDepartmentRows = [
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

const initialDepartmentHierarchyRows = [
  { id: 1, childDepartmentId: 2, parentDepartmentId: 1 },
];

const initialUserRoleRows = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Manager" },
  { id: 3, name: "User" },
];

const initialUserRows = [
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

const newDepartmentTypeRow = [{ name: "" }];

const newUserRow = [
  {
    userRole: "",
    departmentId: "",
    companyId: "",
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

const departmentTypeColumns = [
  { field: "id", headerName: "ID", type: "number", width: 90 },
  { field: "name", headerName: "Name", width: 90, editable: true },
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
];

const AdminDashboard = () => {
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
    "Company Types": {
      initialRows: [{ id: 1, name: "Yazılım Geliştirme" }],
      newRow: { name: "" },
      columns: [
        { field: "id", headerName: "ID", type: "number", width: 90 },
        { field: "name", headerName: "Name", width: 90, editable: true },
      ],
    },
    Cities: {
      initialRows: [{ id: 1, name: "İzmir" }],
      newRow: { name: "" },
      columns: [
        { field: "id", headerName: "ID", type: "number", width: 90 },
        { field: "name", headerName: "Name", width: 90, editable: true },
      ],
    },
    Regions: {
      initialRows: [{ id: 1, name: "İzmir Güney" }],
      newRow: { name: "" },
      columns: [
        { field: "id", headerName: "ID", type: "number", width: 90 },
        { field: "name", headerName: "Name", width: 90, editable: true },
      ],
    },
    Towns: {
      initialRows: [{ id: 1, name: "Urla", regionId: 1, cityId: 1 }],
      newRow: { name: "", regionId: "", cityId: "" },
      columns: [
        { field: "id", headerName: "ID", type: "number", width: 90 },
        { field: "name", headerName: "Name", width: 90, editable: true },
        {
          field: "regionId",
          headerName: "Region_ID",
          type: "number",
          editable: true,
        },
        {
          field: "cityId",
          headerName: "City_ID",
          type: "number",
          editable: true,
        },
      ],
    },
    Companies: {
      initialRows: [
        {
          id: 1,
          name: "Delta Akıllı Teknolojiler A.Ş.",
          short_Name: "Delta",
          companyTypeId: 1,
          addressStreet: "Teknopark İzmir A8 Binası",
          addressTown: 1,
        },
      ],
      newRow: {
        name: "",
        short_Name: "",
        companyTypeId: "",
        addressStreet: "",
        addressTown: "",
      },
      columns: [
        { field: "id", headerName: "ID", type: "number", width: 90 },
        { field: "name", headerName: "Name", width: 90, editable: true },
        {
          field: "short_Name",
          headerName: "Short_Name",
          width: 90,
          editable: true,
        },
        {
          field: "companyTypeId",
          headerName: "Company_Type_ID",
          type: "number",
          editable: true,
        },
        {
          field: "addressStreet",
          headerName: "Address_Street",
          width: 90,
          editable: true,
        },
        {
          field: "addressTown",
          headerName: "Address_Town",
          type: "number",
          editable: true,
        },
      ],
    },
    Departments: {
      initialRows: [
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
      ],
      newRow: {
        name: "",
        companyId: "",
        departmentTypeId: "",
        addressStreet: "",
        addressTown: "",
        managerId: "",
      },
      columns: [
        { field: "id", headerName: "ID", type: "number", width: 90 },
        { field: "name", headerName: "Name", width: 90, editable: true },
        {
          field: "companyId",
          headerName: "Company_ID",
          type: "number",
          editable: true,
        },
        {
          field: "departmentTypeId",
          headerName: "Department_Type_ID",
          type: "number",
          editable: true,
        },
        {
          field: "addressStreet",
          headerName: "Address_Street",
          width: 90,
          editable: true,
        },
        {
          field: "addressTown",
          headerName: "Address_Town",
          type: "number",
          editable: true,
        },
        {
          field: "managerId",
          headerName: "Manager_ID",
          type: "number",
          editable: true,
        },
      ],
    },
    "Department Hierarchies": {
      initialRows: [{ id: 1, childDepartmentId: 2, parentDepartmentId: 1 }],
      newRow: { childDepartmentId: "", parentDepartmentId: "" },
      columns: [
        { field: "id", headerName: "ID", type: "number", width: 90 },
        {
          field: "childDepartmentId",
          headerName: "Child_Department_ID",
          type: "number",
          editable: true,
        },
        {
          field: "parentDepartmentId",
          headerName: "Parent_Department_ID",
          type: "number",
          editable: true,
        },
      ],
    },
    "User Roles": {
      initialRows: [
        { id: 1, name: "Admin" },
        { id: 2, name: "Manager" },
        { id: 3, name: "User" },
      ],
      newRow: { name: "" },
      columns: [
        { field: "id", headerName: "ID", type: "number", width: 90 },
        { field: "name", headerName: "Name", width: 90, editable: true },
      ],
    },
  };

  return <Sidebar role="ADMIN" tableConfig={tableConfig} />;
};

export default AdminDashboard;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  CssBaseline,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import {
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import EditableTable from "./EditableTable";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const LOGOUT_URL = "/api/v1/auth/users/logout";
const drawerWidth = 240;

const Sidebar = ({ role, tableConfig }) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(null);
  const selectedTableRef = useRef(null);

  const logout = async () => {
    try {
      const token = auth?.token;
      if (token) {
        await axios.post(LOGOUT_URL, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      localStorage.removeItem("auth");
      setAuth({});
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const getSidebarContent = (role) => {
    switch (role) {
      case "ADMIN":
        return [
          "Users",
          "Department Types",
          "Company Types",
          "Cities",
          "Regions",
          "Towns",
          "Companies",
          "Departments",
          "Department Hierarchies",
          "User Roles",
        ];
      case "MANAGER":
        return [
          "Users",
          "Department Types",
          "Company Types",
          "Cities",
          "Regions",
          "Towns",
          "Companies",
          "Departments",
          "Department Hierarchies",
          "User Roles",
        ];
      case "EMPLOYEE":
        return [];
      default:
        return [];
    }
  };

  const sidebarContent = getSidebarContent(role);

  const handleTableSelection = (table) => {
    setSelectedTable(table);
    selectedTableRef.current = table;
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "error";
      case "MANAGER":
        return "warning";
      case "EMPLOYEE":
        return "primary";
      default:
        return "primary";
    }
  };

  const storedAuth = localStorage.getItem("auth");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "16px",
              }}
            >
              <Avatar sx={{ width: 80, height: 80 }}>U</Avatar>
              <Chip
                label={storedAuth ? JSON.parse(storedAuth).role : "USER"}
                color={getRoleColor(JSON.parse(storedAuth).role)}
                size="small"
                sx={{ margin: "8px" }}
              />
              <Typography>Name Surname</Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ width: "100px", marginTop: "16px" }}
                onClick={handleLogout}
              >
                Sign out
              </Button>
            </Box>
            <Divider />
            <List>
              {sidebarContent.map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => handleTableSelection(text)}>
                    {/*<ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>*/}
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          padding: "24px",
        }}
      >
        {selectedTable ? (
          <EditableTable
            key={selectedTable}
            initialRows={tableConfig[selectedTable]?.initialRows}
            newRow={tableConfig[selectedTable]?.newRow}
            columns={tableConfig[selectedTable]?.columns}
          />
        ) : (
          <Typography variant="h6">
            Please select a table to view its content.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;

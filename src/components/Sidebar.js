import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const drawerWidth = 240;

const Sidebar = ({ role, setSelectedTable }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getSidebarContent = (role) => {
    switch (role) {
      case "ADMIN":
        return [
          { key: "Companies", label: t("companies") },
          { key: "Departments", label: t("departments") },
          { key: "Users", label: t("users") },
          { key: "Company Types", label: t("company_types") },
          { key: "Department Types", label: t("department_types") },
          { key: "Department Hierarchies", label: t("department_hierarchies") },
          { key: "Cities", label: t("cities") },
          { key: "Regions", label: t("regions") },
          { key: "Towns", label: t("towns") },
        ];
      case "MANAGER":
        return [
          { key: "Department Users", label: t("department_users") },
          { key: "Add User", label: t("add_user") },
        ];
      default:
        return [];
    }
  };

  const sidebarContent = getSidebarContent(role);

  const handleTableSelection = (table) => {
    setSelectedTable(table.key);
    navigate(
      `/${role.toLowerCase()}/${table.key.toLowerCase().replace(/\s+/g, "-")}`
    );
  };

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
            marginTop: "16px",
          }}
        >
          <Box>
            <List>
              {sidebarContent.map((item, index) => (
                <ListItem key={item.key} disablePadding>
                  <ListItemButton onClick={() => handleTableSelection(item)}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

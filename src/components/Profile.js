import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Divider,
  Avatar,
  Chip,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Logout, AccountCircleIcon } from "@mui/icons-material";
import LanguageSelector from "./LanguageSelector";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { auth, setAuth } = useAuth();

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

  return (
    <Box sx={{ display: "flex", padding: "0 75px" }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar sx={{ width: 150, height: 150 }}>U</Avatar>
        <Chip
          label={auth?.role ? auth.role : "USER"}
          color={getRoleColor(auth?.role)}
          size="small"
          sx={{ maxWidth: "100px", marginTop: "10px" }}
        />
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", marginLeft: "75px" }}
      >
        <Typography>Name Surname</Typography>
        <Typography>example@gmail.com</Typography>
      </Box>
    </Box>
  );
};

export default Profile;

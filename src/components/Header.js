import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import axios from "../api/axios";

const LOGOUT_URL = "/api/v1/auth/users/logout";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [profileMenu, setProfileMenu] = useState(null);
  const open = Boolean(profileMenu);

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

  const handleClick = (event) => {
    setProfileMenu(event.currentTarget);
  };

  const handleClose = () => {
    setProfileMenu(null);
  };

  const handleProfileClick = () => {
    if (auth?.role) {
      navigate(`/${auth.role.toLowerCase()}/profile`);
      handleClose();
    }
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

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <LanguageSelector />
        {auth?.token && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title={t("account")}>
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 48, height: 48 }}>U</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={profileMenu}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Divider />
              <MenuItem onClick={handleProfileClick}>{t("profile")}</MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                {t("log_out")}
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default Header;

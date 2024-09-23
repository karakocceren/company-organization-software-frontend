import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, Box, Avatar, Chip } from "@mui/material";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const getRoleInfo = (role) => {
    switch (role) {
      case "ADMIN":
        return { role: t("role_admin"), color: "error" };
      case "MANAGER":
        return { role: t("role_manager"), color: "warning" };
      case "EMPLOYEE":
        return { role: t("role_employee"), color: "primary" };
      default:
        return "primary";
    }
  };

  const roleName = getRoleInfo(auth?.role).role;
  const roleColor = getRoleInfo(auth?.role).color;

  return (
    <Box
      sx={{
        display: "flex",
        padding: "0 75px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar sx={{ width: 150, height: 150 }}>U</Avatar>
        <Chip
          label={auth?.role ? roleName : "USER"}
          color={roleColor}
          size="small"
          sx={{ maxWidth: "100px", marginTop: "10px" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "75px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ marginRight: "8px", fontWeight: "bold" }}>
            {t("name")}:
          </Typography>
          <Typography>{auth?.name}</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ marginRight: "8px", fontWeight: "bold" }}>
            {t("surname")}:
          </Typography>
          <Typography>{auth?.surname}</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ marginRight: "8px", fontWeight: "bold" }}>
            {t("email_address")}:
          </Typography>
          <Typography>{auth?.mail}</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ marginRight: "8px", fontWeight: "bold" }}>
            {t("company_name")}:
          </Typography>
          <Typography>{auth?.companyName}</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ marginRight: "8px", fontWeight: "bold" }}>
            {t("department_name")}:
          </Typography>
          <Typography>{auth?.departmentName}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;

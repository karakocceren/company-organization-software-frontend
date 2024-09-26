import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Box, Avatar, Chip, Button } from "@mui/material";
import ErrorMessage from "./ErrorMessage";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const GET_PROFILE_PICTURE_URL = "/api/v1/profile/profile-picture";
const UPLOAD_PROFILE_PICTURE_URL = "/api/v1/profile/upload-profile-picture";

const Profile = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  const fetchProfilePicture = async () => {
    try {
      const response = await axios.get(GET_PROFILE_PICTURE_URL, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      });

      const reader = new FileReader();
      reader.readAsDataURL(response.data);
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfilePicture(base64Image);
      };
    } catch (error) {
      console.error("Error fetching profile picture");
    }
  };

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if the selected file is an image
    if (file && !file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, etc.)");
      setSelectedFile(null); // Clear selection if invalid file
      return;
    }

    setSelectedFile(file); // Store valid file
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(UPLOAD_PROFILE_PICTURE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      });

      if (response.status === 200) {
        const newProfilePictureUrl = URL.createObjectURL(selectedFile);
        setProfilePicture(newProfilePictureUrl);
      }
    } catch (error) {
      console.error("Failed to upload the profile picture", error);
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
        <Avatar
          sx={{ width: 150, height: 150 }}
          src={profilePicture ? profilePicture : undefined}
          alt="Profile Picture"
        >
          {profilePicture ? null : "U"}
        </Avatar>

        <Chip
          label={auth?.role ? roleName : "USER"}
          color={roleColor}
          size="small"
          sx={{ maxWidth: "100px", marginTop: "10px" }}
        />
        <Button variant="text" component="label" sx={{ padding: "5px 0" }}>
          upload_picture
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        <Button
          variant="text"
          onClick={handleUpload}
          disabled={!selectedFile}
          sx={{ padding: "0" }}
        >
          submit_picture
        </Button>
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

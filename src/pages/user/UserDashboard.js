import React from "react";
import { Box } from "@mui/material";
import Profile from "../../components/Profile";

const UserDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Profile />
      </Box>
    </Box>
  );
};

export default UserDashboard;

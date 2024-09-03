import React from "react";
import { AppBar, Toolbar, Typography, Box, Divider } from "@mui/material";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" color="primary">
          Company Organization
        </Typography>
        <LanguageSelector />
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default Header;

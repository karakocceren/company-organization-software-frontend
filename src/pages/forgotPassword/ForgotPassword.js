import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTranslation } from "react-i18next";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const { t } = useTranslation();

  return (
    <Box className={styles["container"]}>
      <Card variant="outlined" className={styles["card"]}>
        {
          <>
            <CardContent className={styles["content"]}>
              <Typography
                className={styles["title"]}
                color="text.primary"
                gutterBottom
              >
                {t("forgot_password")}
              </Typography>
              <FormControl
                variant="outlined"
                margin="normal"
                className={styles["form"]}
              >
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="text"
                  placeholder="Email"
                  required
                />
              </FormControl>

              <Button variant="outlined" className={styles["signin-button"]}>
                {t("reset_password_button")}
              </Button>
            </CardContent>
            <CardActions className={styles["actions"]}>
              <Button size="small" variant="text" href="/signin">
                {t("back_to_signin")}
              </Button>
            </CardActions>
          </>
        }
      </Card>
    </Box>
  );
};

export default ForgotPassword;

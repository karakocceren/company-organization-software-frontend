import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";
import styles from "./Login.module.css";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { t } = useTranslation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                {t("signin")}
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
              <Box className={styles["password-container"]}>
                <FormControl
                  variant="outlined"
                  margin="normal"
                  className={styles["form"]}
                >
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("password")}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  variant="text"
                  size="small"
                  href="/forgot-password"
                  className={styles["forgot-password"]}
                >
                  {t("forgot_password_button")}?
                </Button>
              </Box>
              <Button variant="outlined" className={styles["signin-button"]}>
                {t("signin_button")}
              </Button>
            </CardContent>
            <CardActions className={styles["actions"]}>
              <Button size="small" variant="text" href="/activate-account">
                {t("activate_account_button")}
              </Button>
            </CardActions>
          </>
        }
      </Card>
    </Box>
  );
};

export default Login;

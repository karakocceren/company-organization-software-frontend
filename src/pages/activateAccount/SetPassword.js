import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  FormControl,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import ErrorMessage from "../../components/ErrorMessage";
import ValidationSchema from "../../schemas/ValidationSchema";
import axios from "../../api/axios";

import styles from "./SetPassword.module.css";

const SET_PASSWORD_URL = "/api/v1/auth/set-password";

const SetPassword = () => {
  const { t } = useTranslation();
  const { resetPasswordSchema } = ValidationSchema();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const type = searchParams.get("type");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        `${SET_PASSWORD_URL}?token=${encodeURIComponent(
          token
        )}&type=${encodeURIComponent(type)}`,
        JSON.stringify({
          token: token,
          type: type,
          password: values.password,
          passwordAgain: values.confirmPassword,
        })
      );
      const message = response?.data?.message;

      setSnackbarMessage(message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/signin");
      }, 2000);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Failed to set password. Please try again.";
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    submitCount,
  } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

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
                {t("reset_password")}
              </Typography>

              <form onSubmit={handleSubmit} autoComplete="off">
                <Typography
                  color="text.secondary"
                  className={styles["form-title"]}
                >
                  {t("password")}:
                </Typography>
                <Box className={styles["password-container"]}>
                  <FormControl
                    variant="outlined"
                    margin="normal"
                    className={styles["form"]}
                  >
                    <TextField
                      name="password"
                      error={submitCount > 0 && errors.password ? true : false}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("password")}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  <div>
                    {submitCount > 0 && errors.password && (
                      <Typography className={styles["form-error"]}>
                        {errors.password}
                      </Typography>
                    )}
                  </div>
                </Box>
                <Typography
                  color="text.secondary"
                  className={styles["form-title"]}
                >
                  {t("password_again")}:
                </Typography>
                <Box className={styles["password-container"]}>
                  <FormControl
                    variant="outlined"
                    margin="normal"
                    className={styles["form"]}
                  >
                    <TextField
                      name="confirmPassword"
                      error={
                        submitCount > 0 && errors.confirmPassword ? true : false
                      }
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="outlined-adornment-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("password_again")}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  <div>
                    {submitCount > 0 && errors.confirmPassword && (
                      <Typography className={styles["form-error"]}>
                        {errors.confirmPassword}
                      </Typography>
                    )}
                  </div>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  className={styles["signin-button"]}
                >
                  {t("reset_password_button")}
                </Button>
              </form>
            </CardContent>
            <CardActions className={styles["actions"]}>
              <Button size="small" variant="text" href="/signin">
                {t("back_to_signin")}
              </Button>
            </CardActions>
          </>
        }
      </Card>
      <ErrorMessage
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </Box>
  );
};

export default SetPassword;

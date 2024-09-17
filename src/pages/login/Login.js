import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
import useAuth from "../../hooks/useAuth";
import ValidationSchema from "../../schemas/ValidationSchema";
import axios from "../../api/axios";

import styles from "./Login.module.css";
import ErrorMessage from "../../components/ErrorMessage";

const LOGIN_URL = "/api/v1/auth/login";

const Login = () => {
  const { t } = useTranslation();
  const { loginSchema } = ValidationSchema();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [data, setData] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email: values.email,
          password: values.password,
        })
      );
      const token = response?.data?.token;
      const role = response?.data?.roleName;
      const message = response?.data?.message;

      setAuth({
        role,
        token,
      });

      setSnackbarMessage(message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/dashboard");
      actions.resetForm();
    } catch (error) {
      const message = error?.response?.data?.message || t("login_failed");
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);

      errRef.current.focus();
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
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [values.email, values.password]);

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

              <form onSubmit={handleSubmit} autoComplete="off">
                <Typography
                  color="text.secondary"
                  className={styles["form-title"]}
                >
                  Email:
                </Typography>
                <FormControl
                  variant="outlined"
                  margin="normal"
                  className={styles["form"]}
                >
                  <TextField
                    name="email"
                    error={submitCount > 0 && errors.email ? true : false}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={userRef}
                    id="outlined-adornment-email"
                    type="email"
                    placeholder="Email"
                  />
                </FormControl>
                <div>
                  {submitCount > 0 && errors.email && (
                    <Typography className={styles["form-error"]}>
                      {errors.email}
                    </Typography>
                  )}
                </div>
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
                  <Button
                    variant="text"
                    size="small"
                    href="/forgot-password"
                    className={styles["forgot-password"]}
                  >
                    {t("forgot_password_button")}?
                  </Button>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  className={styles["signin-button"]}
                >
                  {t("signin_button")}
                </Button>
              </form>
            </CardContent>
            <CardActions className={styles["actions"]}>
              <Button size="small" variant="text" href="/activate-account">
                {t("activate_account_button")}
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

export default Login;

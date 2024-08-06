import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField } from "@mui/material";
import { basicSchema } from "../../schemas";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import styles from "./Login.module.css";
import axios from "axios";

const Login = () => {
  const { t } = useTranslation();
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values, actions) => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({
        email: values.email,
        password: values.password,
        roles,
        accessToken,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      console.log(err);
      errRef.current.focus();
    }

    {
      /*const response = await fetch("/login", {
      method: "POST",
    });
    const responseJson = response.json();
    console.log(responseJson);*/
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: basicSchema,
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
                    error={errors.email && touched.email ? true : false}
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
                  {errors.email && touched.email && (
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
                      error={errors.password && touched.password ? true : false}
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
                    {errors.password && touched.password && (
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
    </Box>
  );
};

export default Login;

import React, { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  FormControl,
} from "@mui/material";
import ErrorMessage from "../../components/ErrorMessage";
import ValidationSchema from "../../schemas/ValidationSchema";
import axios from "../../api/axios";

import styles from "./ActivateAccount.module.css";

const ACTIVATE_ACCOUNT_URL = "/api/v1/auth/activate-account";

const ActivateAccount = () => {
  const { t } = useTranslation();
  const { activationAndForgotPasswordSchema } = ValidationSchema();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        ACTIVATE_ACCOUNT_URL,
        JSON.stringify({
          email: values.email,
        })
      );
      const message = response?.data?.message;

      setSnackbarMessage(message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Failed to send activation link. Please try again.";
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
      email: "",
    },
    validationSchema: activationAndForgotPasswordSchema,
    onSubmit,
  });

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
                {t("activate_account")}
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
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  className={styles["signin-button"]}
                >
                  {t("send_activation_link")}
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

export default ActivateAccount;

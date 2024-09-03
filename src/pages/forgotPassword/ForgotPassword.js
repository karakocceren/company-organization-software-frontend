import React from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import ValidationSchema from "../../schemas/ValidationSchema";

import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { activationAndForgotPasswordSchema } = ValidationSchema();

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
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
                {t("forgot_password")}
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
    </Box>
  );
};

export default ForgotPassword;

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { basicSchema } from "../../schemas";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import styles from "./ForgotPassword.module.css";
import { TextField } from "@mui/material";

const ForgotPassword = () => {
  const { t } = useTranslation();

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
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
    },
    validationSchema: basicSchema,
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
                    error={errors.email && touched.email ? true : false}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
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

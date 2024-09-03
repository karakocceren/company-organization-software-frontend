import React from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ValidationSchema = () => {
  const { t } = useTranslation();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email(t("valid_email")).required(t("required_email")),
    password: Yup.string().required(t("required_password")),
  });

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, t("min_password_length"))
      .max(32, t("max_password_length"))
      .matches(/[A-Z]/, t("password_uppercase_letter"))
      .matches(/[a-z]/, t("password_lowercase_letter"))
      .matches(/[0-9]/, t("password_numeric_char"))
      .matches(/[@$.!\-+]/, t("password_special_char"))
      .required(t("required_password")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("password_match"))
      .required(t("required_confirm_password")),
  });

  const activationAndForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email(t("valid_email")).required(t("required_email")),
  });

  return {
    loginSchema,
    resetPasswordSchema,
    activationAndForgotPasswordSchema,
  };
};

export default ValidationSchema;

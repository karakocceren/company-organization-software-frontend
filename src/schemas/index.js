import i18next from "i18next";
import * as Yup from "yup";

export const basicSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18next.t("valid_email"))
    .required(i18next.t("required_email")),
  password: Yup.string().required(i18next.t("required_password")),
});

import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "English" },
  { code: "tr", lang: "Türkçe" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box
      sx={{
        minWidth: 60,
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "24px",
      }}
    >
      <FormControl
        variant="standard"
        size="small"
        sx={{ m: 1, minWidth: 60, marginTop: 0 }}
      >
        <InputLabel>
          <LanguageIcon />
        </InputLabel>
        <Select label={<LanguageIcon />} displayEmpty onChange={handleChange}>
          {languages.map((lng) => {
            return (
              <MenuItem key={lng.code} value={lng.code}>
                {lng.lang}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;

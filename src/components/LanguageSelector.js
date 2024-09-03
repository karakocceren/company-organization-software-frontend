import { useTranslation } from "react-i18next";
import { Box, Select, InputLabel, MenuItem, FormControl } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

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
        marginTop: "8px",
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
        <Select
          label={<LanguageIcon />}
          defaultValue="en"
          displayEmpty
          onChange={handleChange}
        >
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

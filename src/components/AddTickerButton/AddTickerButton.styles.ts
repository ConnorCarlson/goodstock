import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Form = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  gap: theme.spacing(1),
  paddingTop: theme.spacing(1),
}));

export const TickerInput = styled(TextField)(({ theme }) => ({
  flex: "0 0 200px",
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  height: 32,
}));

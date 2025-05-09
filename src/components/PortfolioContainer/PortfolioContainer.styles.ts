import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const Container = styled(Box)(({ theme }) => ({
  width: "600px",
  marginLeft: "auto",
  marginRight: "auto",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
}));

export const Header = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: "right",
}));
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  padding: 0,
}));

export const StyledTable = styled(Table)(() => ({
  "& th, & td": {
    borderBottom: "none",
  },
}));

export const AddTickerWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "left",
  marginLeft: theme.spacing(1),
}));

export const DeletePortfolioButtonWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "left",
    margin: theme.spacing(1),
  }));
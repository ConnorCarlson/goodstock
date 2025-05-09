import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export const DeleteButton = styled(Button)(() => ({
  textTransform: "none",
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  // add custom overrides if needed
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(2, 3),
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
}));
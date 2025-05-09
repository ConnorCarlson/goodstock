import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

export const TriggerButton = styled(Button)(({ theme }) => ({
  // you can add custom margins or theming here
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  // override dialog root styles if needed
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

export const NameInput = styled(TextField)(({ theme }) => ({
  width: '100%',
}));

export const Form = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
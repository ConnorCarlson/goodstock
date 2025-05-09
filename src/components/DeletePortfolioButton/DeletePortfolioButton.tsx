import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { removePortfolio } from "../../store";
import Typography from "@mui/material/Typography";

import {
  DeleteButton,
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
} from "./DeletePortfolioButton.styles";

interface DeletePortfolioButtonProps {
  portfolio: string;
}

const DeletePortfolioButton: React.FC<DeletePortfolioButtonProps> = ({ portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  const openConfirm = () => setOpen(true);
  const closeConfirm = () => setOpen(false);
  const handleDelete = () => {
    dispatch(removePortfolio({ name: portfolio }));
    closeConfirm();
  };

  return (
    <>
      <DeleteButton variant="text" color="info" onClick={openConfirm}>
        Delete Portfolio
      </DeleteButton>

      <StyledDialog open={open} onClose={closeConfirm}>
        <StyledDialogTitle>Delete Portfolio</StyledDialogTitle>
        <StyledDialogContent>
          <Typography>
            Are you sure you want to delete the “{portfolio}” portfolio? This action cannot be undone.
          </Typography>
        </StyledDialogContent>
        <StyledDialogActions>
          <DeleteButton onClick={closeConfirm}>Cancel</DeleteButton>
          <DeleteButton color="error" variant="contained" onClick={handleDelete}>
            Delete
          </DeleteButton>
        </StyledDialogActions>
      </StyledDialog>
    </>
  );
};

export default DeletePortfolioButton;

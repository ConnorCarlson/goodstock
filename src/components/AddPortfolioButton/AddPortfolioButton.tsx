import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { addPortfolio } from '../../store';

import {
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  NameInput,
  TriggerButton,
  StyledDialog,
  Form,
} from './AddPortfolioButton.styles'

const AddPortfolioButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const existing = useSelector((s: RootState) => Object.keys(s.portfolios));

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => {
    setName('');
    setError(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setName(v);
    if (!v.trim()) {
      setError('Name is required');
    } else if (existing.includes(v.trim())) {
      setError('That portfolio already exists');
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || error) return;
    dispatch(addPortfolio({ name: trimmed }));
    setOpen(false);
  };

  return (
    <>
      <TriggerButton variant="contained" color="primary" onClick={handleOpen}>
        Add Portfolio
      </TriggerButton>

      <StyledDialog open={open} onClose={handleClose}>
        <StyledDialogTitle>Add New Portfolio</StyledDialogTitle>
        <Form onSubmit={handleSubmit}>
          <StyledDialogContent>
            <NameInput
              autoFocus
              margin="dense"
              label="Portfolio Name"
              fullWidth
              value={name}
              onChange={handleChange}
              error={!!error}
              helperText={error ?? ' '}
            />
          </StyledDialogContent>

          <StyledDialogActions>
            <TriggerButton onClick={handleClose}>
              Cancel
            </TriggerButton>
            <TriggerButton
              type="submit"
              variant="contained"
              disabled={!!error || !name.trim()}
            >
              Add
            </TriggerButton>
          </StyledDialogActions>
        </Form>
      </StyledDialog>
    </>
  );
};

export default AddPortfolioButton;
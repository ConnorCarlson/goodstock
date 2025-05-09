import React, { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { addTickerToPortfolio } from "../../store";
import { restClient } from "@polygon.io/client-js";

import CircularProgress from "@mui/material/CircularProgress";

import { Form, TickerInput, SubmitButton } from "./AddTickerButton.styles";

const API_KEY = process.env.REACT_APP_POLYGON_API_KEY!;
const polygon = restClient(API_KEY);

interface Props {
  portfolio: string;
}

const AddTickerButton: React.FC<Props> = ({ portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();
  const existing = useSelector((s: RootState) => s.portfolios[portfolio] || []);

  const [newSym, setNewSym] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {


    const val = e.target.value.toUpperCase().trim();

    setNewSym(val);
    setError(null);

    if (!val) return;
    if (existing.includes(val)) {
      setError("Already in this portfolio");
      return;
    }
    setChecking(true);
    try {
      const resp = await polygon.reference.tickerDetails(val);
      if (resp.results?.ticker !== val) setError("Not found");
    } catch {
      setError("Not found");
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error !== null) return;
    dispatch(addTickerToPortfolio({ portfolio, symbol: newSym }));
    setNewSym("");
    setError(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TickerInput
        size="small"
        margin="dense"
        label="Ticker"
        placeholder="e.g. AAPL"
        value={newSym}
        onChange={handleChange}
        error={!!error}
        helperText={error ?? " "}
      />

      <SubmitButton
        type="submit"
        variant="contained"
        size="small"
        disabled={error !== null || checking}
      >
        {checking ? <CircularProgress size={16} /> : "Add"}
      </SubmitButton>
    </Form>
  );
};

export default AddTickerButton;

import React, { useState, useEffect, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import { restClient } from "@polygon.io/client-js";
import { IconButton, Skeleton, TableCell, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { removeTickerFromPortfolio } from "../../store";
import { green, red } from '@mui/material/colors';

import {
  StyledRow,
  SymbolCell,
  ChangeCell,
  RemoveButtonCell,
} from "./Ticker.styles";
import Sparkline from "../Sparkline/Sparkline";

interface TickerProps {
  symbol: string;
  portfolio: string;
}

const API_KEY = process.env.REACT_APP_POLYGON_API_KEY!;
const polygon = restClient(API_KEY);

const Ticker: React.FC<TickerProps> = ({ symbol, portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [prevClose, setPrevClose] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<{ date: string; close: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const tickerDetails = await polygon.reference.tickerDetails(symbol);
        if (!tickerDetails.results?.name) {
          throw new Error("Error fetching ticker metadata");
        }
        setName(tickerDetails.results.name);

        const snapshot = await polygon.stocks.snapshotTicker(symbol);
        const currentPrice = snapshot.ticker?.min?.c;
        const prevDayPrice = snapshot.ticker?.prevDay?.c;
        if (currentPrice === undefined || prevDayPrice === undefined) {
          throw new Error("Error fetching latest quote");
        }

        setPrevClose(prevDayPrice);
        setPrice(currentPrice !== 0 ? currentPrice : prevDayPrice);

        const to = new Date().toISOString().slice(0, 10);
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 7);
        const from = fromDate.toISOString().slice(0, 10);
        const agg = await polygon.stocks.aggregates(symbol, 1, 'day', from, to);
        const data = (agg.results || []).map(r => ({

          date: new Date(r.t ?? 0).toLocaleDateString(),
          close: r.c ?? 0,
        }));
        setHistory(data);

      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) {
    return (
      <StyledRow>
        <TableCell><Skeleton width={40} /></TableCell>
        <TableCell><Skeleton width="60%" /></TableCell>
        <TableCell align="right"><Skeleton width={56} /></TableCell>
        <TableCell align="right"><Skeleton width={48} /></TableCell>
        <TableCell align="center">
          <Skeleton variant="circular" width={24} height={24} />
        </TableCell>
      </StyledRow>
    );
  }

  if (error) {
    return (
      <StyledRow>
        <TableCell colSpan={5}>
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        </TableCell>
      </StyledRow>
    );
  }

  const change = price! - prevClose!;
  const changePercent = (change / prevClose!) * 100;
  const positive = change >= 0;

  return (
    <StyledRow key={symbol}>
      <SymbolCell>{symbol}</SymbolCell>
      <TableCell>{name}</TableCell>
      <TableCell align="right">${price!.toFixed(2)}</TableCell>
      <ChangeCell align="right" positive={positive}>
        <Tooltip title="Compared to the last closing price">
          <span>
            {positive ? "+" : ""}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </span>
        </Tooltip>
      </ChangeCell>
      <TableCell>
        <Sparkline history={history} />
      </TableCell>
      <RemoveButtonCell>
        <IconButton
          size="small"
          onClick={() =>
            dispatch(
              removeTickerFromPortfolio({ portfolio, symbol })
            )
          }
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </RemoveButtonCell>
    </StyledRow>
  );
};

export default Ticker;

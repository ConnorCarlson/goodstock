import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const StyledRow = styled(TableRow)(() => ({}));

export const SymbolCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
}));

export const ChangeCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== 'positive',
})<{ positive: boolean }>(({ theme, positive }) => ({
  color: positive
    ? theme.palette.success.main
    : theme.palette.error.main,
}));

export const RemoveButtonCell = styled(TableCell)(() => ({
  textAlign: 'center',
}));

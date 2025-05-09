import React from "react";
import { useSelector } from "react-redux";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledTable,
    AddTickerWrapper,
    DeletePortfolioButtonWrapper,
} from "./Portfolio.styles";
import { Box, TableCell } from "@mui/material";
import Ticker from "../Ticker/Ticker";
import AddTickerButton from "../AddTickerButton/AddTickerButton";
import { RootState } from "../../store";
import DeletePortfolioButton from "../DeletePortfolioButton/DeletePortfolioButton";

interface PortfolioProps {
    name: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ name }) => {
    const symbols = useSelector((s: RootState) => s.portfolios[name] || []);
    return (
        <StyledAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{name}</Typography>
            </AccordionSummary>
            <StyledAccordionDetails>
                <TableContainer>
                    <StyledTable size="small">
                        <TableBody>
                            {symbols.map((sym: string) => (
                                <Ticker key={sym} portfolio={name} symbol={sym} />
                            ))}
                            <TableRow>
                                <TableCell colSpan={2} padding="none">
                                    <AddTickerWrapper>
                                        <AddTickerButton portfolio={name} />
                                    </AddTickerWrapper>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </StyledTable>
                </TableContainer>
                <DeletePortfolioButtonWrapper>
                    <DeletePortfolioButton portfolio={name} />
                </DeletePortfolioButtonWrapper>
            </StyledAccordionDetails>
        </StyledAccordion>
    );
};

export default Portfolio;
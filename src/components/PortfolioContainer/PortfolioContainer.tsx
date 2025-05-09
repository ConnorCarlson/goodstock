import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import Portfolio from "../Portfolio/Portfolio";
import AddPortfolioButton from "../AddPortfolioButton/AddPortfolioButton";

import { Container, Header } from "./PortfolioContainer.styles";

const PortfolioContainer: React.FC = () => {
  const portfolioNames = Object.keys(useSelector((s: RootState) => s.portfolios));

  return (
    <Container>
      <Header>
        <AddPortfolioButton />
      </Header>
      {portfolioNames.map((name) => (
        <Portfolio key={name} name={name} />
      ))}
    </Container>
  );
};

export default PortfolioContainer;

import Ticker from './components/Ticker/Ticker';
import Portfolio from './components/Portfolio/Portfolio';

import './App.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { AppDispatch, RootState, store } from './store';
import AddPortfolioButton from './components/AddPortfolioButton/AddPortfolioButton';
import PortfolioContainer from './components/PortfolioContainer/PortfolioContainer';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <PortfolioContainer />
      </Provider>

    </div>
  );
}

export default App;

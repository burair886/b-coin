import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Coins from './components/Coins';
import Exchange from './components/Exchange';
import CoinData from './components/CoinData';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/coins'} element={<Coins />} />
        <Route path={'/exchange'} element={<Exchange />} />
        <Route path={'/coin/:id'} element={<CoinData />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

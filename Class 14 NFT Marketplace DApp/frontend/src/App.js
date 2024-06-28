import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Auction from './Auction';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="landingpage">
      <Header />
      <Hero />
      <Auction />
      <Footer />
    </div>
  );
}

export default App;

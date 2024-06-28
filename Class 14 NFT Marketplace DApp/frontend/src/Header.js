import React from 'react';
import './App.css'; // Import CSS

const Header = () => {
  return (
    <div className="navbar">
      <a className="navlogo">NFT MarketPlace</a>
      <button className="hamburger">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
      <div className="buttonwrap">
        <button id="explore" className="createbtn selectedbtn">Explore NFTs</button>
      </div>
    </div>
  );
}

export default Header;

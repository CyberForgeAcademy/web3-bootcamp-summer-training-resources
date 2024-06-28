import React from 'react';
import './App.css'; // Import CSS

import Image1 from './assets/images/cover.png';

const Hero = () => {
  return (
    <div className="box">
      <div className="infobox">
        <p className="infobox-boldtext">Discover, Buy, and Sell Unique NFTs on Our Marketplace!</p>
        <p className="infobox-slimtext">Join the Future of Digital Collectibles at Our NFT Hub</p>

        <div id="status"></div>

        <div className="infobox-btnwrapper">
          <a className="infobox-explorebtn selected" href="#second">Explore</a>
        </div>
      </div>
      <div className="display">
        <img className="display-nft" src={Image1} alt="unsplash-OG44d93i-NJk" border="0" />
        <div className="infowrapper">
          <div className="info">
            <img className="info-img" src={Image1} alt="unsplash-OG44d93i-NJk" border="0" />
            <div>
              <p>Lorem</p>
              <p>0.41 ETH</p>
            </div>
          </div>
          <div className="info2">
            <p>Grab it Now!</p>
            <div className="iconwrapper">
              <svg width="22" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M5.7365 2C3.6575 2 1.5 3.8804 1.5 6.5135c0 3.1074 2.3236 5.9603 4.8612 8.1207 1.2458 1.0606 2.4954 1.9137 3.4352 2.5022.4692.2937.8593.5203 1.1305.6727L11 17.85l.0731-.0409a27.984 27.984 0 0 0 1.1304-.6727c.9399-.5885 2.1895-1.4416 3.4353-2.5022C18.1764 12.4738 20.5 9.6209 20.5 6.5135 20.5 3.8805 18.3425 2 16.2635 2c-2.1054 0-3.8008 1.389-4.552 3.6426a.75.75 0 0 1-1.423 0C9.5373 3.389 7.8418 2 5.7365 2ZM11 18.7027l.3426.6672a.7502.7502 0 0 1-.6852 0L11 18.7027ZM0 6.5135C0 3.052 2.829.5 5.7365.5 8.0298.5 9.8808 1.7262 11 3.6048 12.1192 1.7262 13.9702.5 16.2635.5 19.171.5 22 3.052 22 6.5135c0 3.8183-2.8014 7.06-5.3888 9.2628-1.3167 1.121-2.6296 2.0166-3.6116 2.6314-.4918.308-.9025.5467-1.1918.7092a19.142 19.142 0 0 1-.4301.2347l-.0248.013-.007.0036-.0021.0011c-.0003.0001-.0012.0006-.3438-.6666-.3426.6672-.3424.6673-.3426.6672l-.0033-.0017-.007-.0036-.0248-.013a19.142 19.142 0 0 1-.4301-.2347 29.324 29.324 0 0 1-1.1918-.7092c-.982-.6148-2.295-1.5104-3.6116-2.6314C2.8014 13.5735 0 10.3318 0 6.5135Z"
                  fill="#E0E0E0" />
              </svg>
              785
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

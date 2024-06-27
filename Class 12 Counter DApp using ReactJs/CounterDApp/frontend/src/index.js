import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Main from './Main';
// import Counter from './Counter';
import Counter2 from './Counter2';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Main name="Article 120" />
    <Main  name ="Article 450" /> */}
    {/* <Counter /> */}
    <Counter2 />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react'
import ReactDOM from 'react-dom/client'
import { MitosApp } from './MitosApp.jsx'

import './styles.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MitosApp />
    </BrowserRouter>
  </React.StrictMode>,
)

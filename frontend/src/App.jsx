import React from 'react';
import './App.css';
import { Theme } from './components/Theme'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes'

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Theme>
            <BrowserRouter>
                <ToastContainer />
                <Routes />
            </BrowserRouter>
        </Theme>
    );
}


export default App;

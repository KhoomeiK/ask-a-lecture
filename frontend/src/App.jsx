import React from 'react';
import './App.css';
import { Theme } from './components/Theme'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes'

import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'reactstrap';
import { jsx, Heading, Label, Box,} from 'theme-ui'

function App() {
    return (
        <Theme>
            <BrowserRouter>
                <ToastContainer />
                <Navbar className = 'navBar'>
                    <Heading>Niidl</Heading>
                </Navbar>
                <Routes />
            </BrowserRouter>
        </Theme>
    );
}


export default App;

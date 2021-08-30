import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, NavbarBrand} from "react-bootstrap";
import Leaderboard from './leaderboard';



function App() {  
    
    return (
    <>
    <Navbar bg = "dark" variant = "dark">
        <NavbarBrand>Leaderboard</NavbarBrand>
    </Navbar>
    <div className = "App">
        <header className = "App-header">
            <Leaderboard />
        </header>
    </div>
    </>
    );
}

export default App;


import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

import Home from './pages/home'
import About from './pages/about'
import Shop from './pages/shop'

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to='/' className='nav-link'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/about' className='nav-link'>About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/shop' className='nav-link'>Shop</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Switch>
                <div className='container-fluid'>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route exact path='/about'>
                    <About/>
                </Route>
                <Route exact path='/shop'>
                    <Shop/>
                </Route>
                </div>
            </Switch>
        </Router>
    );
}

export default App;

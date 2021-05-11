import config from './config'
import './App.css';
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';

import Home from './pages/home'
import Login from './pages/login'
import Shop from './pages/shop'
import Account from './pages/account'
import Register from './pages/register'
import Bag from './pages/bag'
import Review from './pages/review'
import Logo from './images/logo.png'
import ShoppingBag from './images/bag.png'
import axios from 'axios';


function App() {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [isLoggedIn, setIsLoggedIn] = useState('')


    useEffect(() => {

        setInterval(async () => {
            const response = await axios.post(config.baseUrl + '/api/shoppers/refresh', {
                refreshToken: localStorage.getItem('refreshToken')
            })
            localStorage.setItem('accessToken', response.data.accessToken)
        }, config.refresh_token_interval)


    })




    return (

        <Router>
            {/* <React.Fragment>
                <Switch> */}
            <Navbar color="light" fixed='top' light expand="md" id='navbar'>
                <NavbarBrand href="/"><img src={Logo} id='logo' alt='logo' /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar >
                    <Nav className='d-flex' id='navItemsContainer' navbar>
                        <NavItem style={{ display: isLoggedIn ? 'none' : 'block' }}>
                            <Link to='/login' className='nav-link'>Login</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/shop' className='nav-link'>Shop</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/register' className='nav-link'>Register</Link>
                        </NavItem>
                        <NavItem id='accountIcon' style={{ display: isLoggedIn ? 'block' : 'none' }}>
                            <Link to='/account' className='nav-link'>&#128100;</Link>
                        </NavItem>
                        <NavItem id='bagIcon'>
                            <Link to='/bag' className='nav-link'><img src={ShoppingBag} id='bag' alt='bagIcon' /></Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            {/* </Switch>
            </React.Fragment> */}
            <div className='container-fluid p-3'>
                <Switch>

                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path='/login'>
                        <Login userLoggedIn={user => setIsLoggedIn(user)} />
                    </Route>
                    <Route exact path='/shop'>
                        <Shop />
                    </Route>
                    <Route exact path='/account'>
                        <Account userLoggedIn={user => setIsLoggedIn(user)} />
                    </Route>
                    <Route exact path='/register'>
                        <Register />
                    </Route>
                    <Route exact path='/bag'>
                        <Bag />
                    </Route>
                    <Route exact path='/review'>
                        <Review />
                    </Route>

                </Switch>
            </div>
        </Router>
    )
}

export default App;

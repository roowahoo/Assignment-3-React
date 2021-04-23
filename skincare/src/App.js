
import './App.css';
import React, { useState } from 'react'
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

// import Home from './pages/home'
import Login from './pages/login'
import Shop from './pages/shop'
import Account from './pages/account'
import Register from './pages/register'
import Bag from './pages/bag'
import Review from './pages/review'

function App() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (

        <Router>
            <div>
                <Navbar color="light" light expand="md" id='navbar'>
                    <NavbarBrand href="/">The Skin Shop</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to='/login' className='nav-link'>Login</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/shop' className='nav-link'>Shop</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/register' className='nav-link'>Register</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/bag' className='nav-link'>Bag</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/account' className='nav-link'>Account</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
            <Switch>
                <div className='container-fluid p-3'>
                    {/* <Route exact path='/'>
                    <Home/>
                </Route> */}
                    <Route exact path='/login'>
                        <Login />
                    </Route>
                    <Route exact path='/shop'>
                        <Shop />
                    </Route>
                    <Route exact path='/account'>
                        <Account />
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
                </div>
            </Switch>
        </Router>
    );
}

export default App;

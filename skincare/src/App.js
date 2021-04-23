import config from './config'
import './App.css';
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
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
import Logo from './images/logo.png'
import ShoppingBag from './images/bag.png'
import axios from 'axios';


function App() {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const history = useHistory()

    const logout=async ()=>{
        localStorage.setItem('accessToken', null);
        localStorage.setItem('refreshToken', null);
        history.push('/shop')
    }

    useEffect(()=>{
        setInterval(async()=>{
            const response=await axios.post(config.baseUrl+'api/shoppers/refresh',{
                refreshToken:localStorage.getItem('refreshToken')
            })
            localStorage.setItem('accessToken',response.data.accessToken)
        },config.refresh_token_interval)
    })

    return (

        <Router>
            <div>
                <Switch>
                <Navbar color="light" light expand="md" id='navbar'>
                    <NavbarBrand href="/"><img src={Logo} id='logo'/></NavbarBrand>
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
                            <NavItem id='accountIcon'> 
                                <Link to='/account' className='nav-link'>&#128100;</Link>
                            </NavItem>
                            <NavItem id='bagIcon'>
                                <Link to='/bag' className='nav-link'><img src={ShoppingBag} id='bag'/></Link>
                            </NavItem>
                            <button onClick={logout}>Logout</button>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Switch>
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

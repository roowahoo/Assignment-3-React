
import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

// import Home from './pages/home'
import Login from './pages/login'
import About from './pages/about'
import Shop from './pages/shop'
import Account from './pages/account'
import Register from './pages/register'

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
                        {/* <li className="nav-item active">
                            <Link to='/' className='nav-link'>Home</Link>
                        </li> */}
                        <li className="nav-item active">
                            <Link to='/login' className='nav-link'>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/about' className='nav-link'>About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/shop' className='nav-link'>Shop</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/account' className='nav-link'>Account</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/register' className='nav-link'>Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Switch>
                <div className='container-fluid'>
                {/* <Route exact path='/'>
                    <Home/>
                </Route> */}
                <Route exact path='/login'>
                    <Login/>
                </Route>
                <Route exact path='/about'>
                    <About/>
                </Route>
                <Route exact path='/shop'>
                    <Shop/>
                </Route>
                <Route exact path='/account'>
                    <Account/>
                </Route>
                <Route exact path='/register'>
                    <Register/>
                </Route>
                </div>
            </Switch>
        </Router>
    );
}

export default App;

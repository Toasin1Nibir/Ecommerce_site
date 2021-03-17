import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import { UserContext } from '../../App';
import './Header.css'
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div class='header'>
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/Inventory">Inventory</Link>
                <button onClick={()=>setLoggedInUser({}) }>Sign out</button>
            </nav>
        </div>
    );
};

export default Header;
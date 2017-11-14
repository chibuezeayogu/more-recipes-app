import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { 
    Navbar, 
    NavItem, 
    Button, 
    Icon, 
    Modal, 
    Row, 
    Input, 
    Dropdown } from 'react-materialize';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import SignIn from './SignIn';

  
class NavBar extends Component{

    logout(e){
        e.preventDefault();
        localStorage.removeItem('jwtToken');
        this.props.SignOut();
        this.context.router.push('/');
    }
    
    render() {
        const token = localStorage.getItem("jwtToken");
        return (
            <div>   
                {!token ?
                    (<Navbar className="black" right>
                        <NavItem><Link to="/"><Icon>home</Icon></Link></NavItem>
                        <NavItem><Link to="/signin">Login</Link></NavItem>
                        <NavItem><Link to="/signup">Sign Up</Link></NavItem>
                    </Navbar>)
                    :
                    (<Navbar className="black" right>
                         <NavItem><Link to="/recipes"><Icon>home</Icon></Link></NavItem>
                            <NavItem><Link to="/addrecipe">Add Recipe</Link></NavItem>
                            {/* <NavItem>
                                <div class="chip">
                                <img src="images/yuna.jpg" alt="Contact Person">
                                        Jane Doe
                                </div>
                            </NavItem> */}
                            <NavItem><Link to="/" onClick={(e) => this.logout(e)}>Logout</Link></NavItem>
                            <Dropdown trigger={
                                        <Button>Drop me!</Button>
                                    }>
                                    <NavItem>one</NavItem>
                                    <NavItem>two</NavItem>
                                    <NavItem divider />
                                    <NavItem>three</NavItem>
                                </Dropdown>
                    </Navbar>)
                }
            </div>
        );
    }
        
}

NavBar.contextTypes = {
    router: React.PropTypes.object
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    className: PropTypes.string,
    copyrights: PropTypes.string,
};

export default NavBar;
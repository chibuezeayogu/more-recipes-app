import React, { Component } from 'react';
import { Row, Input, Icon, Textarea } from 'react-materialize';
import NavBar from  './NavBar';
import BottomFooter from  './Footer';
import './../js/recipes.js';
import './../js/script.js';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';

//import sass css
import '../Style/Style.scss';

class Main extends Component {
    constructor(){
        super();
        
    }

    
    render() {
        return (
            <div className="body-style">
                <header>
                    <NavBar {...this.props} />
                </header>
                <main className="main-style">
                    <div className="container-fluid">
                    {React.cloneElement(this.props.children, this.props)}
                    </div>
                </main>
                <footer>
                    <BottomFooter />
                </footer>
            </div>
        )
    }
}

export default Main;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Input, Icon, Button} from 'react-materialize';

class SignIn extends Component {
    
    
    componentWillUpdate(nextProps, nextState) {
        if (nextProps.userData.isAuthenticated) {
            this.context.router.push('/recipes');
        }
      }
    
    handleOnsubmit(e){
        e.preventDefault();
        const email = this.email.state.value;
        const password = this.password.state.value;
        this.props.login(email, password);
    }
    render() {
        return (
            <div className="login-form">
                <h4 className="center">Sign In</h4>
                {/* <h4 align="Center">{this.props.userData.message}</h4> */}
                <hr/>
                <form className="col l6 m8 s12 offset-l3 offset-m2" ref="SignInForm" onSubmit={(e) => this.handleOnsubmit(e)}>
                    <Row>
                        <Input s={12} label="Email" ref={(input) => {this.email = input}} classtName='validate' type='email' ><Icon>mail_outline</Icon></Input>
                        <Input s={12} label="Password" ref={(input) => {this.password=input}} type='password' ><Icon>vpn_key</Icon></Input>
                    </Row>
                    <Row>
                        <Button s={12} waves="light" className="right">Login<Icon>send</Icon></Button>
                    </Row>
                </form>
            </div>
        );
    }
}

SignIn.contextTypes = {
    router: React.PropTypes.object
};

SignIn.propTypes = {
    handleOnSubmit: PropTypes.func.isRequired,
    _addIngredients:  PropTypes.func.isRequired,
    _addProcedures:  PropTypes.func.isRequired,
    _handleImageChange:  PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    //className:
    };
    
export default SignIn;
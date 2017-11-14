import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Input, Icon, Textarea, Button, Col} from 'react-materialize';
//require('dotenv').config();
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

class SignUp extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            profileImageUrl: ''
        };
      }
   
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
        const formData = new FormData;
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        $.ajax({
            type: "POST",
            url: CLOUDINARY_URL,
            dataType: 'json',
            data: formData,
            contentType:false,
            processData: false,
            success: ((data) => {
                this.setState({profileImageUrl:data.secure_url});
            })
        });

        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

    handleOnsubmit(e) {
        e.preventDefault();
        const firstname = this.firstname.state.value;
        const lastname = this.lastname.state.value;
        const email = this.email.state.value;
        const password = this.password.state.value;
        const profileImageUrl = this.state.profileImageUrl;
        this.props.createAccount(firstname, lastname, email, password, profileImageUrl);
        this.refs.SignupForm.reset();
        this.setState({
            imagePreviewUrl: ' '
            });
    }

    render() {
        return (
            <div className="container">\
                <div className="col l6 m8 s12 offset-l6 offset-m4">
                <h4 className="center">Create Account</h4>
                <hr/>
                <form className="col l6 m8 s12 offset-l3 offset-m2" onSubmit={(e) => this.handleOnsubmit(e)} ref="SignupForm">
                    <Row>
                        <Input s={6} label="First Name" ref={(input) => {this.firstname=input}}  type='text'><Icon>account_circle</Icon></Input>
                        <Input s={6} label="Last Name" ref={(input) => {this.lastname=input}} type='text'><Icon>account_circle</Icon></Input>
                    </Row>
                    <Row>
                        <Input s={6} label="Email" ref={(input) => {this.email=input}} classtName='validate' type='email'><Icon>mail_outline</Icon></Input>
                        <Input s={6} label="Password" ref={(input) => {this.password=input}} type='password' ><Icon>vpn_key</Icon></Input>
                    </Row>
                    <Row>
                        <Input s={6} id="recipe"  name="file" type='file' ref={(input) => {this.file = input}} onChange={(e)=>this._handleImageChange(e)}><Icon>insert_photo</Icon></Input>
                        <Col s={6}><img className="responsive-img img-wh" src={this.state.imagePreviewUrl?this.state.imagePreviewUrl:""}/></Col>
                    </Row>
                    <hr />
                    <Row>
                        <Button waves='light' className='responsive-img circle right' alt="Profile preview">Sign Up<Icon right>send</Icon></Button> 
                    </Row>
                </form>  
                </div>
            </div>    
        );
    }
}

SignUp.propTypes = {
    handleOnSubmit: PropTypes.func.isRequired,
    _addIngredients:  PropTypes.func.isRequired,
    _addProcedures:  PropTypes.func.isRequired,
    _handleImageChange:  PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    //className:
    };

export default SignUp;
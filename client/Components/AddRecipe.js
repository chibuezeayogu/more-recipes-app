import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Input, Icon, Button, Col, Table} from 'react-materialize';
import axios from 'axios';
import Preloader from './Preloder';
//require('dotenv').config();


const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;


class AddRecipe extends Component{

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '', 
            ImageURL: '',
            arrIngredients:[],
            arrProcedures:[]
        };
      }

      componentWillMount(){
        // if(!this.props.userData.isAuthenticated){
        //     this.context.router.push('/sign');
        // }
        const token = localStorage.getItem('jwtToken');
        if(!token){
            this.context.router.push('/signin');
        }
    }
    //   componentWillUpdate(nextProps, nextState) {
    //     console.log(nextState.arrIngredients);
    // }
   
      _addIngredients(e){
          e.preventDefault();
          const ingredients = document.getElementById('ingredients').value;
          if(!ingredients){
                alert("Ingredients field is empty");
          }else {

            const newIngredients = this.state.arrIngredients.concat(ingredients);
                this.setState({
                    arrIngredients: newIngredients
                });
            }
      }

     



      _addProcedures(e){
        e.preventDefault();
        const procedures = document.getElementById('procedures').value;
        if(!procedures){
              alert("Ingredients field is empty");
        }else {

          const newProcedures = this.state.arrProcedures.concat(procedures);
              this.setState({
                    arrProcedures: newProcedures
              })
          }
        
          this.ingredient.state.reset();
      }

      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
        const formData = new FormData;
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
        // if (!file.type.match('image.*')){

        // }else{

        // }
        
        $.ajax({
            type: "POST",
            url: CLOUDINARY_URL,
            dataType: 'json',
            data: formData,
            contentType:false,
            processData: false,
            success: ((data) => {
                this.setState({ImageURL:data.secure_url});
            })
        });

        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        };
    
        reader.readAsDataURL(file);
      }
      
    handleOnsubmit(e) {
        e.preventDefault();
        const title = this.title.state.value;
        const description = this.description.state.value;
        const ingredients = this.ingredients.state.value;
        const procedures = this.procedures.state.value;
        const imageURL = this.state.ImageURL;
        this.props.addRecipe(title, description, ingredients, procedures, imageURL);
        this.refs.AddRecipeForm.reset();
        this.setState({
            imagePreviewUrl:''
        });
    }
    render() {
        // let {imagePreviewUrl} = this.state;
        // let $imagePreview = null;
        // if (imagePreviewUrl) {
        //   $imagePreview =(<img  class="responsive-img circle" src={imagePreviewUrl}/>);
        // } else {
        //   $imagePreview = " ";
        // }
       const  { arrIngredients, arrProcedures } = this.state;
        return (
            <div className="container"> 
                <h1 className="center">Add Recipe</h1>
                <hr/>
                <form encType="multipart/form-data" methos="post" className="col l6 m8 s12 offset-l8 offset-m6" onSubmit={(e) => this.handleOnsubmit(e)} ref="AddRecipeForm">
                    <Row>
                        <Input s={12} label="Title"  type='text' ref={(input)=> {this.title=input}}><Icon>short_text</Icon></Input>
                    </Row>
                    <Row s={8}>
                        <Input s={12} label="Description" className='validate' type='text' ref={(input) => {this.description = input}}><Icon>short_text</Icon></Input>
                    </Row>
                    <Row>
                        <Input s={12} label="Ingredients" id="ingredients" type='text' ref={(input) => {this.ingredients = input}}><Icon>list</Icon></Input>
                        <Button waves='light' className='right' onClick={(e)=> {this._addIngredients(e)}}>Add Ingredient</Button>
                    </Row>
                    <Row>
                        <Table className="striped">
                            <tbody>
                                {arrIngredients
                                    .map((ingredient, i) => 
                                        <tr>
                                            <td className="s10">
                                                <input id="ingredients" type='text' value={ingredient}></input>
                                            </td>
                                            <td className="s1 right"><Icon>delete</Icon></td>
                                            <td className="s1 right"><Icon>edit</Icon></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <Input s={12} label="Procedures" id="procedures" type='text' ref={(input) => {this.procedures = input}}><Icon>list</Icon></Input>
                        <Button waves='light' className='right' onClick={(e)=> {this._addProcedures(e)}}>Add Procedures</Button>
                    </Row>
                    <Row>
                        <Table className="striped">
                            <tbody>
                                {arrProcedures
                                    .map((procedures, i) => 
                                        <tr>
                                            <td className="s10">{procedures}</td>
                                            <td className="s1 right"><Icon>delete</Icon></td>
                                            <td className="s1 right"><Icon>edit</Icon></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <Input s={6} id="recipe"  name="file" type='file' ref={(input) => {this.file = input}}   onChange={(e)=>this._handleImageChange(e)}><Icon>insert_photo</Icon></Input>
                        <Col s={6} ><img className="responsive-img img-wh z-depth-3" src={this.state.imagePreviewUrl && this.state.ImageURL?this.state.imagePreviewUrl:"select image to preview"}/></Col>
                    </Row>
                    <br />
                    <Row>
                        <Button waves='light' className='right'><Icon right>send</Icon>Add</Button>
                    </Row>
                </form>
            </div>
        );
    }
}

AddRecipe.contextTypes = {
    router: React.PropTypes.object
};


AddRecipe.propTypes = {
handleOnSubmit: PropTypes.func.isRequired,
_addIngredients:  PropTypes.func.isRequired,
_addProcedures:  PropTypes.func.isRequired,
_handleImageChange:  PropTypes.func.isRequired,
addRecipe: PropTypes.func.isRequired,
};

export default AddRecipe;
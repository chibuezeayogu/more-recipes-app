import React, { Component } from 'react';
import { Row, Input, Icon, Textarea, Slider, Slide, Parallax } from 'react-materialize';
import NavBar from  './NavBar';
import Footer from  './Footer';


class Home extends Component {
    render() {
        return (
            <div>
                <Slider className="full-screen slide-margin-top">
                    <Slide
                        src="https://static.pexels.com/photos/161640/abstract-barbecue-barbeque-bbq-161640.jpeg"
                        title="More Recipes">
                        More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt.
                    </Slide>
                    <Slide
                        src="https://static.pexels.com/photos/213621/pexels-photo-213621.jpeg"
                        title="Easy to Setup"
                        placement="left">
                        npm install react-materialize.
                    </Slide>
                    <Slide
                        src="https://static.pexels.com/photos/51423/bun-chocolate-sweets-dessert-51423.jpeg"
                        title="Unlimited Oppurtunities"
                        placement="right">
                        Contribute and Help to Grow this Project.
                    </Slide>
                </Slider>
            </div>
        );
    }
}

export default Home;
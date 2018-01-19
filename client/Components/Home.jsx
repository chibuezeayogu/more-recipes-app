import React from 'react';

/**
 *
 * @description conastant function for landing page content
 *
 * @constant
 *
 * @returns {void}
 *
 */
const Home = () => (
  <div className="main">
    <div className="parallax-container">
      <div className="section no-pad-bot">
        <div className="container overlay-bg">
          <br /><br />
          <h1 className="center teal-text white-text">More Recipes</h1>
          <div className="row center">
            <h4 className="col s12 light white-text">
              More-Recipes provides a platform for users to share awesome and exciting recipe ideas they have invented or learnt...
            </h4>
          </div>
        </div>
      </div>
      <div className="parallax" >
        <img src="http://res.cloudinary.com/chibuezeayogu/image/upload/v1514924945/recipe1_agzmiy.jpg" alt="" className="responsive-img" />
      </div>
    </div>
    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col s12 m4">
            <div className="icon-block">
              <h5 className="center home-recipes-title">Healthy Thanksgiving Recipes</h5>
              <p className="light">
                <img src="http://res.cloudinary.com/chibuezeayogu/image/upload/v1515501870/tdjhjgqnpb6hppffgvf1.jpg" alt="" className="responsive-img circle" />
              </p>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="icon-block">
              <h5 className="center home-recipes-title">Chipotle Chilaquiles Recipe</h5>
              <p className="light">
                <img src="http://res.cloudinary.com/chibuezeayogu/image/upload/v1516351138/chipotle_m8kfnh.jpg" alt="" className="responsive-img circle" />
              </p>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="icon-block">
              <h5 className="center home-recipes-title">One-Pot Chicken Recipe</h5>
              <p className="light">
                <img src="http://res.cloudinary.com/chibuezeayogu/image/upload/v1516351164/one_pot_yx9qfs.jpg" alt="" className="responsive-img circle" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="parallax-container valign-wrapper bac">
      <div className="section no-pad-bot">
        <div className="container ">
          <div className="row center">
            <h4 className="header col s12 light white-text overlay-bg" style={{ minHeight: 150, paddingTop: 20 }}>
              Three kinds of leafy greens combine with mushrooms, garlic, leeks, mustard, and spices to form the base 
              for a baked-egg dish that's a bit like an omelette turned inside out. It's an ideal recipe...
            </h4>
          </div>
        </div>
      </div>
      <div className="parallax">
        <img src="http://res.cloudinary.com/chibuezeayogu/image/upload/v1514927987/recipe4_re5xt9.jpg" alt="Unsplashed background img 2" />
      </div>
    </div>
    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col s12 center">
            <h3><i className="mdi-content-send brown-text" /></h3>
            <h4 className="home-recipes-title"> Importance of sharing ideas...</h4>
            <p className="left-align light ideas-content">Ideas are never something you want to hold like you own them, they aren’t currency. Ideas are temporary and others will have the same ideas anyway. Connections are more important. Connecting ideas is where innovation comes from, and connecting with people makes those innovation come to life.
            Ideas aren’t important to hold on to, their only importance is in sharing them with others. Make yourself open and share with others what you have learnt.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;

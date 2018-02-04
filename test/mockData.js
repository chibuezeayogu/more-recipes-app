import dotenv from 'dotenv';
import reviewNotifierTemplate from '../server/helper/emailNotificationTemplates/reviewNotifierTemplate';

dotenv.config();

export const appLink = process.env.APP_LINK;

export const reciever ={
  firstName: 'Samuel',
};

export const recipe = {
  imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
  v1509851506/ubrx24qk7sgqhdz4q5pr.jpg`,
  title: 'Test recipe',
  id: 1
};

export const reviewer = {
  firstName: 'Smallshark',
  lastName: 'Kayode'
};

export const review = 'Nice revipe';

export const user = {
    email: 'chibuezeayogu@hotmail.com'
  }



export const formatedTemplate =
  `
  <h3>Hi, ${reciever.firstName}</h3>
  <div style="padding:10px; max-width:400px;margin:0 auto;">
    <div style="text-align:center;">
      <img src="http://res.cloudinary.com/chibuezeayogu/image/upload/v1516130489
        /yy3vdswodkvr3mj5lts1.jpg" style="max-width:50px;height:40px; 
        border-radius:20px" alt="site logo" />
      <h2 style="font-family:cursive; margin-bottom: 5px; letter-spacing: 3px;
        color:black">More Recipes</h2>
    </div>
    <div > 
      <img src=${recipe.imageUrl} alt="mail image" style="height:180px; 
        width: 100%" />
    </div>
    <div style="font-family:fantasy; line-height: 2.1rem; text-align:center; 
      background-color:rgb(240,255,255); padding: 15px 20px 25px 20px;
        margin-top: -19px;margin-bottom: -25px">
      <h3>Your Recipe: <span style="color:darkcyan; word-wrap:break-word">
        ${recipe.title}</span> has a new review</h3>
      <span style="border-left: 4px solid grey;display:block; font-size: 12px; 
        text-align:left; padding: 2px 10px;line-height: 1.5rem;">${review}</span>
      <span style="display:block;font-size: 13px;color: coral;">By: 
        ${reviewer.firstName} ${reviewer.lastName}</span>
      <a href=${appLink} target="blank"><button type="button" 
        style="width:50%; height: 40px; border-radius:5px; font-family:fantasy; 
        font-size: 14px;padding: 10px; margin-top: 20px;background-color:black; 
        color:white; cursor:pointer">Click To Launch App</button></a>
    </div>
    <div style="font-family:fantasy;color:white; text-align:center; background: 
      url('http://bit.ly/2DsVhmp') top center no-repeat;background-size: cover;
      padding: 16px;height: auto; width: auto">
      <small><small style="color:coral; padding-right:2px">&copy;2018</small> 
      More Recipes. All rights reserved.</small>
    </div>
  </div>
  `
;


export const mailOptions = {
  from: `"More-Recipes" <${process.env.AUTHORIZED_EMAIL}>`,
  to: user.email,
  subject: `${recipe.title} has a new Review`,
  html: reviewNotifierTemplate(recipe, reciever, review, reviewer, appLink)
};

export default mailOptions;
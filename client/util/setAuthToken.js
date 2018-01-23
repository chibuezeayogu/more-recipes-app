import axios from 'axios';

export const setAuthorizationToken = () => {
  const token =  localStorage.getItem('jwtToken');
 if (token) {
     axios.defaults.headers.common['Authorization']= `${token}`; 
 } else {
     delete axios.defaults.headers.common['Authorization'];
 }
};

export default setAuthorizationToken;

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




// const headers = () => ({
//   headers: {
//     'x-access-token': window.localStorage.jwtToken,
//     'authorization': window.localStorage.jwtToken
//   }
// });

// export default headers;

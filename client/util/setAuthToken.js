// import axios from 'axios';

// export const setAuthorizationToken = (token) => {
//  if (token) {
//      axios.defaults.headers.common['Authorization']= `${token}`; 
//  } else {
//      delete axios.defaults.headers.common['Authorization'];
//  }
// };



const headers = () => ({
  headers: {
    authorization: window.localStorage.jwtToken
  }
});

export default headers;

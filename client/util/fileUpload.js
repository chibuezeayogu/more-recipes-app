require('dotenv').config();

import axios from 'axios';
// import store from '../store';


const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;


const fileUpload = (state) => {
  const formData = new FormData();

  formData.append('file', state.image);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  delete axios.defaults.headers.common.Authorization;

  axios({
    url: CLOUDINARY_URL,
    method: 'POST',
    data: formData
  })
    .then(data => data.data.secure_url)
    .catch(() => {
      Materialize.toast('Error! Please try again', 4000, 'red');
    });
};

export default fileUpload;


require('dotenv').config();

const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

const imageToFormData = (image) => {
  const formData = new FormData();

  formData.append('file', image);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  return {
    url: CLOUDINARY_URL,
    method: 'POST',
    data: formData,
  }

};

export default imageToFormData;

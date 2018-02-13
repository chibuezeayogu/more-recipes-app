export default {
  registerUser: {
    firstName: 'Chibueze',
    lastName: 'Ayogu',
    email: 'new@hotmail.com',
    password: 'Password1.@',
    imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
    v1509613064/ll3ej6sclaadc2wcyjdf.jpg`
  },
  firstNameNotSupplied: {
    firstName: '',
    lastName: 'Ayogu',
    email: 'new@hotmail.com',
    password: '12345678',
    imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
    v1509613064/ll3ej6sclaadc2wcyjdf.jpg`
  },
  firstNameLengthError: {
    firstName: 'Ay',
    lastName: 'Ayogu',
    email: 'new@hotmail.com',
    password: '12345678',
    imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
    v1509613064/ll3ej6sclaadc2wcyjdf.jpg`
  },
  lastNameNotSupplied: {
    firstName: 'chibueze',
    lastName: '',
    email: 'new@hotmail.com',
    password: '12345678',
    imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
    v1509613064/ll3ej6sclaadc2wcyjdf.jpg`
  },
  lastNameLengthError: {
    firstName: 'chibueze',
    lastName: 'AB',
    email: 'new@hotmail.com',
    password: '12345678',
    imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
    v1509613064/ll3ej6sclaadc2wcyjdf.jpg`
  },
  emailNotSupplied: {
    firstName: 'chibueze',
    lastName: 'Ayogu',
    email: '',
    password: '12345678',
    imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
    v1509613064/ll3ej6sclaadc2wcyjdf.jpg`
  },
  invalidEmailError: {
    firstName: 'chibueze',
    lastName: 'Ayogu',
    email: 'newhotmail',
    password: '12345678',
    imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
    v1509613064/ll3ej6sclaadc2wcyjdf.jpg`
  },
  passwordNotSupplied: {
    firstName: 'chibueze',
    lastName: 'Ayogu',
    email: 'new@hotmail.com',
    password: '',
    imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
    v1509613064/ll3ej6sclaadc2wcyjdf.jpg`
  },
  passwordLengthError: {
    firstName: 'chibueze',
    lastName: 'Ayogu',
    email: 'new@hotmail.com',
    password: '123456',
    imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
    v1509613064/ll3ej6sclaadc2wcyjdf.jpg`
  },
  passwordVAlidationError: {
    firstName: 'chibueze',
    lastName: 'Ayogu',
    email: 'new@hotmail.com',
    password: 'Password1jjjkjk',
    imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
            v1509613064/ll3ej6sclaadc2wcyjdf.jpg`
  },
};

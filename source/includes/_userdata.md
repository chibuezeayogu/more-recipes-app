# Usersdata

## Signup User
>Sample structures responce:

```javascript
{
    "firstname": "Chibueze",
    "lastmane": "Ayogu",
    "email": "chibuezeayogu@hotmail.com",
    "password": "password"
}
```

>Response:


```javascript
{
    "message": "Registered successfully",
    "userInfo": {
        "id": 1,
        "firstname": "chibueze",
        "lastname": "Ayogu",
        "email": "chibuezeayogu@hotmail.com"
    }
}
```

### Request
- Endpoint: POST: `/api/users/signup`
- Requires: Authentication and Authorization
- Body `(application/json)`


### Response
- Status: `201: Created`
- Body `(application/json)`


## Signin User
>Sample structures responce:

```javascript
{
    "email": "chibuezeayogu@hotmail.com",
    "password": "password"
}
```

>Response:

```javascript
{
    "message": "Logged in Successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJpYXQiOjE1MDU1ODMzNzV9.BBH_iTw5cI7wlrb6oj9K8kLH_QXQm0tVmunnsjiB5V4"
}
```

### Request
- Endpoint: POST: `/api/users/signin`
- Body `(application/json)`


### Response
- Status: `200: OK`
- Body `(application/json)`
 

## Retrive User
>Sample structures responce:

>Response:

```javascript
{
    "userInfo": {
        "id": 2,
        "firstname": "Graphael",
        "lastname": "Akpan",
        "email": "andela2@hotmail.com"
    }
}
```

### Request
- Endpoint: GET: `/api/users`
- Requires: Authentication
- Body `(application/json)`


### Response
- Status: `200: OK`
- Body `(application/json)`


## Update User
>Sample structures responce:

```javascript
{
    "firstname": "Graphael",
    "lastname": "Akpan",
}
```

>Response:


```javascript
{
    "message": "Updated successfully",
    "userInfo": {
        "id": 2,
        "firstname": "Raphael",
        "lastname": "Akpan",
        "email": "andela2@hotmail.com"
    }
}
```
### Request
- Endpoint: PUT: `/api/users`
- Requires: Authentication
- Body `(application/json)`


### Response
- Status: `200: OK`
- Body `(application/json)`




# Recipes

## Add Recipe

>Request:

```javascript
{
    "title": "Healthy Sweet Potato and Bacon Breakfast Casserole"
    "description": "This casserole is a way to have healthy fats and delicious veggies without all the bad stuff.",
    "ingredients": "one teaspoon butter, six slices bacon, one large sweet potato, cubed",
    "procedures": "Cook bacon in a skillet on medium heat until golden brown, about eight minutes Remove and chop                       coarsely."
}
```

> Response:

```javascript
{
    "message": "Added successfully",
    "recipeInfo": {
        "id": 1,
        "title": "Healthy Sweet Potato and Bacon Breakfast Casserole",
        "description": "This casserole is a way to have healthy fats and delicious veggies without all the bad stuff.",
        "ingredients": "one teaspoon butter, six slices bacon, one large sweet potato, cubed",
        "procedures": "Cook bacon in a skillet on medium heat until golden brown, about eight minutes Remove and chop                   coarsely."
    }
}
```

### Request

- Endpoint: POST: `/api/v1/recipes`
- Requires: Authentication
- Body `(application/json)`


### Response

- Status: `201: Created`
- Body `(application/json)`


## Retrive Recipe

>Response:

```javascript
{   
    "recipeInfo": {
        "id": 1,
        "title": "Healthy Sweet Potato and Bacon Breakfast Casserole",
        "description": "This casserole is a way to have healthy fats and delicious veggies without all the bad stuff.",
        "ingredients": "one teaspoon butter, six slices bacon, one large sweet potato, cubed",
        "procedures": "Cook bacon in a skillet on medium heat until golden brown, about eight minutes Remove and chop                   coarsely.",
        "upvotes": 0,
        "downvotes": 0,
        "views": 0
    }
}
```

### Request
- Endpoint: GET: `/api/v1/recipes/1`
- Requires: Authentication
- Body `(application/json)`


### Response:

- Status: `200: OK`
- Body `(application/json)`


## Update Recipe

>Request:

```javascript
{
    "ingredients": "one teaspoon butter, six slices bacon, one large sweet potato, cubed",
}
```

>Response:

```javascript
{   
    "message": "Updated Successfully",
    "recipeInfo": {
        "id": 1,
        "title": "Healthy Sweet Potato and Bacon Breakfast Casserole",
        "description": "This casserole is a way to have healthy fats and delicious veggies without all the bad stuff.",
        "ingredients": "1 teaspoon butter, 6 slices bacon, 1 large sweet potato",
        "procedures": "Cook bacon in a skillet on medium heat until golden brown, about eight minutes Remove and chop coarsely.",
        "upvotes": 0,
        "downvotes": 0,
        "views": 0
    }
}
```

### Request

- Endpoint: PUT: `/api/v1/recipes/1`
- Requires: Authentication
- Body `(application/json)`


### Response

- Status: `200: OK`
- Body `(application/json)`


## Delete Recipe

>Response

```javascript
{
    "message": "Deleted Seccuessfully"
}
```

### Request

- Endpoint: DELETE: `/api/v1/recipes/1`
- Requires: Authentication
- Body `(application/json)`


### Response

- Status: `200: OK`
- Body `(application/json)`

## GET All Recipe

>Response

```javascript
[
    {
        "id": 2,
        "title": "Healthy Sweet Potato and Bacon Breakfast Casserole",
        "description": "This casserole is a way to have healthy fats and delicious veggies without all the bad stuff.",
        "ingredients": "1 teaspoon butter, 6 slices bacon, 1 large sweet potato",
        "procedures": "Cook bacon in a skillet on medium heat until golden brown, about eight minutes Remove and chop coarsely.",
        "upvotes": 0,
        "downvotes": 0,
        "views": 0,
        "addedBy": 1,
        "createdAt": "2017-09-17T09:06:49.519Z",
        "updatedAt": "2017-09-17T09:06:49.519Z"
    },
    {
        "id": 3,
        "title": "Best Steak Marinade in Existence",
        "description": "This is a family recipe that has been developed only over the last 5 years. In this short time it's made me famous in our close circle, but until now I've never shared it with anyone",
        "ingredients": "1/3 cup soy sauce, 1/2 cup olive oil",
        "procedures": "Place the soy sauce, olive oil, lemon juice, Worcestershire sauce, garlic powder, basil, parsley, and pepper in a blender. Add hot pepper sauce and garlic, if desired. Blend on high speed for 30 seconds until thoroughly mixed.",
        "upvotes": 0,
        "downvotes": 0,
        "views": 0,
        "addedBy": 1,
        "createdAt": "2017-09-17T10:13:17.786Z",
        "updatedAt": "2017-09-17T10:13:17.786Z"
    }
]
```

### Request

- Endpoint: GET: `/api/v1/recipes`
- Requires: Authentication
- Body `(application/json)`


### Response

- Status: `200: OK`
- Body `(application/json)`
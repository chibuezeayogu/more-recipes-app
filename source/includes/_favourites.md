# Favourite

## Upvote Recipe

> Response

```javascript
{
    "message": "Successfully added to you favourite"
}
```

### Request
- Endpoint: PUT: `/api/v1/users/:id/add`
- Requires: Authentication
- Body `(application/json)`


### Response
- Status: `200: Created`
- Body `(application/json)`


## Downvote Recipe

>Response

```javascript
{
    "message": "Recipe has been removed from your Favourite"
}
```
### Request
- Endpoint: PUT: `/api/v1/users/:id/remove`
- Requires: Authentication
- Body `(application/json)`


### Response
- Status: `200: OK`
- Body `(application/json)`



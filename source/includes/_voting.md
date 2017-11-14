# Voting

## Upvote Recipe

> Response

```javascript
{
    "message": "Successfully upvoted"
}
```
### Request
- Endpoint: POST: `/api/v1/recipes/2/upvote`
- Requires: Authentication
- Body `(application/json)`


### Response
- Status: `200: Created`
- Body `(application/json)`


## Downvote Recipe

>Response

```javascript
{
    "message": "Successfully downvoted"
}
```
### Request
- Endpoint: GET: `/api/v1/recipes/2/downvote`
- Requires: Authentication
- Body `(application/json)`


### Response
- Status: `200: OK`
- Body `(application/json)`



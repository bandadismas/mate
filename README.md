# Mate
Mate is a social networking site where users post their thoughts and opinions. Other users can like, dislike and/or comment on those posts.

The project is made using the MERN stack.

### Authentication Header:

`Authorization: Token jwt.token.here`

## JSON Objects returned by API:

Make sure the right content type like `Content-Type: application/json; charset=utf-8` is correctly returned.

## Endpoints:
The endpoints are in three groups; users, posts, and comments.

## Users

### Authentication:

`POST /login`

Example request body:
```JSON
{
    "email": "john@doe.com",
    "password": "johndoe"
}
```

No authentication required, returns a User

Required fields: `email`, `password`


### Registration:

`POST /signup`

Example request body:
```JSON
{
    "email": "john@doe.com",
    "password": "johndoe"
}
```

No authentication required, returns a User

Required fields: `email`, `password`

### Get All Users

`GET /users`

No authentication required, returns a all users

### Create Profile

`POST /userDetails`

Authentication required, creates a user profile


### Get Profile

`GET /userDetails`

No authentication required, returns a user profile

## Posts

### Get Posts

`GET /`

No authentication required, returns all posts

### Get A Posts

`GET /getPost/:id`

No authentication required, returns a particular post

### Create Post

`POST /createPost`

Authentication required, creates a post

### Edit Post

`PATCH /editPost/:id`

Authentication required, edits a post

### Delete Post

`DELETE /deletePost/:id`

Authentication required, deletes a post

### Like Post

`POST /likePost/:id`

Authentication required, likes a post

### Unlike Post

`POST /likePost/:id`

Authentication required, unlikes a post


### Dislike Post

`POST /dislikePost/:id`

Authentication required, dislikes a post

### Undislike Post

`POST /dislikePost/:id`

Authentication required, undislikes a post

## Comments

### Comment

`POST /comment/:id`

Authentication required, comments on a post

### Edit Comment

`PATCH /editComment/:id`

Authentication required, edits a comments

### Delete Comment

`POST /deleteComment/:id`

Authentication required, deletes a comments

### Like Comment
`POST /likeComment/:id`

Authentication required, likes a comments

### Unlike Comment
`POST /likeComment/:id`

Authentication required, unlikes a comments

### Dislike Comment
`POST /dislikeComment/:id`

Authentication required, dislikes a comments

### Undislike Comment
`POST /dislikeComment/:id`

Authentication required, undislikes a comments

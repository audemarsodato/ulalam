

## API Endpoints - version 1

``` /api/v1 ```

**Routes:**
### ulams
- ```GET /api/v1/ulams/from-following```, get ulams of a users' followings (userId in authentication, following user id array get by querying and no need to be passed from the frontend)
- ```GET /api/v1/ulams/earned-specialtie ```, get ulam that is in a user's earned specialties array of ulams
- ```GET /api/v1/ulams?ingredients={ingredients seperated only by a comma with no space}```, get ulams that match the ingredients from query parameters
- ```POST /api/v1/ulams```, create an ulam (vaiationOf null) and create an ulam's variation (passing the ulam id to the variationOf)
- ```PATCH /api/v1/ulams/:ulamId```, update  users' ulam values
- ```DELETE /api/v1/ulams/:ulamId```, delete a user's ulam
- ```PATCH /api/v1/ulams/:ulamId/like```, like an ulam, add the current user's id to the ulam's likedBy array
- ```DELETE /api/v1/ulams/:ulamId/like```, unlike an ulam, remove the user's id to the currents ulam's likedBy array
- ```PATCH /api/v1/ulams/:ulamId/bookmark```, bookmark an ulam, add the current user's id to the current ulams bookmarkedBy array
- ```DELETE /api/v1/ulams/:ulamId/bookmark```, unbookmark an ulam, remove the current user's id to the current ulams bookmarkedBy array
- ```POST /api/v1/ulams/:ulamId/comments```, post a comment to an ulam
- ```GET /api/v1/ulams/:ulamId/comments```, get all comments of an ulam
- out-scope:
  - delete a users' own comment from an ulam

### auth
- ```POST /api/v1/users/signup```, sign up or create an account for a user
- ```POST /api/v1/users/login```, log user in

### users
- ```PATCH /api/v1/users/me```, update the current user's account details (get userId from authentication)
- ```GET /api/v1/users/:userId```, get a users profile details, get a single user
- ```GET /api/v1/users?username={username}```, get all users with matching username, search users using a username
- ```POST /api/v1/users/:userId/follow```, follow a user, this adds the usersId to the current user's followings
- ```DELETE /api/v1/users/:userId/follow```, unfollow a user, remove a user from the current users followings (updates 2 user documents, the follower and followed, logic in services)
- ```GET /api/v1/users/:userId/ulams```, get a certain user's published ulams

### mealplans
- ```POST /api/v1/mealplans```, creat a mealplan
- ```GET /api/v1/mealplans```, get mealplans starting from the current day upto the next 7 days
- ```PATCH /api/v1/mealplans/:mealplanId```, update details of a mealplan
- ```DELETE /api/v1/mealplans/:mealplanId```, remove a mealplan

### cooking-logs
- ```GET /api/v1/cooking-logs```, get all cooking history of a user (userId is passed in authentication) (home page you cooked section, history page)
- ```POST /api/v1/cooking-logs```, record a cooking session (mealtime is derived from mealtime timezones)

### Action event - Api call

like ulam - PATCH /api/v1/ulams/:ulamId/like
remove like ulam - DELETE /api/v1/ulams/:ulamId/like
bookmark - PATCH /api/v1/ulams/:ulamId/bookmark
remove bookmark - DELETE /api/v1/ulams/:ulamId/bookmark
follow - PATCH /api/v1/users/:userId/follow
unfollow - DELETE /api/v1/users/:userId/follow

## Structure
/src
    server.js
    /models
    /middlewares
    /sevices, stores the applications business logic
    /v1
        /middlewares, version specific
        /routes
        /controllers, handles http request and responses


## API Endpoints - version 1.1
### Scope
- Implement pagination
- Add api rate limiter
- Add check in record session service in cooking logs to verify if the ulams cooked count is syncronized with cooking logs 
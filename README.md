# Dusty Blog
A simple blog app that probably won't get much love as I'm building it to practice.

## How To

You'll need to setup a .env file for your database connection

- Clone the repo
- `cd` into the cloned repo directory
- Run `npm i`
- Run `npm start`
- The server should now be running on port 3000
- Go to `localhost:3000` in your browser

## Current Features

- Uses EJS templating for its views
- Supports Basic Authentication
  - Supports Creating a new user and logging in / logging out
- CRUD operations supported
  - Posts can be created
  - Posts can be edited
  - Posts can be deleted
  - Posts can be viewed
- Full DB support
- Posts support a title, content, and author

## Ideas

- Support Markdown for posts
  - Then render that markdown for formatting
- Create a new posts page instead of it sharing a page with recent posts
- Add statistics to a users profile
- View other users profiles
- Setup Redis for express session
- Add Filtering
- Add tagging system
- Add dates to posts
- Make login stick across instances (making session work with redis will probably fix this)
- Add ability to like posts
- Create automated DB deploy script
- Create Permissions/Roles for admins
- And much more!

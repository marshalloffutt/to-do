# Get Things Done: A To-Do app

### Description
This is a basic to-do app, where a user can log in with Google authentication, and then create, edit, and delete tasks. Once a task is complete, the user can click the checkbox next to the task name, the task will then be moved to the Completed Tasks area further down the page. This app makes full use of CRUD axios methods with Firebase.

![mainview](./screenshots/snapshot1.png)
![editview](./screenshots/snapshot2.png)
![updateview](./screenshots/snapshot3.png)

### Technologies Used
* Webpack
* Axios
* Firebase
* ES6 Modules
* SASS
* Bootstrap

### How to run this app
To run this app you will need a firebase account and a new project.

Configure Firebase
In the db folder, rename apiKeys.json.example to apiKeys.json.
Add in the config object from your firebase project.

1.  Serving up the json data
* globally install json-server: `npm install -g json-server`
* use npm to run the json: `npm run data`

2.  Serve up the app
* At the root of the project: `npm install`
* `npm start`

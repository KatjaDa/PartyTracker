# Guide for setup
First, make sure you have node.js and npm installed globally.
Then proceed to next steps, which you can do in your code editors command line. 
You will need either mariaDB or MySQL database for this. We have used a local database for this project.
### Setup for all dependencies   
Please following commands to your editors command line:

```shell
npm init
npm install
npm install --save-dev nodemon
npm install concurrently --save-dev
```
### Setup for database
You will need to create a connection.js file into api folder. Insert following code to that file, with your own username and password.

### Javascript
```js
module.exports = {
    credentials: {
        host: "localhost",
        user: "YourUserName",
        password: "YourPassWord",
        database: "partyevents"
    }
}
```
In vue-app/src/sql folder you can find SQL queries that you can use to set up database and some base information.   
You will need to run these commands manually, either in commandline or HeidiSQL etc. program you use for your database management. 

### Running the servers   
You can run both servers by giving a command:
```shell
npm start
```
You should be in the main folder (example PartyTracker) when giving the command.   
Command will start Vue server in port 8080 and backend server in port 8081.   

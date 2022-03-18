# Node API Exercise

Build a web api to publish and read course results using nodejs and mongodb.

---
## Requirements

For development, you will only need Node.js, a node global package npm and MongoDb installed in your environement.

### A top-level directory layout
 ``` bash.
    ├── diagrams                  #  Have documentation files
    ├── src                       # Source files 
        ├── api                 
            ├── controller              #  Used in applying validations and calling servcie
            ├── middlewares             #  Auth and schema  validation layer
            ├── routes.js  
        ├── config               # Configration 
        ├── model                # DataBase Models (MongoDB)
        ├── service              # Have the logic
        ├── utilit              
        ├── app.js
    ├── uploads                  # Courses csv files
    ├── README.md
    ├── server.js                #  Runing thre server
```
### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0
    
### MongoDB
 - #### MongoDb installation on Windows

  Just go on [official MongoDB website](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) and download the installer.
 
## Install
    $ git clone https://github.com/khaledesmail/course
    $ cd course
    $ npm install

## Prerequisite of running the project

    $ Run MongoDB
    $ C:\path\to\mongodb\bin\mongod.exe
## Running the project

    $ npm start

## Required requests before using the APPs which require authentication

1- /signup
```bash
curl --location --request POST 'localhost:8080/rest/api/v1/profile/signup' \
--header 'Content-Type: application/json' \
--header 'correlationID: 9d4565448f269aaa3d663dd2ee3c27aa' \
--data-raw '{
            "firstName": "khaled",
            "lastName": "email",
            "email": "khaled.esmail@gmail.com",
            "password": "12345678",
            "userName": "khaled22"
}'
```
2- /signin
```bash
curl --location --request POST 'localhost:8080/rest/api/v1/profile/signin' \
--header 'Content-Type: application/json' \
--header 'correlationID: 9d4565448f269aaa3d663dd2ee3c27aa' \
--data-raw '{
            "password": "12345678",
            "userName": "khaled22"
}'
```
  Then you will use token in the signin response in APIs whihc required authentication.
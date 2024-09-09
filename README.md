# UserManagement

## How to run project

you will find an ENVEXAMPLE file including the environment variable template if you want to put your own unique values just make .env file and put some variables like the template but every variable has a default value in the config file to prevent any errors if you don't assign any variable.

### option 1: run mssql using docker
if you don't have mssql installed in your device you can run `docker-compose up -d` this will pull and create the mssql image.

then you will have to run \
`docker exec -it sql_server /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P root@123 -Q "CREATE DATABASE User_Management;" && docker exec -it sql_server /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P root@123 -Q "CREATE DATABASE User_Management_Test;"` \
to create both `User_Management and User_Management_Test tables`.

### option 2: use your local mssql
if you have mssql installed then all you have to do is change `.env` file such that it meets your localhost credentials and also you have to create the two tables `User_Management, User_Management_Test`.

### run node project
after configuring the project use `npm install` then you can use `npm test` to run testcases if all ok then run `npm run migrate up` then `npm start` this will create the required user table if not exists and run the project on the specified port.

### testcase documentation

#### unit tests
in this part i create an example user in the database before all test cases then test the following for the Users model:
- the create(register) function works.
- that findByUsername works.
- that findById works.
- check if i provide wrong username then what will happen to findByUsername.
- check if i provide invalid id to findById.
i then delete all data in the table after finishing to not effect other spec files.

#### integrity tests
as the previous one i create a test user before all the testcases then test the following for the Users model:
- check if the created user have the right data for every column and the password part is hashed.
- check if findByUsername return expected columns and data.
- check if findById returns the correct data.
finally i also delete all rows here to not effect any other spec files.

#### endpoint test
these tests see if there is no api errors in the previous cases we mocked the server and only tested the functions now we testing the server.
the before the tests i prepere a user and a bearer token for the upcoming tests then i test as follows:
- check if the register api works fine and returns 201.
- check if registering the same username is not allowed.
- check that user can't register user with missing data.
- check that /api/users/:id works when providing a correct bearer token.
- check that /api/users/:id don't return rows if the id is invalid.
- check that /api/users/:id don't work without a bearer token.
- check the login function works and returns status 200 and the token in the response body.
- check that login with wrong credentials is not allowed.
- check that login with missing data is not allowed.

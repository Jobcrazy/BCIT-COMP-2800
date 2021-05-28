## Introduction
Bike2Go allows a user to rent a bike from other users. The user pays a deposit upon renting a bike, and pays a small fee upon returning the bike.

## Development team
* **Backend Developer**: James, Joon
* **Backend Developer**: Victor, Hyerim

## How this repo is organized
This project is divided into two parts: the frontend and the backend. They communicate with each other using JSON, and the source code is in the backend folder and the frontend folder respectively.
* **Backend**: accepts and processes requests from the frontend
* **Frontend**: interacts with the end user, and communicates with the backend

## 3rd party packages (Node.js dependencies)
### Backend
*   config: 3.3.6,
*   cookie-parser: 1.4.4,
*   debug: 2.6.9,
*   express: 4.16.1,
*   express-session: 1.17.1,
*   formidable: 1.2.2,
*   morgan: 1.9.1,
*   mysql: 2.18.1,
*   request: 2.88.2 
### Frontend
*   axios: 0.21.1,
*   vant: 2.12.15,
*   vue: 2.5.2,
*   vue-router: 3.0.1

## How to assemble the development environment
1. Download and install [Node.js (10.19.0 or above)](https://nodejs.org/en/)
2. Download and install [MySQL (5.7.22 or above)](https://dev.mysql.com/downloads/mysql/)
3. Create a database named "bike_database" in MySQL
4. Create a user using the following credential:
   ```
   Host: localhost
   Username: bike
   Password: jIPEyvTVBGPu7vfA  
   Privilege: Grant all access on database bike_database
   ```
5. Execute the following commands in a CLI:
   ```
   cd /path/to/backend/
   npm install
   npm start
   ```
   the *3rd party dependencies* will be automatically installed, and the **backend** application is running now
6. Execute the following commands in a new CLI:
   ```
   cd /path/to/frontend/
   npm install
   npm start
   ```
   the *3rd party dependencies* will be automatically installed, and the **frontend** application is running now
7. Launch Chrome and visit: [http://localhost:8080](http://localhost:8080)
8. To test the backend, you could use the files in folder */path/to/backend/test*.
9. You could click [this link](./backend/README.md) to see the API document
10. To test the frontend, you could use the files in folder */path/to/frontend/test*.
11. You could click [this link](https://docs.google.com/spreadsheets/d/12_cmsn8nUr215SDaN_vIMbE8naaaJEoyxvRK_JW4Y3Y/edit#gid=0) to see the test plan
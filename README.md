## Introduction
Bike2Go allows a user to rent a bike from other users. The user pays a deposit upon renting a bike, and pays a small fee upon returning the bike.

## Development team
* **Backend Developer**: James, Joon
* **Backend Developer**: Victor, Hyerim

## How this repo is organized
This project is divided into two parts: the frontend and the backend. They communicate with each other using JSON, and the source code is in the backend folder and the frontend folder respectively.
* **Backend**: accept and process requests from the frontend
* **Frontend**: interact with the end user, communicate with the backend

## How to assemble the development environment
1. Download and install [Node.js (10.19.0 or above)](https://nodejs.org/en/)
2. Download and install [MySQL (5.7.22 or above)](https://dev.mysql.com/downloads/mysql/)
3. Create a database names "bike_database" in MySQL
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
10. You could click [this link](https://docs.google.com/spreadsheets/d/12_cmsn8nUr215SDaN_vIMbE8naaaJEoyxvRK_JW4Y3Y/edit#gid=0) to see the test plan
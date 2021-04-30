## Introduction
Backend source code for BCIT COMP 2800 (Downtown Campus Team 8).

## Develop Environment
* **IDE**: *Webstorm 2018.3.5*
* **Runtime**: *Node.js 10.19.0*

## Deployment
1. Install and config Node.js (10.19.0 or above)
2. Launch CLI and run commands below:
    ```
    cd /your/path/to/BCIT-COMP-2800/backend/
    npm install
    node ./bin/www
    ```
3. Launch Chrome and visit: [http://127.0.0.1:3000](http://127.0.0.1:3000)

## REST API
### 1. Login with Google ID
* **URI**: /api/user/login
* **Method**: POST

| Name | Description |
| ---- |---- |
| gid  | Google ID |
| fname  | Full Name |
| gname  | Given Name |
| xname  | Family Name |
| head  | Head Image URI |
| email | Email |

* **Return Value**

| Name | Description |
| ---- |---- |
| code  | 0: success |
| msg  | Error Message |

### 2. Get the Current User's Information
* **URI**: /api/user/profile
* **Method**: POST

* **Return Value**
```
{
    "code": 0,
    "data": [
        {
            "fname": "James Liu",
            "gname": "James",
            "xname": "Liu",
            "head": "https://lh5.googleusercontent.com/-WmSZDdMVzsg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmhRt5YTKrH8CXq2eFAEeFcnis2JA/s96-c/photo.jpg"
        }
    ]
}
```
| Name | Description |
| ---- |---- |
| code  | 0: success |
| data  | See description below |
| fname  | Full Name |
| gname  | Given Name |
| xname  | Family Name |
| head  | Head Image URI |
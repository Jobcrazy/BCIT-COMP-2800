## Introduction

Backend source code for BCIT COMP 2800 (Downtown Campus Team 8).

## Develop Environment

- **IDE**: _Webstorm 2018.3.5_
- **Runtime**: _Node.js 10.19.0_

## Deployment

1. Install and config Node.js (10.19.0 or above)
2. Launch CLI and run commands below:
   ```
   cd /your/path/to/BCIT-COMP-2800/backend/
   npm install
   node ./bin/www
   ```
3. Launch Chrome and visit: [http://127.0.0.1:3000](http://127.0.0.1:3000)

---

## REST API

### 1. Login with Google ID

- **URI**: /api/user/login
- **Method**: POST

| Name  | Description    |
| ----- | -------------- |
| gid   | Google ID      |
| fname | Full Name      |
| gname | Given Name     |
| xname | Family Name    |
| head  | Head Image URI |
| email | Email          |

- **Return Value**

| Name | Description   |
| ---- | ------------- |
| code | 0: success    |
| msg  | Error Message |

---

### 2. Get the Current User's Information

- **URI**: /api/user/profile
- **Method**: POST

- **Return Value**

| Name  | Description           |
| ----- | --------------------- |
| code  | 0: success            |
| data  | See description below |
| fname | Full Name             |
| gname | Given Name            |
| xname | Family Name           |
| head  | Head Image URI        |

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

---

### 3. Post advertisement

- **URI**: /api/bike/add
- **Method**: POST

  | Name | Description | 
  | ---- | ---- | 
  | title |  Advertisement title |
  | description | Advertisement description | 
  | location.lat | Bike's location latitude | 
  | location.long | Bike's location longitude| 
  | deposit | Bike's deposit | 
  | price | Bike's rental fee |

- **Return Value**

| Name | Description |
| ---- | ----------- |
| code | 0: success  |

```
{
    "code": 0,
    "message":
}
```

### 4. Find Near Bikes

- **URI**: /api/bike/find
- **Method**: POST

| Name | Description | 
| ---- |---- | 
| location | Current location | 
| distance |  Limit distance |

- **Return Value**

| Name | Description |
| ---- | ----------- |
| code | 0: success  |
| data | See description below | 
| id  | Post ID |
| location | Bike Location      |

```
{
    "code": 0,
    "data": [
        {
            id: 3
            location: {
                    longitude: 33.11,
                    latitude: 44.21
                }
        }
    ]
}
```

---

### 5. Find Lists that the user posted

- **URI**: /api/bike/list
- **Method**: POST

- **Return Value**

| Name | Description |
| ---- | ----------- |
| code | 0: success  |
| data | See description below | 
| title  | Advertisement title |
| description | Advertisement description |
| photos | Photo IDs |
| price | Bike Rental Fee |

```
{
    "code": 0,
    "data": [
        {
            title: "Joonior's Bike",
            description: "The Best Bike in Vancouver",
            photos: [1,2,3,4,5],
            price: 12.99
        }
    ]
}
```
---
### 6. Remove Advertisement that the user posted

- **URI**: /api/bike/remove
- **Method**: POST

| Name | Description | 
| ---- |---- | 
| bid | Advertisement ID |

- **Return Value**

| Name | Description |
| ---- | ----------- |
| code | 0: success  |


```
{
    "code": 0,
}
```
---
### 7. Find Bike Advertisement and The Owner

- **URI**: /api/bike/detail
- **Method**: POST

| Name | Description |
| ---- | ----------- |
| bid | Advertisement ID  |

- **Return Value**

| Name | Description |
| ---- | ----------- |
| code | 0: success  | 
| data | See description below |
| title  | Advertisement title |
| description | Advertisement description |
| photos | Photo IDs |
| deposit | Bike Deposit Fee |
| price | Bike Rental Fee |
| fname | Full owner's name |
| head | Owner's Head Image URL |
| email | Owner's Email |

```
{
    "code": 0,
    "data": [
        {
            title: "Joonior's Bike",
            description: "The Best Bike in Vancouver",
            photos: [1,2,3,4,5],
            deposit: 100.99,
            price: 12.99,
            fname: "Joonior",
            head: "https://lh5.googleusercontent.com/-WmSZDdMVzsg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmhRt5YTKrH8CXq2eFAEeFcnis2JA/s96-c/photo.jpg",
            email: "JooniorProgrammer@gmail.com" 
        }
    ]
}
```
---
### 7. Add a Bookmark

- **URI**: /api/bookmark/add
- **Method**: POST

| Name | Description |
| ---- | ----------- |
| bid | Advertisement ID  |

- **Return Value**

| Name | Description |
| ---- | ----------- |
| code | 0: success  |

```
{
    "code": 0,
}
```
---
### 7. Remove a Bookmark

- **URI**: /api/bookmark/remove
- **Method**: POST

| Name | Description |
| ---- | ----------- |
| bid | Advertisement ID  |

- **Return Value**

| Name | Description |
| ---- | ----------- |
| code | 0: success  |

```
{
    "code": 0,
}
```

---
### 7. Find Bookmarks

- **URI**: /api/bookmark/find
- **Method**: POST

- **Return Value**

| Name | Description |
| ---- | ----------- |
| code | 0: success  |
| data | See desription below |
| id | Advertisement ID  |
| title | Advertisement title  |
| description | Advertisement description  |
| photos | Photo IDs  |
| price | Bike Rental Fee |

```
{
    "code": 0,
    "data": [
    {
      id: 6,
      title: "Joonior's Bike",
      description: "The best bike in Vancouver!",
      photos: [1,2,3,4,5],
      price: 12.99
    }
  ]
}
```

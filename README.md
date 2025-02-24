# API Users

## Overview
The API allows users to retrieve all of the users of the application in micro service through a REST architecture. This API will be mainly used for registed Accounts.

It will also create own users to recover data to the platform but is in no way related to the users collected via the crawling of profiles on Social Networks.

### [POST] Create user
Allows the creation of a single user.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

* HTTP request : POST → user/create

#### Parameters :
```javascript
{
  'firstname': String, // Optional
  'lastname': Number, // Optional
  'age': Number, // Optional
  'city': String // Optional
}
```

#### Response :
```javascript
  {
    _id: Object_ID,
    firstname: String,
    lastname: String,
    age: Number,
    city: String
  }
```

### [POST] Show user
Show an user by id.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

* HTTP request : GET → user/show/:id

#### Parameters :
```javascript
{
  id: String // Required
}
```

#### Response :
```javascript
  {
    _id: Object_ID,
    firstname: String,
    lastname: String,
    age: Number,
    city: String
  }
```

### Requirements
* node 16 (version 16 or higher)
* npm or yarn
* git
* mongodb (please configure config.js for link mongodb)

### Configure MongoDB
To set up MongoDB using MongoDB Atlas (cloud-based MongoDB), follow these steps:
* Create an Account on MongoDB Atlas: Visit MongoDB Atlas and create a free account.
* Create a Cluster:
  Once logged in, create a new cluster by selecting the "Free Tier" plan.
  Choose the cloud provider and region closest to you.
* Create a Database User:
  In your MongoDB Atlas dashboard, navigate to Database Access.
  Create a new user by specifying a username, password, and required permissions (e.g., Read/Write access).
* Whitelist Your IP Address:
  In the Network Access section, click Add IP Address.
  To allow connections from any IP, you can click Allow Access from Anywhere (0.0.0.0/0) or add your specific IP.
* Get your MongoDB connection string: 
  Navigate to the Clusters section, click on Connect, and then select Connect Your Application.
  Copy the connection string, which will look something like:
  mongodb+srv://<username>:<password>@cluster0.lqo2i.mongodb.net/<dbname>

Replace <username>, <password>, and <dbname> with your actual MongoDB username, password, and database name.

### Configuration
In the project, Create a config.js file in the project folder and add your MongoDB connection string there:

module.exports = {
  development: {
    type: 'development',
    port: 3000,
    mongodb: 'mongodb+srv://<username>:<password>@cluster0.lqo2i.mongodb.net/<dbname>'
  },
  production: {
    type: 'production',
    port: 3000,
    mongodb: 'mongodb+srv://<username>:<password>@cluster0.lqo2i.mongodb.net/<dbname>'
  }
}

### Install
After cloning the repository, navigate to the project folder and install the dependencies:
```yarn install```
If you are using npm instead of yarn, use:
```npm install```

### Production mode
To run the API in production mode, use:
```npm run prod``` or if you're using Yarn: ```yarn prod``` 

### Dev mode
To run the API in development mode (for local testing), use:
``` npm run dev``` or if you're using Yarn: ``` yarn dev``` 

### Install Postman
* Download Postman.
* Install the app and open it.
* Use Postman to test the API by sending HTTP requests. Here's how you can test:
  POST /user/create: Create a new user (using the parameters defined above).
  GET /user/show/:id: Get user details by ID.

### Test the API with Postman
* Open Postman.
* For the POST /user/create endpoint:
  Set the method to POST.
  In the body, select raw and set the type to JSON.
  Provide the necessary data for the user in JSON format, e.g.:
{
  "firstname": "John",
  "lastname": "Doe",
  "age": 30,
  "city": "Paris"
}
* Click Send.

### Troubleshooting
# Error: "MongoServerError: bad auth: authentication failed"
* Make sure you have entered the correct username, password, and database name in the MongoDB URI.
* Double-check that your MongoDB Atlas user has the correct privileges.
* If using MongoDB Atlas, ensure that your IP is whitelisted in the Network Access section.
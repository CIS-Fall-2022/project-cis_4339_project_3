# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup
```
npm install
```

### Before startup 
Setup a .env file with the following variables, e.g.:

```
MONGO_URL = mongodb+srv://<username>:<password>@cluster0.abcdc.mongodb.net/dbname
```
Organization_ID will be used as a default value in primary and event schemas. The value depends on the organization instance.
```
ORGANIZATION_ID = < retrieve id from organizationData collection >
```
```
PORT = < backend port # (MUST BE DIFFERENT PORT FROM FRONTEND) >
```

### Compiles and hot-reloads for development
```
npm start
```

# Data Platform Project Setup

Requirements:

This project uses NodeJS and MongoDB.

## Backend Node Application
```
cd backend
```
```
POSTMAN Documentation Link: https://documenter.getpostman.com/view/17857095/2s83tJGVm2
```
Follow instructions in backend README

## Frontend Vue 3 Application
```
cd frontend
```
Follow instructions in frontend README


## IMPORTANT Information on Postman Testing for Professor Lindner

(1) BEFORE inserting data for primary/event collection, you need to create data for an organization (POST+GET endpoints are provided for organization collection)

(2) AFTER creation of an organization document, you need to retrieve the objectid and create an ENVIRONMENT variable in the backend called ORGANIZATION_ID

(3) Explanation: The env variable ORGANIZATION_ID is used as a default value in the event/primary data schemas.  

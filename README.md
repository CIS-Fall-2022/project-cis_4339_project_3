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


## Setup instructions for 

(1) BEFORE inserting data for primary/event collection, you need to retrieve the organization ID from database

(2) AFTER manual creation of an organization document, you need to retrieve the objectid and create an ENVIRONMENT variable in the backend called ORGANIZATION_ID
```
ORGANIZATION_ID = <objectID>
```
(3) Explanation: The env variable ORGANIZATION_ID is used as a default value in the event/primary data schemas.  

Additionally, we have an Atlas cloud instance.

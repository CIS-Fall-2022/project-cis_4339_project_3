const express = require("express");
const router = express.Router();

//allow using a .env file
require("dotenv").config();

//organizationID to grab organization data for frontend
const orgID = process.env.ORGANIZATION_ID;

//importing data model schemas
let { organizationdata } = require("../models/models");

//GET all entries
router.get("/", (req, res, next) => { 
    organizationdata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET organization data by ID
router.get("/id", (req, res, next) => {
    organizationdata.find( 
        { _id: orgID }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

module.exports = router;
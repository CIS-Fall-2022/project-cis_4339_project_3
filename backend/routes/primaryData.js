const { application } = require("express");
const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { primarydata } = require("../models/models"); 
let { eventdata } = require("../models/models"); 

//allow using a .env file
require("dotenv").config();
//used to filter clients linked to an organization
const ORG_ID = process.env.ORGANIZATION_ID;

//GET all entries
router.get("/", (req, res, next) => { 
    primarydata.find( { organizationID: ORG_ID },
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    primarydata.find( 
        { _id: req.params.id }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { 
            organizationID: ORG_ID,
            firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, 
            lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" } 
        }
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            organizationID: ORG_ID,
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }
        }
    };
    primarydata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

// GET events for a single client
router.get("/events/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST
router.post("/", (req, res, next) => { 
    primarydata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data); 
            }
        }
    );
    primarydata.createdAt;
    primarydata.updatedAt;
    primarydata.createdAt instanceof Date;
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    primarydata.findOneAndUpdate( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});


//DELETE a Client by ID
router.delete("/:id", (req, res, next) => {
    //remove client from every event they are signed up to before deletion
    eventdata.updateMany(
        { attendees: req.params.id },
        { $pull: { attendees: req.params.id }},
        (error) => {
            if (error) {
                return next(error);
            } else {
                //mongoose will use clientID of document
                primarydata.findOneAndDelete(
                    { _id: req.params.id }, 
                    (error, data) => {
                        if (error) {
                            return next(error);
                        } else {
                            res.status(200).json({
                                msg: data
                            });
                        }
                    }
                );
            }
        }
    );
    
});

module.exports = router;
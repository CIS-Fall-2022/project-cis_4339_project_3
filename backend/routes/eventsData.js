const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventdata } = require("../models/models"); 

//allow using a .env file
require("dotenv").config();
//used to filter events linked to an organization
const ORG_ID = process.env.ORGANIZATION_ID;

//GET all entries
router.get("/", (req, res, next) => { 
    eventdata.find( { organizationID: ORG_ID },
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
    eventdata.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { 
            organizationID: ORG_ID,
            eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } 
        }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            organizationID: ORG_ID,
            date:  req.query["eventDate"]
        }
    };
    eventdata.find( 
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

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
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
    eventdata.create( 
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

//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
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

//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});

//DELETE an event by eventid
router.delete("/:id", (req, res, next) => {
    //mongoose will use eventID of document
    eventdata.findOneAndDelete(
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
});

//TODO: DELETE a client registered in attendees list with PUT request (Complete but need to check with professor)
router.put("/deleteAttendee/:eventId/:attendeeId", (req, res, next) => {
    //delete attendee from attendees list
    // Updated the function to add both event and attendee IDs (working)
    eventdata.updateOne(
        { _id: req.params.eventId },
        { $pull: { attendees: req.params.attendeeId } },
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});


//GET endpoint that will retrieve how many clients signedup for each event in the last 2 months
router.get('/eventgraph', (req, res, next) => {
    // SOURCE FOR DATE RANGE: https://stackoverflow.com/questions/7937233/how-do-i-calculate-the-date-in-javascript-three-months-prior-to-today
    let currentDate = new Date();
    eventdata.aggregate([
        { $match: { 
            organizationID: ORG_ID,
            date: { $gte: new Date(currentDate.setMonth(currentDate.getMonth() - 2)), $lte: new Date() } 
        } },
        {$project: { count: { $size:"$attendees" }, eventName:1 }}
    ], (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    });
});

module.exports = router;
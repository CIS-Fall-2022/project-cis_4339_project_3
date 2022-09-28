const express = require("express");
const router = express.Router();

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

//POST create an organization document
router.post("/", (req, res, next) => { 
    organizationdata.create( 
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

//DELETE function for organization by id
router.delete("/:id", (req, res, next) => {
    //mongoose will use clientID of document
    organizationdata.findOneAndDelete(
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

module.exports = router;
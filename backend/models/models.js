const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//allow using a .env file
require("dotenv").config();
//declare organization_id as a default value for linking primary&event schema
const ORG_ID = process.env.ORGANIZATION_ID;

//TODO: possible revise primaryData Schema
//collection for intakeData
let primaryDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    organizationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organizationData',
        default: ORG_ID
    },
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumbers: {
        primaryPhone: {
            type: String,
            required: true
        },
        altPhone: {
            type: String
        }
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    }
}, {
    collection: 'primaryData',
    timestamps: true
});

//TODO: possible revise eventData Schema
//collection for eventData
let eventDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    organizationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organizationData',
        default: ORG_ID
    },
    eventName: {
        type: String,
        require: true
    },
    services: {
        type: Array
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
    },
    attendees: [{
        type: String
    }]
}, {
    collection: 'eventData'
});

let organizationDataSchema = new Schema({
    organizationName: {
        type: String,
        require: true
    }
}, {
    collection: 'organizationData'
});

// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const organizationdata = mongoose.model('organizationData', organizationDataSchema);

// package the models in an object to export 
module.exports = { primarydata, eventdata, organizationdata }

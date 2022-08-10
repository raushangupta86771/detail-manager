const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    //for hidding particular user notes to another user notes then we will make a new field i.e user. here we can store the user's id
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' //this refrence of user from "User.js" file 
    },
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        street: {
            type: String,
        },
        suite: {
            type: String,
        },
        city: {
            type: String,
        },
        zipcode: {
            type: String,
        },
        geo: {
            lat: {
                type: String,
            },
            lng: {
                type: String,
            },
        },
    },
    phone: {
        type: String,
    },
    website: {
        type: String,
    },
    company: {
        name: {
            type: String,
        },
        catchPhrase: {
            type: String,
        },
        bs: {
            type: String,
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema);
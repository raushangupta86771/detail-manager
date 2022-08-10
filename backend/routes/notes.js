const { Router } = require("express");
const express = require("express");
const app = express();
const router = express.Router();
const Note = require('../models/Notes') //schema part
const fetchuser = require("../middleware/fetchuser"); //from this middleware we will receieving user
const { body, validationResult } = require('express-validator');




router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }); //here we will get all the notes. find() - no matter the number of documents matched, a cursor is returned, never null.

        res.json(notes);
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Some error occured");
    }
})





//Route 2 : this end point POST "/api/notes/addnote" . Here we will add note. login required. its taking 4 parameter
router.post("/addnote", fetchuser, async (req, res) => {
    //if there are errors then return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, username, email, phone, website, street, suite, city, zipcode, lat, lng, catchPhrase, bs } = req.body;
        const cName = req.body.cName;
        console.log(street)
        const note = new Note({
            user: req.user.id,   //adding user filled data in database. 4 filled will be added
            name, username, email,
            address: {
                street: street,
                suite: suite,
                city: city,
                zipcode: zipcode,
                geo: {
                    lat: lat,
                    lng: lng,
                },
            },
            phone, website,
            company: {
                name: cName,
                catchPhrase: catchPhrase,
                bs: bs
            },
        })
        const savedNote = await note.save();   //saving to database
        res.json(savedNote);
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Some error occured");
    }
})



//Route 3 : this end point PUT "/api/notes/updatenote" . Here we update an existing note. login required. its taking 3 parameter
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    console.log(req.body)
    const { name, username, email, phone, website, street, suite, city, zipcode, lat, lng, catchPhrase, bs } = req.body;
    const cName = req.body.cName;
    //create a newNote object
    let newNote = {
        name,
        address: {
            street: "", suite: "", city: "", zipcode: "", geo: { lat: "", lng: "", },
        },
        company: { name: "", catchPhrase: "", bs: "", },
    };
    //whatever user want to change only that we will change
    if (name) { newNote.name = name };
    if (username) { newNote.username = username };
    if (email) { newNote.email = email };
    if (phone) { newNote.phone = phone };
    if (website) { newNote.website = website };
    if (cName) { newNote.company.name = cName };
    if (catchPhrase) { newNote.company.catchPhrase = catchPhrase };
    if (bs) { newNote.company.bs = bs };
    if (street) { newNote.address.street = street };
    if (suite) { newNote.address.suite = suite };
    if (city) { newNote.address.city = city };
    if (zipcode) { newNote.address.zipcode = zipcode };
    if (lat) { newNote.address.geo.lat = geo.lat };
    if (lng) { newNote.address.geo.lng = geo.lng };

    //first we will check wether the :id exists or not in data base
    const note = await Note.findById(req.params.id); //this will check user url id exists or not
    if (!note) {
        return res.status(404).send("Not Found");
    }

    //"note.user.toString()" is "id" of user entered and "req.user.id" is actual "id" of "logged in user". if both not matched that means the logged in user want to access another user data
    if (note.user.toString() != req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    //"req.params.id" means id which is in user url
    //if it comes to this part then that means the user is authorised and we can allow him to update
    const noteUpdated = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }); //here we are updating note
    res.json({ noteUpdated });
})


//Route 4 : this end point DELETE "/api/notes/deletenote" . Here we delete an existing note. login required. its taking 3 parameter
router.delete("/deletenote/:id", fetchuser, async (req, res) => {


    //first we will check wether the :id exists or not in database
    const note = await Note.findById(req.params.id); //this will check user url id exists or not
    if (!note) {
        return res.status(404).send("Not Found");
    }

    //"note.user.toString()" is "id" of user entered and "req.user.id" is actual "id" of "logged in user". if both not matched that means the logged in user want to access another user data
    if (note.user.toString() != req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    //"req.params.id" means id which is in user url
    //if it comes to this part then that means the user is authorised and we can allow him to delete
    const deletedNote = await Note.findByIdAndDelete(req.params.id); //here we are updating note
    res.json({ "success": "note has been deleted" });
})


router.get("/search/:searchItem", fetchuser, async (req, res) => {
    console.log(req.params.searchItem)
    var regex = new RegExp(req.params.searchItem, 'i');
    const rcvdItem = await Note.find({ name: regex });
    var success = false;
    if (rcvdItem.length < 1) {
        return res.json({ data: rcvdItem, success: false });
    }
    else {
        return res.json({ data: rcvdItem, success: true });
    }
})

module.exports = router;
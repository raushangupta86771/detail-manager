import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    //local note api
    const host = "https://details-matcher.herokuapp.com";
    const notesInitial = []; //initially all notes is empty. for getting all notes we will use getNotes();
    const userInit = [];
    const searchedInitial = [];

    const [notes, setNotes] = useState(notesInitial);
    const [searchedItems, setSearchedItems] = useState(searchedInitial);
    const [searchFailedOrNot, setSearchFailedOrNot] = useState(true);
    const [user, setUser] = useState(userInit);

    //Get all notes
    const getNotes = async () => {
        //API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json); //setting fetched notes in "setNotes"
    };

    //Add a note
    const addNote = async (name, username, email, phone, website, street, suite, city, zipcode, lat, lng, catchPhrase, bs,cName) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ name, username, email, phone, website, street, suite, city, zipcode, lat, lng, catchPhrase, bs,cName }),
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    };

    //delete a note
    const deleteNote = async (id) => {
        //TODO : API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = response.json();
        const newNote = notes.filter((note) => { return note._id !== id }); //returning new note whose id is not equal to deleting note waala id
        setNotes(newNote);
    };

    //edit a note
    const editNote = async (id,name, username, email, phone, website, street, suite, city, zipcode, lat, lng, catchPhrase, bs,cName) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ name, username, email, phone, website, street, suite, city, zipcode, lat, lng, catchPhrase, bs,cName }),
        });
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));
        // //Logic to edit in client
        // for (let index = 0; index < newNotes.length; index++) {
        //     const element = newNotes[index];
        //     if (element._id === id) {
        //         newNotes[index].name = name;
        //         newNotes[index].username = username;
        //         newNotes[index].email = email;
        //         newNotes[index].phone = phone;
        //         break;
        //     }
        // }
        // setNotes(newNotes);
        getNotes();
    };

    //get user details for about page
    const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setUser(json);
        console.log(user);
    }

    //search the notes
    const searchNotes = async (searchItem) => {
        console.log(searchItem)
        const response = await fetch(`${host}/api/notes/search/${searchItem}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const resData = await response.json();
        setSearchedItems(resData.data);
        setSearchFailedOrNot(resData);
        console.log(resData);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, getUser ,user,searchNotes,searchedItems,searchFailedOrNot}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;

// const s1 = {
//     "name": "Raushan",
//     "age": "19"
// }
// const [state, setstate] = useState(s1); //using this to update the s1

// const update = () => { //update function to update name and age after 1 sec.
//     setTimeout(() => {
//         setstate({
//             "name": "Saksham",
//             "age": "19.5"
//         })
//     }, 1000)
// }

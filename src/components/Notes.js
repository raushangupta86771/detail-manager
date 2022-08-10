import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext); //for using imported note context
    const { notes, getNotes, editNote } = context; //using note app data. 
    let history = useHistory();
    useEffect(() => { //for showing all the notes. which we fetched from mongoDb
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            history.push("/login");
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const closeRef = useRef(null);
    const [note, setNote] = useState({ id: "", ename: "", eusername: "", eemail: '', ephone: '', ewebsite: '', estreet: '', esuite: '', ecity: '', ezipcode: '', elat: '', elng: '', ecatchPhrase: '', ebs: '', ecName: "" }); //this is doing for onchange. initially all three values are empty

    const updateNote = (currNote) => {
        ref.current.click(); //for clicking on modal button after clicking on edit button
        setNote({ id: currNote._id, ename: currNote.name, eusername: currNote.username, eemail: currNote.email, ephone: currNote.phone, ewebsite: currNote.website, estreet: currNote.street, esuite: currNote.suite, ecity: currNote.city, ezipcode: currNote.zipcode, elat: currNote.lat, elng: currNote.lng, ecatchPhrase: currNote.catchPhrase, ebs: currNote.bs, ecName: currNote.cName });
    }


    const handleClick = (e) => {
        e.preventDefault(); //protecting page to not reload while clicking on submit button
        editNote(note.id, note.ename, note.eusername, note.eemail, note.ephone, note.ewebsite, note.estreet, note.esuite, note.ecity, note.ezipcode, note.elat, note.elng, note.ecatchPhrase, note.ebs, note.ecName);
        closeRef.current.click(); //for closing the tab after clicking on update button
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) //iska matlab agar pahle jo value hai usko rahne do. aur jo bhi change ho rha uske name ko value ke barabar kar do
    }

    return <>
        <AddNote />

        <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
            Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className='my-3'>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Name</label>
                                <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" onChange={onchange} name='ename' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Username</label>
                                <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" onChange={onchange} name='eusername' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Email</label>
                                <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" onChange={onchange} name='eemail' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Phone</label>
                                <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" onChange={onchange} name='ephone' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Website</label>
                                <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" onChange={onchange} name='ewebsite' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Street</label>
                                <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" onChange={onchange} name='estreet' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Suite</label>
                                <input type="text" className="form-control" id="esuite" aria-describedby="emailHelp" onChange={onchange} name='esuite' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">City</label>
                                <input type="text" className="form-control" id="esuite" aria-describedby="emailHelp" onChange={onchange} name='ecity' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Zipcode</label>
                                <input type="text" className="form-control" id="esuite" aria-describedby="emailHelp" onChange={onchange} name='ezipcode' />
                            </div>
                            
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Detail</button>
                    </div>
                </div>
            </div>
        </div>


        <div className="row my-3">
            <h2>Your Details</h2>
            <div className="container mx-2">
                {notes.length === 0 && 'No details to display, Please add detail'}
            </div>
            {notes.map((note) => {
                console.table(note + "hey")
                return <NoteItem key={note._id} updateNote={updateNote} note={note} />
            })}
        </div>
    </>
};

export default Notes;

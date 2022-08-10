import { React, useContext } from 'react';
import noteContext from "../context/notes/noteContext"
import "./NoteItem.css"

const NoteItem = (props) => {
    const context = useContext(noteContext); //for using imported note context
    const { deleteNote } = context;
    const { note, updateNote } = props; //distructuring from Notes.js from which we got note api as props
    // console.log(note)
    return (
        <>
            <div className='col-md-4'>
                <div className="card my-3">
                    <div className="card-body makeC">
                        <h5 className="card-title"><span>Name : </span>{note.name}</h5>
                        <h5 className="card-title"><span>Username : </span>{note.username}</h5>
                        <h5 className="card-title"><span>Email : </span>{note.email}</h5>
                        <h5 className="card-title"><span>Phone : </span>{note.phone}</h5>
                        <h5 className="card-title"><span>Website : </span>{note.website}</h5>
                        <h5 className="card-title"><span>Street : </span>{note.address.street}</h5>
                        <h5 className="card-title"><span>Suite : </span>{note.address.suite}</h5>
                        <h5 className="card-title"><span>City : </span>{note.address.city}</h5>
                        <h5 className="card-title"><span>Zipcode : </span>{note.address.zipcode}</h5>
                        <h5 className="card-title"><span>lat : </span>{note.address.geo.lat}</h5>
                        <h5 className="card-title"><span>lng : </span>{note.address.geo.lng}</h5>
                        <h5 className="card-title"><span>catchPhrase : </span>{note.company.catchPhrase}</h5>
                        <h5 className="card-title"><span>bs : </span>{note.company.bs}</h5>
                        <i className="fas fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }}></i>
                        {/* //sending id in deleteNote function of noteState.js */}
                        <i className="fas fa-edit mx-2" onClick={() => updateNote(note)}>edit</i>
                    </div>
                </div>
            </div>
        </>
    )
};

export default NoteItem;

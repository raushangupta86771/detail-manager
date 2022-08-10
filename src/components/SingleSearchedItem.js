import React from 'react'
import "./NoteItem.css"

const SingleSearchedItem = (props) => {

    const { note } = props;

    return (
        <>
            <div className='col-md-3'>
                <div className="card my-4">
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
                        {/* <h5 className="card-title"><span>lat : </span>{note.address.geo.lat}</h5> */}
                        <h5 className="card-title"><span>lng : </span>{note.address.geo.lng}</h5>
                        <h5 className="card-title"><span>catchPhrase : </span>{note.company.catchPhrase}</h5>
                        <h5 className="card-title"><span>bs : </span>{note.company.bs}</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleSearchedItem
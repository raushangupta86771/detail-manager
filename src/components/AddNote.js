import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext"

const AddNote = () => {
    const context = useContext(noteContext); //for using imported note context
    const { addNote } = context; //using note app data. 
    const [note, setNote] = useState({ name: "", username: "", email: '', phone: '', website: '', street: '', suite: '', city: '', zipcode: '', lat: '', lng: '', catchPhrase: '', bs: '', cName: "" }); //this is doing for onchange. initially all three values are empty

    const handleClick = (e) => {
        e.preventDefault(); //protecting page to not reload while clicking on submit button
        addNote(note.name, note.username, note.email, note.phone, note.website, note.street, note.suite, note.city, note.zipcode, note.lat, note.lng, note.catchPhrase, note.bs, note.cName);
        setNote({ name: "", username: "", email: '', phone: '', website: '', street: '', suite: '', city: '', zipcode: '', lat: '', lng: '', catchPhrase: '', bs: '', cName: "" }); //notes khaali kar do agar add ho gya to
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) //iska matlab agar pahle jo value hai usko rahne do. aur jo bhi change ho rha uske name ko value ke barabar kar do
    }

    return <div>
        <div className="container my-3">
            <h2>Add a detail</h2>

            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onchange} name='name' />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Username</label>
                    <input type="text" className="form-control" id="description" name='username' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">street</label>
                    <input type="text" className="form-control" id="street" name='street' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">suite</label>
                    <input type="text" className="form-control" id="suite" name='suite' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">city</label>
                    <input type="text" className="form-control" id="city" name='city' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">zipcode</label>
                    <input type="text" className="form-control" id="zipcode" name='zipcode' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">lat</label>
                    <input type="text" className="form-control" id="lat" name='lat' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">lng</label>
                    <input type="text" className="form-control" id="lng" name='lng' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">phone</label>
                    <input type="text" className="form-control" id="phone" name='phone' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">website</label>
                    <input type="text" className="form-control" id="website" name='website' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Company name</label>
                    <input type="text" className="form-control" id="cName" name='cName' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">catchPhrase</label>
                    <input type="text" className="form-control" id="catchPhrase" name='catchPhrase' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">bs</label>
                    <input type="text" className="form-control" id="bs" name='bs' onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Detail</button>
            </form>
        </div>
    </div>;
};

export default AddNote;

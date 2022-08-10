import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext"
import SearchedItems from './SearchedItems';

const SearchNote = () => {

    const context = useContext(noteContext); //for using imported note context
    const { searchNotes, searchedItems } = context; //using note app data. 

    const [note, setNote] = useState({ searchItem: "" });

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault(); //protecting page to not reload while clicking on submit button
        searchNotes(note.searchItem);
        setNote({ searchItem: "" }); //notes khaali kar do agar add ho gya to
    }

    return (
        <>
            <div className='SearchNote'>
                <form>
                    <div className="mb-3">
                        <label placeholder='Enter Title for search' className="form-label">Find Details by User's name</label>
                        <div className="d-flex">
                        <input name='searchItem' type="text" className="form-control" id="inputKey" aria-describedby="emailHelp" onChange={onchange} value={note.searchItem} />
                        <button type="submit" className="btn btn-primary mx-2" onClick={handleClick}>Search</button>
                        </div>
                    </div>

                </form>
            </div>

            <SearchedItems />
        </>
    )
}

export default SearchNote
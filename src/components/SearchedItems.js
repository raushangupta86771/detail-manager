import React, { useContext, useEffect, useState } from 'react';
import noteContext from "../context/notes/noteContext"
import SingleSearchedItem from './SingleSearchedItem';
import { useHistory } from 'react-router-dom';

const SearchedItems = () => {
    let history = useHistory();
    const context = useContext(noteContext); //for using imported note context
    const { searchedItems, searchFailedOrNot } = context; //using note app data. 

    useEffect(() => { //for showing all the notes. which we fetched from mongoDb
        if (localStorage.getItem('token')) {
            console.log(searchFailedOrNot)
        }
        else {
            history.push("/login");
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className='SearchedItems'>
            <div className="row my-3">
                <h2>{searchedItems.length === 0 ? '' : "Your Searched Details"}</h2>
                <div className="container mx-2">
                    {searchFailedOrNot.success === false && `No detail found`}
                </div>
                {searchedItems.map((note) => {
                    return <SingleSearchedItem key={note._id} note={note} />
                })}
            </div>
        </div>
    )
}

export default SearchedItems
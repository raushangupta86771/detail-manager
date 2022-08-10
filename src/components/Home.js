import React from 'react';
import Notes from './Notes';
import SearchNote from './SearchNote';

const Home = (props) => {
    const { showAlert } = props;

    return <div>
        <SearchNote />
        <Notes showAlert={showAlert} />
    </div>;
};

export default Home;
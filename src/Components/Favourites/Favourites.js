import React, { useState, useEffect } from 'react'
import FavouriteSlider from '../FavouriteSlider/FavouriteSlider';

function Favourites() {
    const [favourites, setfavourites] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/favourites")
            .then(res => res.json())
            .then(favouritess => {
                setfavourites(favouritess.filter(favourite => favourite.email == localStorage.getItem('email')));
            })

    }, [favourites]);

    return (

        <FavouriteSlider favourites={favourites} />

    )
}

export default Favourites;

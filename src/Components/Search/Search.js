import React, { useState, useContext } from 'react'
import { AppContext } from '../../App';
import MultiSelect from '../controls/multiSelect/MultiSelect';
import SliderAlbum from '../SliderAlbum/SliderAlbum';
import SliderArtist from '../SliderArtist/SliderArtist';
import SliderPlaylist from '../SliderPlaylist/SliderPlaylist';



function Search() {
    const [types, settypes] = useState([]);
    const [limit, setlimit] = useState("");
    const [query, setquery] = useState("");
    const screenSize = useContext(AppContext);


    const limitChangeHandler = (e) => {
        setlimit(e.target.value);
    }

    const queryHandler = (e) => {
  
        if(types.length==0  || query=="") {
            alert("Please fill the details");
            return;
        }

        let typesString = types.join(',');
        fetch(`http://api.napster.com/v2.2/search/verbose?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=${query}&type=${typesString}&per_type_limit=${limit?limit:10}`)
        .then(res=>res.json())
        .then(data=> {
            let searchData = data.search.data;
           
            for(let key in searchData) {
                if(key=='albums') {
                    <SliderAlbum />
                }  
               else if(key=='artists') {
                    <SliderArtist />
                } 
                else if(key=='playlists') {
                    <SliderPlaylist />
                }   
                // else if(key=='tracks')
            }
        })
    
    
    }

    const multiSelecthandler = (e) => {
        settypes(e.target.value);
    }

    return (
        <div>
            <div className="d-flex justify-content-around align-tems-baseline flex-wrap">


                <MultiSelect types={types} handleChange={(e) => multiSelecthandler(e)} />
                <div>
                    <select id="limit" className="form-select form-select-lg p-2" aria-label="Default select example" onChange={(event) => { limitChangeHandler(event) }} >
                        <option selected disabled value>Select the Limit</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>

                    </select>
                </div>

                <div className="form-group d-flex">
                    <div className="form-outline">
                        <input type="search" className="form-control" placeholder="Query" value={query} onChange={(e) => { setquery(e.target.value) }} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={queryHandler}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Search

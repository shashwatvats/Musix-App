import React, { useContext, useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import { AppContext } from '../../App';


function FavouriteSlider(props) {
    const [playbutton, setplaybutton] = useState({});
    const screenSize = useContext(AppContext);
    let arr = [];
    const { favourites } = props;


    function deleteFavourite(id) {
        fetch(`http://localhost:4000/favourites/${id}`, {
            method: 'DELETE'
        });
    }

    function carouselSlider() {
        let sizes = [576, 992, 1400];
        let carouselsize = [2, 4, 6];

        for (let j = 0; j < 3; j++) {
            if (screenSize < sizes[j]) {
                arr = [];
                let active = "active";
                for (let i = 0; i < favourites.length; i += carouselsize[j]) {
                    if (i !== 0)
                        active = "";
                    arr.push(<div key={i} className={`carousel-item ${active}`}>
                        <div className="row">
                            {favourites.slice(i, i + carouselsize[j]).map(favouriteSong =>
                                <div key={favouriteSong.id} className="col-6 col-sm-3 col-md-3 col-lg-2 p-2 card border-0 slide-container">
                                    <img src={`https://api.napster.com/imageserver/v2/albums/${favouriteSong.albumId}/images/500x500.jpg`}
                                        className="card-img-top"
                                        style={{ borderRadius: '12px' }}
                                        alt="..."
                                    />
                                    <div>
                                        <audio src={favouriteSong.previewURL} id={`favplay-${favouriteSong.id}`}>
                                        </audio>

                                        {playbutton[favouriteSong.id] ? <i onClick={() => { document.getElementById(`favplay-${favouriteSong.id}`).pause(); setplaybutton(prevState => { return { ...prevState, [favouriteSong.id]: false } }) }} className="far fa-pause-circle fa-2x btn"></i> :
                                            <i onClick={() => { document.getElementById(`favplay-${favouriteSong.id}`).play(); setplaybutton(prevState => { return { ...prevState, [favouriteSong.id]: true } }) }} className="far fa-play-circle fa-2x btn"></i>
                                        }

                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{favouriteSong.name.split("(").shift()}</h5>
                                        <DeleteIcon color="secondary" onClick={() => { deleteFavourite(favouriteSong.id) }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>);

                }
                break;
            }
        }
    }

    carouselSlider();

    return (
      <Paper className="mb-3" elevation={7} style={{ padding: "10px" }}>
        <div className="h4 text-danger">Favourite Songs</div>
        <div
          id="favourites"
          className="carousel slide carousel-fade"
          // data-bs-ride="carousel"
          data-interval="false"
        >
          <div className="carousel-inner">{arr}</div>
          {favourites.length ? (
            <div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#favourites"
                style={{ height: "50%", width: "5%" }}
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon rounded-circle"
                  aria-hidden="true"
                  style={{ backgroundColor: "rgba(0,0,0,.6)" }}
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#favourites"
                style={{ height: "50%", width: "5%" }}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon rounded-circle"
                  style={{ backgroundColor: "rgba(0,0,0,.6)" }}
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </Paper>
    );
}

export default FavouriteSlider

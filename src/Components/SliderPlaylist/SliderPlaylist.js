import React, { useState, useEffect, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import {} from "../Dashboard/Dashboard";
import { AppContext } from "../../App";

function SliderPlaylist(props) {
  // const [screenSize, setscreenSize] = useState(window.innerWidth);
  const screenSize = useContext(AppContext);
  const [songs, setsongs] = useState([]);
  const [loading, setloading] = useState(true);
  const {
    playlist,
    favouriteSongsIds,
    addToFavourite,
    deleteFavourite,
  } = props;
  const [playbutton, setplaybutton] = useState({});

  let arr = [];

  function carouselSlider() {
    let sizes = [576, 992, 1400];
    let carouselsize = [2, 4, 6];

    for (let j = 0; j < 3; j++) {
      if (screenSize < sizes[j]) {
        arr = [];
        let active = "active";
        for (let i = 0; i < 12; i += carouselsize[j]) {
          if (i !== 0) active = "";
          arr.push(
            <div key={i} className={`carousel-item ${active}`}>
              <div className="row">
                {songs.slice(i, i + carouselsize[j]).map((song) => (
                  <div
                    key={song.id}
                    className="col-6 col-sm-3 col-md-3 col-lg-2 p-2 card border-0 slide-container"
                  >
                    <img
                      src={`https://api.napster.com/imageserver/v2/albums/${song.albumId}/images/500x500.jpg`}
                      className="card-img-top sliderGenreImg"
                      style={{ borderRadius: "12px" }}
                      alt="..."
                    />
                    <div className="img-brother">
                      <audio
                        src={song.previewURL}
                        id={`play-${song.id}`}
                      ></audio>

                      {playbutton[song.id] ? (
                        <i
                          onClick={() => {
                            document.getElementById(`play-${song.id}`).pause();
                            setplaybutton((prevState) => {
                              return { ...prevState, [song.id]: false };
                            });
                          }}
                          className="far fa-pause-circle fa-2x btn carasoulbtn"
                        ></i>
                      ) : (
                        <i
                          onClick={() => {
                            document.getElementById(`play-${song.id}`).play();
                            setplaybutton((prevState) => {
                              return { ...prevState, [song.id]: true };
                            });
                          }}
                          className="far fa-play-circle fa-2x btn carasoulbtn"
                        ></i>
                      )}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {song.name.split("(").shift()}
                      </h5>
                      {/* <FavoriteIcon color="secondary"/>
                                    <FavoriteBorderIcon /> */}
                      {window.location.pathname === "/dashboard" ? (
                        favouriteSongsIds.includes(
                          `${localStorage.getItem("email")}-${song.id}`
                        ) ? (
                          <FavoriteIcon
                            className="favbuttondelete"
                            color="secondary"
                            onClick={() => {
                              deleteFavourite(
                                `${localStorage.getItem("email")}-${song.id}`
                              );
                            }}
                          />
                        ) : (
                          <FavoriteBorderIcon
                            className="favbuttonadd"
                            onClick={() => {
                              addToFavourite(song);
                            }}
                          />
                        )
                      ) : (
                        ""
                      )}

                      {/* <Button variant="contained" onClick={() => { addToFavourite(song) }}>Add <FavoriteIcon /></Button> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        break;
      }
    }
  }

  useEffect(() => {
    fetch(
      `${playlist.link}?limit=12&apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`
    )
      .then((res) => res.json())
      .then((data) => {
        setsongs(data.tracks);
        setloading(false);
      });
  }, [playlist.link]);

  carouselSlider();
  return loading ? (
    ""
  ) : (
    <Paper className="mb-3" elevation={7} style={{ padding: "10px" }}>
      <div className="h4 text-danger">{playlist.name}</div>
      <div
        id={`playlist-${playlist.id.slice(3)}`}
        className="carousel slide carousel-fade"
        // data-bs-ride="carousel"
        data-interval="false"
      >
        <div className="carousel-inner">{arr}</div>

        <button
          className="carousel-control-prev"
          type="button"
          style={{ height: "50%", width: "5%" }}
          data-bs-target={`#playlist-${playlist.id.slice(3)}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon rounded-circle"
            style={{ backgroundColor: "rgba(0,0,0,.6)" }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          style={{ height: "50%", width: "5%" }}
          data-bs-target={`#playlist-${playlist.id.slice(3)}`}
          data-bs-slide="next"
        >
          <span
            style={{ backgroundColor: "rgba(0,0,0,.6)" }}
            className="carousel-control-next-icon rounded-circle"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </Paper>
  );
}

export default SliderPlaylist;

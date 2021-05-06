import React, { useState, useEffect } from "react";
import SliderPlaylist from "../SliderPlaylist/SliderPlaylist";
import Carousel from "react-bootstrap/Carousel";
import "./Dashboard.css";
import SliderAlbum from "../SliderAlbum/SliderAlbum";
import FavouriteSlider from "../FavouriteSlider/FavouriteSlider";
import SliderArtist from "../SliderArtist/SliderArtist";
import SliderGenre from "../SliderGenre/SliderGenre";
import Spinner from "../Spinner/Spinner";

function Dashboard() {
  const [playlists, setplaylists] = useState([]);
  const [tracks, settracks] = useState([]);
  const [loading, setloading] = useState(true);

  const [mainCarasoulplaybutton, setmainCarasoulplaybutton] = useState({});
  const [favourites, setfavourites] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.napster.com/v2.2/playlists?limit=5&apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4"
    )
      .then((res) => res.json())
      .then((data) => {
        setplaylists(
          data.playlists.map((playlist) => {
            return {
              id: playlist.id,
              name: playlist.name,
              link: playlist.links.tracks.href,
            };
          })
        );
        setloading(false);
      });
  }, []);
  useEffect(() => {
    fetch(
      "http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=6"
    )
      .then((res) => res.json())
      .then((data) => {
        settracks(data.tracks);
      });
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:4000/favourites?email=${localStorage.getItem("email")}`
    )
      .then((res) => res.json())
      .then((favouritess) => {
        setfavourites(favouritess);
      });
  }, [favourites]);

  let favouriteSongsIds = favourites.map((favourite) => favourite.id);

  return loading ? (
    <Spinner />
  ) : (
    <div style={{ backgroundColor: "#9086b5" }}>
      <div className="container" data-testid="con1">
        <Carousel
          className="main-carousel mx-auto mb-3"
          fade
          style={{ width: "100%" }}
        >
          {tracks.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                data-testid="imageid"
                style={{ objectFit: "cover", borderRadius: "15px" }}
                className="d-block w-100"
                src={`https://api.napster.com/imageserver/v2/albums/${item.albumId}/images/500x500.jpg`}
                alt="First slide"
              />
              <Carousel.Caption>
                <audio
                  src={item.previewURL}
                  id={`main-carasoul-play-${item.id}`}
                >
                  {/* <source src={item.previewURL} type="audio/mp3" /> */}
                </audio>
                <div>
                  {mainCarasoulplaybutton[item.id] ? (
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        document
                          .getElementById(`main-carasoul-play-${item.id}`)
                          .pause();
                        setmainCarasoulplaybutton((prevState) => {
                          return { ...prevState, [item.id]: false };
                        });
                      }}
                      className="far fa-pause-circle fa-3x"
                    ></i>
                  ) : (
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        document
                          .getElementById(`main-carasoul-play-${item.id}`)
                          .play();
                        setmainCarasoulplaybutton((prevState) => {
                          return { ...prevState, [item.id]: true };
                        });
                      }}
                      className="far fa-play-circle fa-3x"
                    ></i>
                  )}
                </div>

                <h4>{item.name}</h4>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        <FavouriteSlider favourites={favourites} />

        <SliderGenre />
        <SliderArtist />
        <SliderAlbum />
        {playlists.map((playlist) => (
          <SliderPlaylist
            key={playlist.id}
            playlist={playlist}
            favouriteSongsIds={favouriteSongsIds}
          />
        ))}

        {/* <Slider playlist={playlists[0]} screenSize={screenSize} />
          <Slider playlist={playlists[1]}  screenSize={screenSize} /> */}
      </div>
    </div>
  );
}

export default Dashboard;

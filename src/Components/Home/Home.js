import React, { useState, useEffect } from "react";
import SliderPlaylist from "../SliderPlaylist/SliderPlaylist";
import Carousel from "react-bootstrap/Carousel";
import "../Dashboard/Dashboard.css";
import SliderAlbum from "../SliderAlbum/SliderAlbum";
import SliderArtist from "../SliderArtist/SliderArtist";
import SliderGenre from "../SliderGenre/SliderGenre";
import Spinner from "../Spinner/Spinner";

function Home() {
  const [playlists, setplaylists] = useState([]);
  const [tracks, settracks] = useState([]);
  const [loading, setloading] = useState(true);

  const [mainCarasoulplaybutton, setmainCarasoulplaybutton] = useState({});
  //Fetching the data from API for Playlist
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
      })
      .catch((err) => {
        console.error('Error: ' + err)
      });
  }, []);
  //Fetching the data from API for Top Tracks
  useEffect(() => {
    fetch(
      "https://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=6"
    )
      .then((res) => res.json())
      .then((data) => {
        settracks(data.tracks);
      })
      .catch((err) => {
        console.error('Error: ' + err)
      });
  }, []);
  //the spinner will show when the data is loading
  return loading ? (
    <Spinner />
  ) : (
    <div style={{ backgroundColor: "#9086b5" }}>
      <div className="container">
        <Carousel
          className="main-carousel mx-auto mb-3"
          fade
          style={{ width: "100%" }}
        >
          {tracks.map((item) => (
            <Carousel.Item key={item.id} className="carasoulitem">
              <img
                style={{ objectFit: "cover", borderRadius: "15px" }}
                className="d-block w-100 mainCarousel"
                src={`https://api.napster.com/imageserver/v2/albums/${item.albumId}/images/500x500.jpg`}
                alt="First slide"
              />
              <Carousel.Caption
                style={{ pointerEvents: "none" }}
                className="mainCarasoulCaption"
              >
                <audio
                  src={item.previewURL}
                  id={`main-carasoul-play-${item.id}`}
                >
                  {/* <source src={item.previewURL} type="audio/mp3" /> */}
                </audio>

                {mainCarasoulplaybutton[item.id] ? (
                  <i
                    style={{ pointerEvents: "initial", cursor: "pointer" }}
                    onClick={() => {
                      document
                        .getElementById(`main-carasoul-play-${item.id}`)
                        .pause();
                      setmainCarasoulplaybutton((prevState) => {
                        return { ...prevState, [item.id]: false };
                      });
                    }}
                    className="far fa-pause-circle fa-3x cypresstestpause"
                  ></i>
                ) : (
                  <i
                    style={{ pointerEvents: "initial", cursor: "pointer" }}
                    onClick={() => {
                      document
                        .getElementById(`main-carasoul-play-${item.id}`)
                        .play();
                      Object.keys(mainCarasoulplaybutton).forEach((key) => {
                        document.getElementById(`main-carasoul-play-${key}`).pause();
                        setmainCarasoulplaybutton(mainCarasoulplaybutton[key] = false);
                      });
                      setmainCarasoulplaybutton((prevState) => {
                        return { ...prevState, [item.id]: true };
                      });
                    }}
                    className="far fa-play-circle fa-3x mainCarasoulPlayButton cypresstestplay"
                  ></i>
                )}

                <h4 style={{ pointerEvents: "none" }}>{item.name}</h4>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        <SliderGenre />
        <SliderArtist />
        <SliderAlbum />
        {playlists.map((playlist) => (
          <SliderPlaylist key={playlist.id} playlist={playlist} />
        ))}

        {/* <Slider playlist={playlists[0]} screenSize={screenSize} />
          <Slider playlist={playlists[1]}  screenSize={screenSize} /> */}
      </div>
    </div>
  );
}
export default Home;

import React, { useEffect, useState } from "react";

function ArtistDisplay(props) {
  const { artist } = props;
  const [songs, setsongs] = useState([]);
  const [playbutton, setplaybutton] = useState({});

  useEffect(() => {
    fetch(
      `${artist.links.topTracks.href}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`
    )
      .then((res) => res.json())
      .then((data) => setsongs(data.tracks));
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12  col-md-4">
            <img
              className="img-fluid"
              src={`https://api.napster.com/imageserver/v2/artists/${artist.id}/images/500x500.jpg`}
              alt="..."
              style={{ borderRadius: "50px" }}
            />

            <div className="d-flex flex-column mt-3">
              <p className="mt-2 h5">{artist.name}</p>
              <p className="text-secondary">Singer</p>
            </div>
            <div className="d-flex" style={{fontFamily:"monospace"}}>
              <div>{artist.bios? artist.bios[0].bio.replace(/(<([^>]+)>)/gi, ""):""}</div>
            </div>
          </div>

          <div className="col-md-1"></div>
          <div className="col-12  col-md-7">
            <p className="h2">{artist.name}</p>
            <p>{artist.label}</p>
            {songs.map((song) => (
              <div className="d-flex align-content-center p-2 mb-1">
                <img
                  src={`https://api.napster.com/imageserver/v2/albums/${song.albumId}/images/70x70.jpg`}
                  alt="..."
                  style={{ borderRadius: "5px" }}
                  className="me-2"
                />
                <div>
                  <audio
                    src={song.previewURL}
                    id={`artistPlay-${song.id}`}
                  ></audio>

                  {playbutton[song.id] ? (
                    <i
                      onClick={() => {
                        document
                          .getElementById(`artistPlay-${song.id}`)
                          .pause();
                        setplaybutton((prevState) => {
                          return { ...prevState, [song.id]: false };
                        });
                      }}
                      className="far fa-pause-circle fa-2x btn"
                    ></i>
                  ) : (
                    <i
                      onClick={() => {
                        document.getElementById(`artistPlay-${song.id}`).play();
                        setplaybutton((prevState) => {
                          return { ...prevState, [song.id]: true };
                        });
                      }}
                      className="far fa-play-circle fa-2x btn"
                    ></i>
                  )}
                </div>

                <div>
                  <div className="h5">{song.name}</div>
                  <div className="text-secondary">{song.artistName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistDisplay;

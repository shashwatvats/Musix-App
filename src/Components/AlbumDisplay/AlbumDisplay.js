import React, { useEffect, useState } from "react";

function AlbumDisplay(props) {
  const { album } = props;
  const [songs, setsongs] = useState([]);
  const [playbutton, setplaybutton] = useState({});

  useEffect(() => {
    fetch(
      `${album.links.tracks.href}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`
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
              src={`https://api.napster.com/imageserver/v2/albums/${album.id}/images/500x500.jpg`}
              alt="..."
              style={{ borderRadius: "25px" }}
            />

            <div>
              <p className="h4 mt-4">Featured Artist</p>
              <div className="d-flex align-items-center">
                <img
                  src={`https://api.napster.com/imageserver/v2/artists/${album.links.artists.ids[0]}/images/170x170.jpg`}
                  alt="..."
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                  }}
                  className="me-2"
                />

                <div className="d-flex flex-column">
                  <p className="mt-2 h5">{album.artistName}</p>
                  <p className="text-secondary">Singer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-12  col-md-7">
            <p className="h2">{album.name}</p>
            <p>{album.label}</p>
            {songs.map((song) => (
              <div className="d-flex align-content-center p-2 mb-1">
                <img
                  src={`https://api.napster.com/imageserver/v2/albums/${album.id}/images/70x70.jpg`}
                  alt="..."
                  style={{ borderRadius: "5px" }}
                  className="me-2"
                />
                <div>
                  <audio
                    src={song.previewURL}
                    id={`albumPlay-${song.id}`}
                  ></audio>

                  {playbutton[song.id] ? (
                    <i
                      onClick={() => {
                        document.getElementById(`albumPlay-${song.id}`).pause();
                        setplaybutton((prevState) => {
                          return { ...prevState, [song.id]: false };
                        });
                      }}
                      class="far fa-pause-circle fa-2x btn"
                    ></i>
                  ) : (
                    <i
                      onClick={() => {
                        document.getElementById(`albumPlay-${song.id}`).play();
                        setplaybutton((prevState) => {
                          return { ...prevState, [song.id]: true };
                        });
                      }}
                      class="far fa-play-circle fa-2x btn"
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

export default AlbumDisplay;

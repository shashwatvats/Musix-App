import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  }, [album.links.tracks.href]);
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 mb-4 col-md-4">
            <img
              className="img-fluid"
              onError={(e) => { e.target.src = "data:image/png;base64,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" }}
              src={`https://api.napster.com/imageserver/v2/albums/${album.id}/images/500x500.jpg`}
              alt="..."
              style={{ borderRadius: "25px" }}
            />

            <div>
              <p className="h4 mt-4">Featured Artist</p>
              <div className="d-flex align-items-center">
                <Link exact to={`/artists/${album.links.artists.ids[0]}`}>
                  <img
                    onError={(e) => { e.target.src = "data:image/png;base64,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" }}
                    src={`https://api.napster.com/imageserver/v2/artists/${album.links.artists.ids[0]}/images/170x170.jpg`}
                    alt="..."
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                    }}
                    className="me-2"
                  />
                </Link>

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
              <div key={song.id} className="d-flex align-content-center p-2 mb-1">
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
                      className="far fa-pause-circle fa-2x btn"
                    ></i>
                  ) : (
                    <i
                      onClick={() => {
                        document.getElementById(`albumPlay-${song.id}`).play();
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

export default AlbumDisplay;

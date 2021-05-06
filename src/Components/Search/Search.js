import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import MultiSelect from "../controls/multiSelect/MultiSelect";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

function Search(props) {
  const [playbutton, setplaybutton] = useState({});
  const [types, settypes] = useState([]);
  const [query, setquery] = useState("");
  const [searchData, setsearchData] = useState({});
  const [loading, setloading] = useState(false);

  const queryHandler = (e) => {
    if (types.length === 0 || query === "") {
      props.setseverity("error");
      props.setsnackOpen(true);
      props.setsnackMessage("Select parameter and fill query");
      return;
    }
    setloading(true);

    let typesString = types.join(",");
    fetch(
      `http://api.napster.com/v2.2/search/verbose?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=${query}&type=${typesString}&per_type_limit=5
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setsearchData(data.search.data);
        setloading(false);
      });
  };

  const multiSelecthandler = (e) => {
    settypes(e.target.value);
  };

  return (
    <div className="container">
      <div className=" d-flex justify-content-around flex-wrap">
        <div>
          <MultiSelect
            id="MultiselectCypress"
            types={types}
            handleChange={(e) => multiSelecthandler(e)}
          />
        </div>
        <div
          className="form-group d-flex align-items-center  mt-2 col-md-4"
          data-testid="form1"
        >
          <input
            type="search"
            id="queryCypress"
            className="form-control col-md-3"
            placeholder="Query"
            value={query}
            onChange={(e) => {
              setquery(e.target.value);
            }}
          />

          <button
            type="button"
            className="btn btn-primary searchCypress"
            onClick={queryHandler}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {searchData.tracks ? (
            <div>
              <h2>Tracks</h2>
              <div className="d-flex justify-content-around mb-2 mt-2 slide-container flex-wrap">
                {searchData.tracks.map((track) => (
                  <Card
                    key={track.id}
                    className="m-2 p-0"
                    style={{ width: "12rem" }}
                  >
                    <Card.Img
                      variant="top"
                      className="img-fluid"
                      src={`https://api.napster.com/imageserver/v2/albums/${track.albumId}/images/500x500.jpg`}
                      alt="Not Available"
                    />
                    <audio
                      src={track.previewURL}
                      id={`trackPlay-${track.id}`}
                    ></audio>
                    {playbutton[track.id] ? (
                      <i
                        onClick={() => {
                          document
                            .getElementById(`trackPlay-${track.id}`)
                            .pause();
                          setplaybutton((prevState) => {
                            return { ...prevState, [track.id]: false };
                          });
                        }}
                        className="far fa-pause-circle fa-2x btn"
                      ></i>
                    ) : (
                      <i
                        onClick={() => {
                          document
                            .getElementById(`trackPlay-${track.id}`)
                            .play();
                          setplaybutton((prevState) => {
                            return { ...prevState, [track.id]: true };
                          });
                        }}
                        className="far fa-play-circle fa-2x btn"
                      ></i>
                    )}
                    <Card.Body>
                      <Card.Title>{track.name}</Card.Title>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {searchData.artists ? (
            <div>
              <h2>Artists</h2>
              <div className="d-flex justify-content-around mb-2 mt-2 flex-wrap">
                {searchData.artists.map((artist) => (
                  <Card
                    key={artist.id}
                    className="m-2 p-0"
                    style={{ width: "12rem" }}
                  >
                    <Link exact to={`/artists/${artist.id}`}>
                      <Card.Img
                        variant="top"
                        src={`https://api.napster.com/imageserver/v2/artists/${artist.id}/images/200x200.jpg`}
                        alt="Not Available"
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title>{artist.name}</Card.Title>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {searchData.albums ? (
            <div>
              <h2>Albums</h2>
              <div className="d-flex justify-content-around mb-2 mt-2 flex-wrap">
                {searchData.albums.map((album) => (
                  <Card
                    key={album.id}
                    className="m-2 p-0"
                    style={{ width: "12rem" }}
                  >
                    <Link exact to={`/albums/${album.id}`}>
                      <Card.Img
                        variant="top"
                        src={`https://api.napster.com/imageserver/v2/albums/${album.id}/images/200x200.jpg`}
                        alt="Not Available"
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title>{album.name}</Card.Title>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {searchData.playlists ? (
            <div>
              <h2>Playlists</h2>
              <div className="d-flex justify-content-around mb-2 mt-2 flex-wrap">
                {searchData.playlists.map((playlist) => (
                  <Card
                    key={playlist.id}
                    className="m-2 p-0"
                    style={{ width: "12rem" }}
                  >
                    <Card.Img
                      variant="top"
                      src={`${playlist.images[0].url}`}
                      alt="Not Available"
                    />
                    <Card.Body>
                      <Card.Title>{playlist.name}</Card.Title>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}{" "}
        </div>
      )}
    </div>
  );
}

export default Search;

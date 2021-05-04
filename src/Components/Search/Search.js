import React, { useState, useContext } from "react";
import { AppContext } from "../../App";
import Card from "react-bootstrap/Card";
import MultiSelect from "../controls/multiSelect/MultiSelect";
import SliderAlbum from "../SliderAlbum/SliderAlbum";
import SliderArtist from "../SliderArtist/SliderArtist";
import SliderPlaylist from "../SliderPlaylist/SliderPlaylist";
import { Link } from "react-router-dom";

function Search() {
  const [playbutton, setplaybutton] = useState({});
  const [types, settypes] = useState([]);
  const [limit, setlimit] = useState("");
  const [query, setquery] = useState("");
  const [searchData, setsearchData] = useState({});
  const screenSize = useContext(AppContext);

  //   const limitChangeHandler = (e) => {
  //     setlimit(e.target.value);
  //   };
  var arr = [];
  const queryHandler = (e) => {
    if (types.length == 0 || query == "") {
      alert("Please fill the details");
      return;
    }

    let typesString = types.join(",");
    fetch(
      `http://api.napster.com/v2.2/search/verbose?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=${query}&type=${typesString}&per_type_limit=5
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setsearchData(data.search.data);
        console.log(data.search.data);
        // for (let key in searchData) {
        //   if (key == "albums") {
        //     <div className="container">
        //         {arr.push(<div className="container">
        //       <Card style={{ width: "18rem" }}>
        //         <Card.Img variant="top" src="holder.js/100px180" />
        //         <Card.Body>
        //           <Card.Title>Card Title</Card.Title>
        //           <Card.Text>
        //             Some quick example text to build on the card title and make
        //             up the bulk of the card's content.
        //           </Card.Text>

        //         </Card.Body>
        //       </Card>
        //     </div>)}
        //     </div>
        //   } else if (key == "artists") {
        //      <div className="container">
        //        {arr.push(
        //          <div className="container">
        //            <Card style={{ width: "18rem" }}>
        //              <Card.Img variant="top" src="holder.js/100px180" />
        //              <Card.Body>
        //                <Card.Title>Card Title</Card.Title>
        //                <Card.Text>
        //                  Some quick example text to build on the card title and
        //                  make up the bulk of the card's content.
        //                </Card.Text>
        //              </Card.Body>
        //            </Card>
        //          </div>
        //        )}
        //      </div>;
        //   } else if (key == "playlists") {
        //      <div className="container">
        //        {arr.push(
        //          <div className="container">
        //            <Card style={{ width: "18rem" }}>
        //              <Card.Img variant="top" src="holder.js/100px180" />
        //              <Card.Body>
        //                <Card.Title>Card Title</Card.Title>
        //                <Card.Text>
        //                  Some quick example text to build on the card title and
        //                  make up the bulk of the card's content.
        //                </Card.Text>
        //              </Card.Body>
        //            </Card>
        //          </div>
        //        )}
        //      </div>;
        //   }
        //   // else if(key=='tracks')
        // }
      });
    console.log(searchData);
  };

  const multiSelecthandler = (e) => {
    settypes(e.target.value);
  };

  return (
    <div>
      <div className="d-flex justify-content-around align-tems-baseline flex-wrap">
        <MultiSelect
          types={types}
          handleChange={(e) => multiSelecthandler(e)}
        />
        {/* <div>
          <select
            id="limit"
            className="form-select form-select-lg p-2"
            aria-label="Default select example"
            onChange={(event) => {
              limitChangeHandler(event);
            }}
          >
            <option selected disabled value>
              Select the Limit
            </option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div> */}

        <div className="form-group d-flex">
          <div className="form-outline">
            <input
              type="search"
              className="form-control"
              placeholder="Query"
              value={query}
              onChange={(e) => {
                setquery(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={queryHandler}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      {searchData.tracks ? (
        <div className="container mb-2 mt-2">
          <div className="row">
            <h2>Tracks</h2>
            {searchData.tracks.map((track) => (
              <Card className="me-2" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`https://api.napster.com/imageserver/v2/albums/${track.albumId}/images/200x200.jpg`}
                  alt="Image Not Available"
                />
                <audio
                  src={track.previewURL}
                  id={`trackPlay-${track.id}`}
                ></audio>
                {playbutton[track.id] ? (
                  <i
                    onClick={() => {
                      document.getElementById(`trackPlay-${track.id}`).pause();
                      setplaybutton((prevState) => {
                        return { ...prevState, [track.id]: false };
                      });
                    }}
                    class="far fa-pause-circle fa-2x btn"
                  ></i>
                ) : (
                  <i
                    onClick={() => {
                      document.getElementById(`trackPlay-${track.id}`).play();
                      setplaybutton((prevState) => {
                        return { ...prevState, [track.id]: true };
                      });
                    }}
                    class="far fa-play-circle fa-2x btn"
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
        <div className="container mb-2 mt-2">
          <div className="row">
            <h2>Artists</h2>
            {searchData.artists.map((artist) => (
              <Card className="me-2" style={{ width: "18rem" }}>
                <Link exact to={`/artists/${artist.id}`}>
                  <Card.Img
                    variant="top"
                    src={`https://api.napster.com/imageserver/v2/artists/${artist.id}/images/200x200.jpg`}
                    alt="Image Not Available"
                  />
                  <Card.Body>
                    <Card.Title>{artist.name}</Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      {searchData.albums ? (
        <div className="container mb-2 mt-2">
          <div className="row">
            <h2>Albums</h2>
            {searchData.albums.map((album) => (
              <Card className="me-2" style={{ width: "18rem" }}>
                <Link exact to={`/albums/${album.id}`}>
                  <Card.Img
                    variant="top"
                    src={`https://api.napster.com/imageserver/v2/albums/${album.id}/images/200x200.jpg`}
                    alt="Image Not Available"
                  />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      {searchData.playlists ? (
        <div className="container mb-2 mt-2">
          <div className="row">
            <h2>Playlists</h2>
            {searchData.playlists.map((playlist) => (
              <Card className="me-2" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`${playlist.images[0].url}`}
                  alt="Image Not Available"
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
      )}
    </div>
  );
}

export default Search;
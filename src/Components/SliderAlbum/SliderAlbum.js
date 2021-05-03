import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
function SliderAlbum(props) {
  const { screenSize } = props;
  const [albums, setalbums] = useState([]);
  let arr = [];
  useEffect(() => {
    fetch(
      "http://api.napster.com/v2.2/albums/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=12"
    )
      .then((res) => res.json())
      .then((data) => {
        setalbums(data.albums);
      });
  }, []);

  let sizes = [576, 992, 1400];
  let carouselsize = [2, 4, 6];

  for (let j = 0; j < 3; j++) {
    if (screenSize < sizes[j]) {
      arr = [];
      let active = "active";
      for (let i = 0; i < 12; i += carouselsize[j]) {
        if (i != 0) active = "";
        arr.push(
          <div class={`carousel-item ${active}`}>
            <div className="row">
              {albums.slice(i, i + carouselsize[j]).map((album) => (
                <div class="col-6 col-sm-3 col-md-3 col-lg-2 p-2 card border-0 ">
                  <Link to={`/albums/${album.id}`}>
                    {" "}
                    <img
                      src={`https://api.napster.com/imageserver/v2/albums/${album.id}/images/500x500.jpg`}
                      className="card-img-top"
                      style={{ borderRadius: "12px" }}
                      alt="..."
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{album.name}</h5>
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

  return (
    <Paper className="mb-3" elevation={7} style={{ padding: "10px" }}>
      <div className="h4 text-danger">Albums</div>
      <div
        id="album"
        class="carousel slide carousel-fade"
        // data-bs-ride="carousel"
        data-interval="false"
      >
        <div class="carousel-inner">{arr}</div>

        <button
          class="carousel-control-prev"
          type="button"
          style={{ height: "50%", width: "5%" }}
          data-bs-target="#album"
          data-bs-slide="prev"
        >
          <span
            style={{ backgroundColor: "rgba(0,0,0,.6)" }}
            class="carousel-control-prev-icon rounded-circle"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          style={{ height: "50%", width: "5%" }}
          data-bs-target="#album"
          data-bs-slide="next"
        >
          <span
            style={{ backgroundColor: "rgba(0,0,0,.6)" }}
            class="carousel-control-next-icon rounded-circle"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </Paper>
  );
}

export default SliderAlbum;

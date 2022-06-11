import React, { useState, useEffect, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
function SliderGenre(props) {
  const screenSize = useContext(AppContext);
  const [genres, setgenres] = useState([]);
  let arr = [];
  useEffect(() => {
    fetch(
      "https://api.napster.com/v2.2/genres?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=12"
    )
      .then((res) => res.json())
      .then((data) => {
        setgenres(data.genres);
      })
      .catch((err) => {
        console.error('Error: ' + err)
      });
  }, []);

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
              {genres.slice(i, i + carouselsize[j]).map((genre) => (
                <div
                  key={genre.id}
                  className="col-6 col-sm-3 col-md-3 col-lg-2 p-2 card border-0 "
                >
                  <Link to={`/genres/${genre.id}`}>
                    <img
                      src={`https://api.napster.com/imageserver/images/${genre.id}/240x160.jpg`}
                      className="card-img-top sliderGenreImg genreCypress"
                      style={{ borderRadius: "12px" }}
                      alt="..."
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{genre.name}</h5>
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
      <div className="h4 text-danger">Genres</div>
      <div
        id="genre"
        className="carousel slide carousel-fade"
        // data-bs-ride="carousel"
        data-interval="false"
      >
        <div className="carousel-inner">{arr}</div>

        <button
          className="carousel-control-prev"
          type="button"
          style={{ height: "50%", width: "5%" }}
          data-bs-target="#genre"
          data-bs-slide="prev"
        >
          <span
            style={{ backgroundColor: "rgba(0,0,0,.6)" }}
            className="carousel-control-prev-icon rounded-circle"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          style={{ height: "50%", width: "5%" }}
          data-bs-target="#genre"
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

export default SliderGenre;

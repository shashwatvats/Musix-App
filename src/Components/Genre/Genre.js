import React, { useEffect, useState } from "react";
import GenreDisplay from "../GenreDisplay/GenreDisplay";
import Spinner from "../Spinner/Spinner";

function Genre(props) {
  const [genre, setgenre] = useState({});
  const [loading, setloading] = useState(true)

  useEffect(() => {
    fetch(
      `https://api.napster.com/v2.2/genres/${props.match.params.genreId}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`
    )
      .then((res) => res.json())
      .then((data) => {
        setgenre(data.genres[0]);
        setloading(false);
      })
      .catch((err) => {
        console.error('Error: ' + err)
      });
  }, [props.match.params.genreId]);
  return (
    loading ? <Spinner /> :
      <div>
        {/* {genre.links.tracks.href} */}
        <GenreDisplay genre={genre} />
      </div>
  );
}

export default Genre;

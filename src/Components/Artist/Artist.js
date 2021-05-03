import React, { useEffect, useState } from "react";
import ArtistDisplay from "../ArtistDisplay/ArtistDisplay";

function Artist(props) {
  const [artist, setartist] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.napster.com/v2.2/artists/${props.match.params.artistId}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`
    )
      .then((res) => res.json())
      .then((data) => {
        setartist(data.artists[0]);
        setloading(false);
        console.log(data.artists[0]);
      });
  }, []);
  return loading ? (
    ""
  ) : (
    <div>
      {/* {artist.links.tracks.href} */}
      <ArtistDisplay artist={artist} />
    </div>
  );
}

export default Artist;

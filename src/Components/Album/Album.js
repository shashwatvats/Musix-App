import React, { useEffect, useState } from "react";
import AlbumDisplay from "../AlbumDisplay/AlbumDisplay";
import Spinner from "../Spinner/Spinner";

function Album(props) {
  const [album, setalbum] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.napster.com/v2.2/albums/${props.match.params.albumId}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`
    )
      .then((res) => res.json())
      .then((data) => {
        setalbum(data.albums[0]);
        setloading(false);
      })
      .catch((err) => {
        console.error('Error: ' + err)
      });
  }, [props.match.params.albumId]);
  return loading ? (
    <Spinner />
  ) : (
    <div>
      {/* {album.links.tracks.href} */}
      <AlbumDisplay album={album} />
    </div>
  );
}

export default Album;

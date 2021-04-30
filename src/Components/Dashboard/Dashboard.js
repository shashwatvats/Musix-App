import React, {useState, useEffect} from 'react'
import Slider from '../Slider/Slider';

function Dashboard() {
    const [playlists, setplaylists] = useState([]);
    const [loading, setloading] = useState(true);
    const [screenSize, setscreenSize] = useState(window.innerWidth);
    useEffect(() => {
        fetch("https://api.napster.com/v2.2/playlists?limit=5&apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4")
        .then(res=>res.json())
        .then(data=> {
            setplaylists(data.playlists.map(playlist=> { return {id:playlist.id,name: playlist.name, link : playlist.links.tracks.href}}));
            setloading(false);
        })
    }, [])
    window.onresize = function () {
        setscreenSize(window.innerWidth);
    }
    return (
       loading ? "" : <div>
          { playlists.map(playlist => <Slider screenSize={screenSize} key={playlist.id} playlist={playlist} />) }
          
          {/* <Slider playlist={playlists[0]} screenSize={screenSize} />
          <Slider playlist={playlists[1]}  screenSize={screenSize} /> */}
       </div>
    )
}

export default Dashboard

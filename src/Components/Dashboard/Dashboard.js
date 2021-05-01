import React, {useState, useEffect} from 'react'
import Slider from '../Slider/Slider';
import Carousel from "react-bootstrap/Carousel";
import Paper from '@material-ui/core/Paper'
import "./Dashboard.css";
function Dashboard() {
    const [playlists, setplaylists] = useState([]);
    const [tracks, settracks] = useState([]);
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
    useEffect(()=>{
        fetch(
            "http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10"
          )
            .then((res) => res.json())
            .then((data) => {
              settracks(data.tracks);
            });
    },[]);
    window.onresize = function () {
        setscreenSize(window.innerWidth);
    }
    return (

       loading ? "" : <div class="container">
         
           <Carousel className="main-carousel mx-auto mb-3" fade style={{ width: "100%" }}>
        {tracks.map((item) => (
          <Carousel.Item>
            <img
              style={{ objectFit: "cover", borderRadius: "15px" }}
              className="d-block w-100"
              src={`https://api.napster.com/imageserver/v2/albums/${item.albumId}/images/500x500.jpg`}
              alt="First slide"
            />
            <Carousel.Caption>
              <a href={item.previewURL}>
                <i class="far fa-play-circle fa-3x mb-2"></i>
              </a>
              <h4>{item.name}</h4>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    
          { playlists.map(playlist => <Slider screenSize={screenSize} key={playlist.id} playlist={playlist} />) }
          
          {/* <Slider playlist={playlists[0]} screenSize={screenSize} />
          <Slider playlist={playlists[1]}  screenSize={screenSize} /> */}
       </div>
    )
}

export default Dashboard
import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';

function Slider(props) {
    // const [screenSize, setscreenSize] = useState(window.innerWidth);
    const [songs, setsongs] = useState([]);
    const [loading, setloading] = useState(true);
    const { playlist,screenSize } = props;
    let arr = [];
   
//Bhai meet join kar//
    function carouselSlider() {
        console.log('bkj');
        let sizes = [576, 992, 1400];
        let carouselsize = [2, 4, 6];

        for (let j = 0; j < 3; j++) {
            if (screenSize < sizes[j]) {
                arr = [];
                let active = "active";
                for (let i = 0; i < 12; i += carouselsize[j]) {
                    if (i != 0)
                        active = "";
                    arr.push(<div class={`carousel-item ${active}`}>
                        <div className="row">
                            {songs.slice(i, i + carouselsize[j]).map(song =>
                                <div class="col-6 col-sm-3 col-md-3 col-lg-2 p-2">
                                    <img src={`https://api.napster.com/imageserver/v2/albums/${song.albumId}/images/500x500.jpg`}
                                        className="img-fluid"
                                        alt="..."
                                    />
                                </div>
                            )}
                        </div>
                    </div>);

                }
                break;
            }
        }
    }

    
    useEffect(() => {
        fetch(`${playlist.link}?limit=12&apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`)
            .then(res => res.json())
            .then(data => {
                setsongs(data.tracks);
                setloading(false);
                console.log(data.tracks);
                carouselSlider();
            })
    }, [])

    carouselSlider();
    return (
        loading? "" : <Paper elevation={3} style={{ width: '70%', padding: '10px' }}>
            <div>
                {playlist.name}
            </div>
            <div
                id={`playlist-${playlist.id.slice(3)}`}
                class="carousel slide carousel-fade"
                // data-bs-ride="carousel"
                data-interval="false"
            >
                <div class="carousel-inner">
                    {arr}
                </div>

                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target={`#playlist-${playlist.id.slice(3)}`}
                    data-bs-slide="prev"
                >
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target={`#playlist-${playlist.id.slice(3)}`}
                    data-bs-slide="next"
                >
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

        </Paper>
    )
}

export default Slider;

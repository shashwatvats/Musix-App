import React, { useState } from 'react'
import DeleteIcon from "@material-ui/icons/Delete";

function SeeAllFavourites(props) {
    const { favourites, deleteFavourite } = props;
    const [playbutton, setplaybutton] = useState({})



    return (
        <div>
            <div className="h4 text-danger mt-4 text-center">Favourite Songs</div>
            <div className="d-flex flex-wrap justify-content-around">
                {favourites
                    .map((favouriteSong) => (
                        <div
                            style={{ width: "12rem" }}
                            key={favouriteSong.id}
                            className="card border-0 slide-container m-4"
                        >
                            <img
                                src={`https://api.napster.com/imageserver/v2/albums/${favouriteSong.albumId}/images/500x500.jpg`}
                                className="card-img-top"
                                style={{ borderRadius: "12px" }}
                                alt="..."
                            />
                            <div>
                                <audio
                                    src={favouriteSong.previewURL}
                                    id={`favplay-${favouriteSong.id}`}
                                ></audio>

                                {playbutton[favouriteSong.id] ? (
                                    <i
                                        onClick={() => {
                                            document
                                                .getElementById(`favplay-${favouriteSong.id}`)
                                                .pause();
                                            setplaybutton((prevState) => {
                                                return {
                                                    ...prevState,
                                                    [favouriteSong.id]: false,
                                                };
                                            });
                                        }}
                                        className="far fa-pause-circle fa-2x btn"
                                    ></i>
                                ) : (
                                    <i
                                        onClick={() => {
                                            document
                                                .getElementById(`favplay-${favouriteSong.id}`)
                                                .play();
                                            setplaybutton((prevState) => {
                                                return {
                                                    ...prevState,
                                                    [favouriteSong.id]: true,
                                                };
                                            });
                                        }}
                                        className="far fa-play-circle fa-2x btn"
                                    ></i>
                                )}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">
                                    {favouriteSong.name.split("(").shift()}
                                </h5>
                                <DeleteIcon
                                    className="deleteFav"
                                    color="secondary"
                                    onClick={() => {
                                        deleteFavourite(favouriteSong.id);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default SeeAllFavourites

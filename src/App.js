import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import Modal from "./Components/Modal/Modal";
import Login from "./Components/Login/Login";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Register from "./Components/Register/Register";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Dashboard from "./Components/Dashboard/Dashboard";
import Album from "./Components/Album/Album";
import Artist from "./Components/Artist/Artist";
import Genre from "./Components/Genre/Genre";
import Search from "./Components/Search/Search";
import SeeAllFavourites from "./Components/SeeAllFavourites/SeeAllFavourites";
export const AppContext = React.createContext();

function App() {
  const [screenSize, setscreenSize] = useState(window.innerWidth);
  const [favourites, setfavourites] = useState([]);
  const [snackOpen, setsnackOpen] = useState(false);
  const [snackMessage, setsnackMessage] = useState("");
  const [severity, setseverity] = useState("");
  const [modalOpen, setmodalOpen] = useState(false);
  const [type, settype] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);


  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  window.onresize = function () {
    setscreenSize(window.innerWidth);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setsnackOpen(false);
  };

  async function deleteFavourite(id) {
    await fetch(`http://localhost:4000/favourites/${id}`, {
      method: "DELETE",
    });
    setfavourites(favourites.filter(favourite => favourite.id !== id));
  }


  function addToFavourite(song) {
    fetch("http://localhost:4000/favourites", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: `${localStorage.getItem("email")}-${song.id}`,
        email: localStorage.getItem("email"),
        albumId: song.albumId,
        previewURL: song.previewURL,
        name: song.name,
      }),
    }).then(res => res.json())
      .then(favourite => {
        setfavourites([...favourites,favourite])
      });

  }

  useEffect(() => {
    fetch(
      `http://localhost:4000/favourites?email=${localStorage.getItem("email")}`
    )
      .then((res) => res.json())
      .then((favouritess) => {
        setfavourites(favouritess);
      });
  }, []);



  let component = "";
  if (type === "login")
    component = (
      <Login
        setsnackMessage={setsnackMessage}
        setsnackOpen={setsnackOpen}
        setseverity={setseverity}
        setmodalOpen={setmodalOpen}
        settype={settype}
        setisLoggedIn={setisLoggedIn}
      // setfirstName={setfirstName}
      />
    );
  else if (type === "register")
    component = (
      <Register
        setsnackMessage={setsnackMessage}
        setsnackOpen={setsnackOpen}
        setseverity={setseverity}
        setmodalOpen={setmodalOpen}
        settype={settype}
      />
    );

  useEffect(() => {
    fetch("http://localhost:9000/auth/isAuthenticated", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isAuthenticated) {
          setisLoggedIn(true);
        }
      });
  }, []);
  return (
    <div>
      <BrowserRouter>
        <div style={{ width: "100vw", height: "11vh" }}>
          <Header
            setmodalOpen={setmodalOpen}
            settype={settype}
            isLoggedIn={isLoggedIn}
            setisLoggedIn={setisLoggedIn}
          />
        </div>
        <AppContext.Provider value={screenSize}>
          <div
            id="mainPage"
            style={{
              width: "100vw",
              height: "89vh",
              overflow: "auto",
            }}
          >
            <Switch>
              <Route
                exact
                path="/dashboard"
                render={(props) =>
                  isLoggedIn ? <Dashboard {...props} favourites={favourites}  deleteFavourite={deleteFavourite} addToFavourite={addToFavourite} /> : <Redirect to="/" />
                }
              />
              <Route
                exact
                path="/"
                render={() =>
                  isLoggedIn ? <Redirect to="/dashboard" /> : <Home />
                }
              />
              <Route exact path="/albums/:albumId" component={Album} />
              <Route exact path="/artists/:artistId" component={Artist} />
              <Route exact path="/genres/:genreId" component={Genre} />
              <Route exact path="/seeAllFavourites" render={(props) => isLoggedIn ? <SeeAllFavourites {...props} favourites={favourites} deleteFavourite={deleteFavourite} /> : <Redirect to="/" />} />

              <Route
                exact
                path="/search"
                render={(props) => (
                  <Search
                    {...props}
                    setsnackMessage={setsnackMessage}
                    setsnackOpen={setsnackOpen}
                    setseverity={setseverity}
                    isLoggedIn={isLoggedIn}
                    favourites={favourites}
                    setfavourites={setfavourites}
                    deleteFavourite={deleteFavourite}
                    addToFavourite={addToFavourite}
                  />
                )}
              />
            </Switch>

            <Modal
              open={modalOpen}
              handleClose={() => {
                setmodalOpen(false);
              }}
            >
              {component}
            </Modal>
          </div>
        </AppContext.Provider>
      </BrowserRouter>
      <Snackbar
        open={snackOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

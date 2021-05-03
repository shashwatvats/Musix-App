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

function App() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setsnackOpen(false);
  };
  const [snackOpen, setsnackOpen] = useState(false);
  const [snackMessage, setsnackMessage] = useState("");
  const [severity, setseverity] = useState("");
  const [modalOpen, setmodalOpen] = useState(false);
  const [type, settype] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  // const [firstName, setfirstName] = useState("")

  let component = "";
  if (type == "login")
    component = <Login setsnackMessage={setsnackMessage}
      setsnackOpen={setsnackOpen}
      setseverity={setseverity}
      setmodalOpen={setmodalOpen}
      settype={settype}
      setisLoggedIn={setisLoggedIn}
      // setfirstName={setfirstName}
    />
  else if (type == "register")
    component = <Register setsnackMessage={setsnackMessage}
      setsnackOpen={setsnackOpen}
      setseverity={setseverity}
      setmodalOpen={setmodalOpen}
      settype={settype}
    />

  useEffect(() => {
    fetch("http://localhost:9000/auth/isAuthenticated", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => res.json())
      .then(data => {
        if (data.isAuthenticated) {
          setisLoggedIn(true);
        }
      });
  }, [])
  return (
    <div>
      <BrowserRouter>
        <div style={{ width: "100vw", height: "10vh" }}>
          <Header setmodalOpen={setmodalOpen} settype={settype} isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />
        </div>
        <div style={{ width: "100vw", height: "90vh", overflow: "auto" }}>
          <Switch>
            <Route exact path="/dashboard" render={() => isLoggedIn ? <Dashboard /> : <Redirect to="/" /> } />
            <Route exact path="/" render={() => isLoggedIn ? <Redirect to="/dashboard" /> : <Home /> } />
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



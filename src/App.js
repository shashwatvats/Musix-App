import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import Modal from "./Components/Modal/Modal";
import Login from "./Components/Login/Login";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function App() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [open, setOpen] = React.useState(true);
  return (
    <div>
      <BrowserRouter>
        <div style={{ width: "100vw", height: "12vh" }}>
          <Header />
        </div>
        <div style={{ width: "100vw", height: "12vh", overflow: "auto" }}>
          <Modal
            open={true}
            handleClose={() => {
              console.log("closed");
            }}
          >
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Modal>
        </div>
      </BrowserRouter>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Login Successful!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

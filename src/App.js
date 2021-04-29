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

    setsnackOpen(false);
  };
  const [snackOpen, setsnackOpen] = useState(false);
  const [snackMessage, setsnackMessage] = useState("");
const [severity, setseverity] = useState("");
const [modalOpen, setmodalOpen] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <div style={{ width: "100vw", height: "12vh" }}>
          <Header setmodalOpen={setmodalOpen} />
        </div>
        <div style={{ width: "100vw", height: "12vh", overflow: "auto" }}>
          <Modal
            open={modalOpen}
            handleClose={() => {
              setmodalOpen(false);
            }}
          >
            <Route
              exact
              path="/register"
              render={(props) => (
                <Register
                  {...props}
                  setsnackMessage={setsnackMessage}
                  setsnackOpen={setsnackOpen}
                  setseverity={setseverity}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  setsnackMessage={setsnackMessage}
                  setsnackOpen={setsnackOpen}
                  setseverity={setseverity}
                />
              )}
            />
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

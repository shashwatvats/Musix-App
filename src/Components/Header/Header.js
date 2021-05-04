import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

function Header(props) {
  let history = useHistory();

  function logOutHandler() {
    props.setisLoggedIn(false);
    localStorage.clear();
    history.push("/");
  }

  return (
    <div>
      <nav style={{zIndex:2}} class="navbar navbar-expand-sm navbar-dark bg-dark justify-content-between">
        <div class="container-fluid">
          <span class="navbar-brand">
            <img
              src="https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200"
              alt=""
              width="34"
              height="34"
              style={{ borderRadius: "50%" }}
              class="d-inline-block align-text-top me-2"
            ></img>
            Musix App
          </span>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse "
            style={{ flexGrow: "0" }}
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NavLink activeStyle={{fontWeight:'bold'}} className="nav-link"  to="/">
                  Home
                </NavLink>
              </li>
              {props.isLoggedIn ? (
                <li className="nav-item">
                  <span class="nav-link">
                    Welcome,<b>{localStorage.getItem("firstName")}</b>
                  </span>{" "}
                </li>
              ) : (
                <li class="nav-item">
                  <Button
                    className="nav-link"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      props.setmodalOpen(true);
                      props.settype("login");
                    }}
                  >
                    LogIn/SignUp <i class="fas fa-sign-in-alt"></i>
                  </Button>
                </li>
              )}

              {props.isLoggedIn ? (
                <li className="nav-item">
                  <Button
                    className="nav-link"
                    variant="contained"
                    color="primary"
                    onClick={logOutHandler}
                  >
                    LogOut <i class="fas fa-sign-in-alt"></i>
                  </Button>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

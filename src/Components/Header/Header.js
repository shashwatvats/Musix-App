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
      <nav
        style={{ zIndex: 2, backgroundColor: "#792c2c" }}
        class="navbar navbar-expand-sm navbar-dark  justify-content-between"
      >
        <div class="container-fluid">
          <NavLink
            exact
            activeStyle={{ fontWeight: "bold" }}
            className="nav-link"
            to="/"
          >
            <span class="navbar-brand d-flex align-items-center">
              <img
                src="data:image/png;base64,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"
                alt=""
                width="34"
                height="34"
                style={{ borderRadius: "50%" }}
                class="d-inline-block align-text-top me-2"
              ></img>
              Miuzik Mania
            </span>
          </NavLink>
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
                {props.isLoggedIn ? (
                  <NavLink
                    exact
                    activeStyle={{ fontWeight: "bold" }}
                    className="nav-link"
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <NavLink
                    exact
                    activeStyle={{ fontWeight: "bold" }}
                    className="nav-link"
                    to="/"
                  >
                    Home
                  </NavLink>
                )}
              </li>
              <li class="nav-item">
                <NavLink
                  exact
                  activeStyle={{ fontWeight: "bold" }}
                  className="nav-link"
                  to="/search"
                >
                  Search
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
                    style={{ backgroundColor: "#263c3c", color: "white" }}
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
                    style={{ backgroundColor: "#263c3c", color: "white" }}
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

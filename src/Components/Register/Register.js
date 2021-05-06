import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DateRangeIcon from "@material-ui/icons/DateRange";

const useStyles = makeStyles({
  textfield: {
    width: "100%",
    maxWidth: "300px",
  },
});

let passValidation = { display: "none" };
let passLength = { color: "red" };
let passChar = { color: "red" };
let length = false;
let check = false;
let emailValidation = { display: "none" };
let emailValid = { color: "red" };
let checkEmail = false;

function Register(props) {
  const classes = useStyles();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState("");
  const [city, setcity] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [error, seterror] = useState("");

  const register = () => {
    if (
      password === "" ||
      email === "" ||
      firstName === "" ||
      !(check && length) ||
      !checkEmail
    ) {
      props.setseverity("error");
      props.setsnackOpen(true);
      props.setsnackMessage("Desired Password, Email and firstName required!!");
      return;
    }
    fetch("http://localhost:9000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        city,
        age,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          props.setseverity("success");
          props.setsnackOpen(true);
          props.setsnackMessage(data.message);
          // props.setmodalOpen(false);
          props.settype("login");
          return;
        }
        props.setseverity("error");
        props.setsnackOpen(true);
        props.setsnackMessage(data.message);
      })
      .catch((err) => {
        props.setseverity("error");
        props.setsnackOpen(true);
        props.setsnackMessage(err.message);
      });
  };

  useEffect(() => {
    return () => {
      passValidation = { display: "none" };
      passLength = { color: "red" };
      passChar = { color: "red" };
      length = false;
      check = false;
      emailValidation = { display: "none" };
      emailValid = { color: "red" };
      checkEmail = false;
    };
  }, []);

  function validateEmailRegEx(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function emailValidate(e) {
    let Email = e.target.value;
    setemail(Email);
    checkEmail = validateEmailRegEx(Email);
    emailValidation = { display: "block" };
    if (checkEmail) {
      emailValid = { color: "green" };
    } else {
      emailValid = { color: "red" };
    }
  }

  function passwordHandler(e) {
    let pass = e.target.value;
    setpassword(pass);
    passValidation = { display: "block" };
    length = pass.length >= 8;
    if (length) {
      passLength = { color: "green" };
    }
    if (!length) {
      passLength = { color: "red" };
    }
    check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/.test(pass);
    if (check) {
      passChar = { color: "green" };
    }
    if (!check) {
      passChar = { color: "red" };
    }
  }

  return (
    <div className="d-flex" data-testid="containerid">
      <div className="d-none d-sm-block">
        <img
          width="250px"
          height="100%"
          alt="..."
          src="https://images.unsplash.com/photo-1421757350652-9f65a35effc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fG11c2ljfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        ></img>
      </div>
      <div className="d-flex justify-content-center  mt-4 mx-auto">
        <form className="d-flex flex-column align-items-center">
          <div className="h1 text-primary">Register</div>
          <div className="d-flex align-items-baseline">
            <span id="addon-wrapping">
              <i
                className="fas fa-hand-point-right"
                style={{ color: "#f50057" }}
              ></i>
            </span>
            <TextField
              id="firstName"
              className={`${classes.textfield} mb-2 ms-2`}
              label="FirstName"
              onChange={(e) => setfirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div className="d-flex align-items-baseline">
            <span id="addon-wrapping">
              <i
                className="fas fa-hand-point-right"
                style={{ color: "#f50057" }}
              ></i>
            </span>
            <TextField
              id="lastName"
              className={`${classes.textfield} mb-2 ms-2`}
              type="text"
              label="Last Name"
              onChange={(e) => setlastName(e.target.value)}
              value={lastName}
            />
          </div>
          <div className="d-flex align-items-baseline">
            <span id="addon-wrapping">
              <DateRangeIcon style={{ color: "#f50057" }} />
            </span>
            <TextField
              id="age"
              className={`${classes.textfield} mb-2 ms-2`}
              label="Age"
              onChange={(e) => setage(e.target.value)}
              value={age}
            />
          </div>
          <div className="d-flex align-items-baseline">
            <span id="addon-wrapping">
              <i className="far fa-building" style={{ color: "#f50057" }}></i>
            </span>
            <TextField
              id="city"
              className={`${classes.textfield} mb-2 ms-2`}
              label="City"
              onChange={(e) => setcity(e.target.value)}
              value={city}
            />
          </div>
          <div className="d-flex align-items-baseline">
            <span id="addon-wrapping">
              <i className="fas fa-envelope" style={{ color: "#f50057" }}></i>
            </span>
            <TextField
              id="email"
              className={`${classes.textfield} mb-2 ms-2`}
              label="Email"
              onChange={(e) => emailValidate(e)}
              value={email}
            />
          </div>
          <div
            id="EmailValid"
            className="ps-4"
            style={{ ...emailValidation, fontSize: "0.8rem", width: "230px" }}
          >
            <div style={emailValid}>Email should be Valid</div>
          </div>
          <div className="d-flex align-items-baseline">
            <span id="addon-wrapping">
              <i className="fas fa-key" style={{ color: "#f50057" }}></i>
            </span>
            <TextField
              id="password"
              type="password"
              className={`${classes.textfield} mb-2 ms-2`}
              label="Password"
              onChange={(e) => passwordHandler(e)}
              value={password}
            />
          </div>
          <div
            id="passwordValid"
            className="ps-4"
            style={{ ...passValidation, fontSize: "0.8rem", width: "230px" }}
          >
            <div style={passLength}>Password should have minimum length 8</div>
            <div style={passChar}>
              Password should have 1 special character, 1 lowercase and 1
              uppercase
            </div>
          </div>
          <div className="d-flex">
            <Button
              color="secondary"
              variant="contained"
              className={`mt-3 me-3`}
              onClick={register}
            >
              Register
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={`mt-3`}
              onClick={() => {
                props.settype("login");
              }}
            >
              Sign-in
            </Button>
          </div>
          <hr />
          <div className="text-center mb-3">
            <span>
              <i
                style={{ color: "#1877F2", marginRight: "15px" }}
                className="fab fa-facebook-f fa-lg"
              ></i>
            </span>
            <span>
              <i
                style={{ color: "#0B66C2", marginRight: "15px" }}
                className="fab fa-linkedin-in fa-lg"
              ></i>
            </span>
            <span>
              <i
                style={{ color: "#DE4F41", marginRight: "15px" }}
                className="fab fa-google-plus-g fa-lg"
              ></i>
            </span>
            <span>
              <i style={{ color: "black" }} className="fab fa-github fa-lg"></i>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

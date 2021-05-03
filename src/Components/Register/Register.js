import React, { useState } from "react";
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
    if (password == "" || email == "" || firstName == "") {
      props.setseverity("error");
      props.setsnackOpen(true);
      props.setsnackMessage("Password, Email and firstName required!!");
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
        if (data.status == "200") {
            props.setseverity("success");
          props.setsnackOpen(true);
          props.setsnackMessage(data.message);
          // props.setmodalOpen(false);
          props.settype('login');
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

  return (
    <div className="d-flex">
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
                class="fas fa-hand-point-right"
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
                class="fas fa-hand-point-right"
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
              <i class="far fa-building" style={{ color: "#f50057" }}></i>
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
              <i class="fas fa-envelope" style={{ color: "#f50057" }}></i>
            </span>
            <TextField
              id="email"
              className={`${classes.textfield} mb-2 ms-2`}
              label="Email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </div>
          <div className="d-flex align-items-baseline">
            <span id="addon-wrapping">
              <i class="fas fa-key" style={{ color: "#f50057" }}></i>
            </span>
            <TextField
              id="password"
              type="password"
              className={`${classes.textfield} mb-2 ms-2`}
              label="Password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="d-flex">
            <Button
              id="login-button"
              color="secondary"
              variant="contained"
              className={`mt-3 me-3`}
              onClick={register}
            >
              Register
            </Button>
            <Button variant="contained" color="secondary" className={`mt-3`} onClick={()=>{props.settype('login')}}>
            
                Sign-in
             
            </Button>
          </div>
          <hr />
          <div className="text-center mb-3">
            <span>
              <i
                style={{ color: "#1877F2", marginRight: "15px" }}
                class="fab fa-facebook-f fa-lg"
              ></i>
           </span>
           <span>
              <i
                style={{ color: "#0B66C2", marginRight: "15px" }}
                class="fab fa-linkedin-in fa-lg"
              ></i>
            </span>
            <span>
              <i
                style={{ color: "#DE4F41", marginRight: "15px" }}
                class="fab fa-google-plus-g fa-lg"
              ></i>
            </span>
            <span>
              <i style={{ color: "black" }} class="fab fa-github fa-lg"></i>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

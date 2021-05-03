import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles({
  textfield: {
    width: "100%",
    maxWidth: "300px",
  },
});

function Login(props) {
  const classes = useStyles();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

    const loginHandler = () => {
      fetch("http://localhost:9000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status=="200") {
            localStorage.setItem("token", data.access_token);
            props.setseverity("success");
            props.setsnackOpen(true);
            props.setsnackMessage("LoggedIn Successfully!!");
            props.setisLoggedIn(true);
            props.setmodalOpen(false);
            // props.setfirstName(data.userData.firstname);
            localStorage.setItem("firstName",data.userData.firstname);
            localStorage.setItem("email",data.userData.email);
            return;
          }
            props.setseverity("error");
            props.setsnackOpen(true);
            props.setsnackMessage(data.message);

        }).catch(err=> {
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
          src="https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        ></img>
      </div>
      <div className="d-flex justify-content-center  mt-4 mx-auto">
        <form className="d-flex flex-column align-items-center">
          <div className="h1 text-primary">Login</div>
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
              className={`${classes.textfield} mb-2 ms-2`}
              type="password"
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
              onClick={loginHandler}
            >
              Login
            </Button>
            <Button variant="contained" color="secondary" className={`mt-3`} onClick={()=>{props.settype('register')}}>
             
                SignUp
            
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

export default Login;

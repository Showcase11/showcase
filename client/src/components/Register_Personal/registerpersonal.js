import React from "react";
import { GoogleLogin } from 'react-google-login'
import styles from "./registerpersonal.module.css";
import { useState } from "react";
import { Snackbar, Alert, Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UseContext } from "../../App";

// client id 
const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID

const RegisterPersonal = () => {


  const loader=React.useContext(UseContext)
  const {load,setLoad}=loader || {}
  const onFailure = (res) => {
    console.log('[Login Failed] res:', res);
  };

  const [ErrorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true)


  const RegisterIn = async (e) => {
    e.preventDefault();
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    let regxpass = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    const userexist = await fetch("https://api.showcaseurbusiness.com/exist", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const userExistData = await userexist.json();

    if (!regex.test(email)) {
      setOpen(true);
      setErrorMessage("Invalid Email Address");
    } else if (!regxpass.test(password)) {
      setOpen(true);
      setErrorMessage(
        "Password entered should have atleast 8 characters, one uppercase, one lowercase, one number and one special character!"
      );
    } else if (
      userExistData.exist == 0 &&
      regex.test(email) &&
      regxpass.test(password)
    ) {
      try {
        const response = await axios.post(
          "https://api.showcaseurbusiness.com/user/register",
          {
            name: name,
            email: email,
            role: 0,
            password: password,
          }
        );

        setEmail("");
        setName("");
        setPassword("");
        setCheck(false);

        localStorage.setItem(
          "token",
          JSON.stringify(response.data.accesstoken)
        );
        // localStorage.removeItem('token')
        setLoad(!load)
        navigate("/business/cyp2");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    } else if (userExistData.exist == 1) {
      setOpen(true);
      setErrorMessage("User already exist");
    }
  };


  const onSuccess = async (res) => {
    
    setEmail(res.profileObj.email)
    setName(res.profileObj.name)
    // console.log(res.profileObj.email)
    try {
      const response = await axios.post(
        "https://api.showcaseurbusiness.com/user/register",
        {
          name: res.profileObj.name,
          email: res.profileObj.email,
          role: 0,
          google: 'google'
        }
      );

      setEmail("");
      setName("");
      setPassword("");
      setCheck(false);

      localStorage.setItem(
        "token",
        JSON.stringify(response.data.accesstoken)
      );
    
      setLoad(!load)
      navigate("/business/cyp2");
    } catch (error) {
      if (error.response) {
        console.log(error)
        setMsg(error.response.data.msg);
        setOpen(true);
        setErrorMessage(error.response.data.msg);
      }
    }

  };

  return (
    <div className={styles.RP}>
      <div class="col-2">
        <img src="/blue bubble (2).png" style={{ float: "left", marginTop: "95px", marginLeft: "85px" }} />
      </div>
      <form onSubmit={RegisterIn} className="container">
        <div className="form-group">
          <a
            onClick={() => {
              navigate(-1);
            }}
            href="#"
            className={styles.back}
          >
            <b>??? Back</b>
          </a>
        </div>
        <br />
        <div className="form-group" style={{ textAlign: "center" }}>
          <p3>STEP 01/03</p3>
          <br />
          <p4>
            <b>Personal Info.</b>
          </p4>
        </div>
        <br />
        <br />
        <br />
        <div className="form-group" style={{ paddingLeft: "30%" }}>
          <h3>
            <b>Register Individual Account!</b>
            <br />
          </h3>
        </div>
        <div className="form-group" style={{ paddingLeft: "30%" }}>
          <p2>
            For the purpose of industry regulation, your details
            <br /> are requied.
          </p2>
        </div>
        <hr />
        <div className="form-group" style={{ textAlign: "center" }}>
          <label htmlFor="name" style={{ paddingRight: "28%" }}>
            <b>Your fullname*</b>
          </label>
          <br />
          <input
            type="text"
            placeholder="Invictus Innocent"
            name="name"
            id={styles.name}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
        </div>
        <div className="form-group" style={{ textAlign: "center" }}>
          <label htmlFor="email" style={{ paddingRight: "28%" }}>
            <b>Email address*</b>
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter email address"
            name="email"
            id={styles.email}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
        </div>
        <div
          className="form-group"
          style={{ textAlign: "center", paddingRight: "19%" }}
        >
          <input
            type="checkbox"
            name="terms & conditions"
            id='check'
            onChange={(e) => {
              setDisable(!disable)
              setCheck(e.target.value)
            }}
            style={{ cursor: 'pointer' }}
          />
          <label
            style={{ cursor: 'pointer' }}
            for="check">
            I agree to terms &amp; conditions
          </label>
        </div>
        <div className="form-group" style={{ textAlign: "center" }}>
          <label htmlFor="create" style={{ paddingRight: "28%" }}>
            <b>Create password*</b>
          </label>
          <br />
          <input
            type="password"
            placeholder="Enter password"
            name="create"
            id={styles.create}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
        </div>
        <div className="form-group" style={{ textAlign: "center" }}>
          <button
            disabled={disable}
            type="submit"
            className={`${disable ?styles.disabledBtn :styles.registerbtn  }`}
          // style={`${disable ?'backgroundColor:"#3371f2" :'backgroundColor:"red"}`}
          >
            Register Account
          </button>
        </div>
        <p style={{ textAlign: "center" }}>Or</p>
        <div className="form-group" style={{ textAlign: "center" }}>
          {/* <button type="button" className={styles.googlebtn}>
            Register with Google
          </button> */}
          <GoogleLogin
            clientId={clientId}
            buttonText="Register with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '1px' }}
          />
        </div>
      </form >

      <br />
      <br />
      <br />
      <br />
      <br />
      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          sx={{
            fontSize: "1rem",
            width: "500px",
            color: "white",
          }}
          onClose={() => {
            setOpen(false);
          }}
          icon={<ErrorIcon />}
          severity="error"
          variant="filled"
        >
          {ErrorMessage}
        </Alert>
      </Snackbar>
      {/* <Footer/> */}
    </div >
  );
};

export default RegisterPersonal;

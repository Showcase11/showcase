import React, { useEffect, useState } from "react";
import styles from "./normal_profile_1.module.css";

import { useNavigate } from "react-router-dom";
import Axios from 'axios';

const Normal_profile_1 = () => {
  const navigate = useNavigate();
  const [oldpass,setOld] = useState("");
  const [newpass,setNew] = useState("");
  const [confirmpass,setConfirm] = useState("");

  const handlechange = async(e) =>{
    // e.preventDefault();
    let token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
      token = token.replace(/['"]+/g, "");}
    else{
      localStorage.removeItem("token");
      navigate("/")
    }
    if(newpass === confirmpass){
    const response = await Axios.patch('http://3.110.108.123:5000/user/changepass',{
      oldpass: oldpass,
      newpass:newpass
    },{
      headers:{
        'Authorization':localStorage.getItem('token').replace(/['"]+/g, "")
      }
    })
    var sd = await response;
    alert(response);
    setOld("")
    setConfirm("")
    setNew("")
    }
    else{
      alert("Password does not match ");
    }

  } 

  return (
    <div className={styles.Normal_profile_1}>
     
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className={styles.container1}>
              <form onSubmit={handlechange} className="container" id="con">
                <div className="form-group">
                  <a onClick={()=>{
                    navigate(-1)
                  }} href="#/" className="back">
                    <b>&lsaquo; Back</b>
                  </a>
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="radio"
                    id="profile"
                    onChange={() => {
                      navigate("/personal/updateProfile");
                    }}
                    name="password"
                    value="Profile"
                  />
                  <label className={styles.radio}>Profile</label>

                  <input
                    type="radio"
                    id="Change-password"
                    name="password"
                    value="Change password"
                  />
                  <label className={styles.radio}>Change password</label>
                </div>
                <br />
                <div className="form-group">
                  <label for="psw-old" className={styles.label1}>
                    <b>Old password</b>
                  </label>
                  <br />
                  <input
                    type="password"
                    placeholder="Enter password"
                    name="psw-old"
                    id="psw-old"
                    required
                    value={oldpass}
                    onChange={(e) => setOld(e.target.value)}

                  />
                  <br />
                </div>
                <div className="form-group">
                  <label for="psw-new" className={styles.label1}>
                    <b>New password</b>
                  </label>
                  <br />
                  <input
                    type="password"
                    placeholder="Enter password"
                    name="psw-new"
                    id="psw-new"
                    required
                    value={newpass}
                    onChange={(e) => setNew(e.target.value)}
                  />
                  <br />
                </div>
                <div className="form-group">
                  <label for="psw-confirm" className={styles.label1}>
                    <b>Confirm new password</b>
                  </label>
                  <br />
                  <input
                    type="password"
                    placeholder="Enter password"
                    name="psw-confirm"
                    id="psw-cofirm"
                    required
                    value={confirmpass}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className={styles.savebtn}>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-4">
            <img
              src="/image.png"
              width="550px"
              height="550px"
              className={styles.img2}
            />
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      {/* <Footer/> */}
    </div>
  );
};

export default Normal_profile_1;

import React, { useEffect, useState } from "react";
import styles from "./normal_profile.module.css";
import {useNavigate} from 'react-router-dom'
import Axios from 'axios';
const Normal_profile = () => {
  const navigate=useNavigate()
  const [about, setAbout] = useState("");
  const [profile, setProfile] = useState("");
  const [newname, setNewName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(()=>{
    async function Underuseffect(){
    let token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
      token = token.replace(/['"]+/g, "");
      try {
        const response = await Axios.get('http://3.110.108.123:5000/user/getpic',{
          headers:{
            'Authorization':localStorage.getItem('token').replace(/['"]+/g, ""),
          }
        });
        setProfile(response.data.profile);

      }
        catch(err){
          console.log(err)
        }
    }
    else{
      alert("Login please");
    }
  }
  Underuseffect();
    
  });

  const handleimg = async(files) => {    
    console.log(files[0]);
    try{
      const formData = new FormData();
      formData.append("file",files[0]);
      formData.append("upload_preset","a7zbcbwb");
      const res = await Axios.post("https://api.cloudinary.com/v1_1/dww5gv28l/image/upload", formData)
      console.log(res.data.url)  
      setProfile(res.data.url);
      alert("")
    }
    catch(err){
      console.log(err);
    }
  };


  const editentry = async() =>{
    let token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
      token = token.replace(/['"]+/g, "");
    }
    try{
      const response = await Axios.patch("http://3.110.108.123:5000/user/personal", {
        
        about: about,
        profile:profile,
        name: newname
      },{
        headers:{
          'Authorization':localStorage.getItem('token').replace(/['"]+/g, "")
        }
      }
      );
      setAbout("")
      setProfile("")
      setNewName("")

      console.log(response);
      // setUrl("New");
      alert(response);
    }
    catch(e){
      console.log(e);
      alert(e);
    }
  }
  return (
    <div className={styles.Normal_profile}>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className={styles.container1}>
              <form className="container" >
                <div className="form-group">
                  <a
                    onClick={() => {
                      navigate(-1);
                    }}
                    href="#/"
                    className={styles.back}
                  >
                    <b>&lsaquo; Back</b>
                  </a>
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="radio"
                    id="profile"
                    name="password"
                    value="Profile"
                  />
                  <label className={styles.radio}>Profile</label>

                  <input
                    type="radio"
                    onChange={() => {
                      navigate("/personal/changePassword");
                    }}
                    id="Change_password"
                    name="password"
                    value="Change password"
                  />
                  <label className={styles.radio}>Change password</label>
                </div>
                <br />
                <div className={`form-group ${styles.div1}`}>
                  <img
                    src={profile}
                    ait="Photo"
                    width="200px;"
                    height="140px;"
                  />
                </div>
                <br />
                <div className={`form-group ${styles.div2}`}>
              <input type="file"  onChange= {(e)=> handleimg(e.target.files)}></input>

                </div>

                <div className="form-group">
                  <p className={styles.p1}>
                    People visiting your profile will see the following info
                  </p>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="User name" required  value={newname}
            onChange={(e) => setNewName(e.target.value)} />
                </div>
                <br />
                <div className="form-group">
                  <label for="about me" className={styles.label1}>
                    <b>About Me</b>
                  </label>
                  <br />
                  <textarea id="about-me" name="about me"  value={about}
            onChange={(e) => setAbout(e.target.value)} > </textarea>
                </div>

                <div className="form-group">
                  <button type="button" className={styles.btn1}>
                    Temporarily disable my account
                  </button>
                  <button
                    onClick={async () => {
                      let token = localStorage.getItem("token");
                      if (token !== undefined && token !== null) {
                        token = token.replace(/['"]+/g, "");
                      
                      try {
                        const user = await fetch(
                          "http://3.110.108.123:5000/user/infor",
                          {
                            method: "GET",
                            headers: {
                              Authorization: token,
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        const user1 = await user.json();

                        const delete_id = user1._id;
                        console.log(delete_id);
                        const deleteUser = await fetch(
                          `http://3.110.108.123:5000/user/delete/${delete_id}`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        const deleteUser1 = await deleteUser.json();
                        console.log("Deleted account", deleteUser1);
                        localStorage.removeItem("token");
                        navigate("/");
                      } catch (err) {
                        console.log(err, "error in deleting account");
                      }}
                      else{
                        navigate("/");
                      }
                    }}
                    type="button"
                    className={styles.btn2}
                  >
                    Delete my account
                  </button>
                </div>
                <div className="form-group">
                  <button onClick={editentry}  className={styles.savebtn}>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-4">
            <img
              src="/image 1183.png"
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

      {/* <Footer /> */}
    </div>
  );
};

export default Normal_profile;

import styles from './profile1.module.css'
import React, { useEffect, useState } from 'react'
import { useNavigate} from "react-router-dom";
import jwt from "jsonwebtoken"
import Axios from "axios"

const Profile1 = () =>{
  const navigate = useNavigate()
  const [name, setname] = useState("")
  const [about, setabout] = useState("")
  const [whats, setwhats] = useState("")
  const [msg, setMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [profile, setProfile] = useState('');
  const [sd,setSd] = useState(false);

  useEffect(()=>{
    async function Underuseffect(){
    let token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
      token = token.replace(/['"]+/g, "");
      try {
        const response = await Axios.get('http://localhost:5000/user/getpic',{
          headers:{
            'Authorization':localStorage.getItem('token').replace(/['"]+/g, ""),
          }
        });
        console.log(response)
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
    
  },[sd]);

  useEffect(()=>{
    var token = localStorage.getItem('token')
    if(token){
      token = token.replace(/['"]+/g, "");
      const user = jwt.decode(token)
      if(!user){
        localStorage.removeItem('token')
      }
    }
    
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
  
  const EditDetail = async(event) => {
    event.preventDefault();
    try {
      console.log(profile);
      alert("profile")
        const response = await Axios.patch('http://localhost:5000/user/editpro', {
            name: name,
            phone: phone,
            about: about,
            whats:whats,
            profile:profile
        },{
          headers:{
            'Authorization':localStorage.getItem('token').replace(/['"]+/g, ""),
          }
        });
        setPhone('')
        setname('')
        setwhats('')
        setabout('')
        setProfile('')
        setSd(true);
        console.log(response);
        alert("ABC")

    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
            alert("DEF")

        }
    }
  } 


    return (
      <div className={styles.Profile1}>
      <div className='container'>
      <div className="row">
      <div className="col-4">
        <div className={styles.container1}>
        <form className='form-group'  onSubmit={EditDetail}>
          <div className="form-group">
            <a
              onClick={() => {
                navigate(-1);
              }}
              href="#"
              className={styles.back}
            >
              <b>‹ Back</b>
            </a>
          </div>
          <br />
          <div className="form-group">
            <input
              style={{ cursor: "pointer" }}
              type="radio"
              id="profile"
              name="password"
              defaultValue="Profile"
            />
            <label className={styles.radio}>Profile</label>
            <input
              style={{ cursor: "pointer" }}
              onChange={() => {
                navigate("/business/profile/p3");
              }}
              type="radio"
              id="Change password"
              name="password"
              defaultValue="Change password"
            />
            <label className={styles.radio}>Change password</label>
            <input
              style={{ cursor: "pointer" }}
              onChange={() => {
                navigate("/business/profile/gsp");
              }}
              type="radio"
              id="gps settings"
              name="password"
              defaultValue="GPS settings"
            />
            <label className={styles.radio}>GPS settings</label>
          </div>
          <br />
          <div className="form-group" style={{ paddingLeft: "10%" }}>
            <img
              src={profile}
              width="200px"
              height="140px"
            />
          </div>
          <br />
          <div className="form-group" style={{ paddingLeft: "15%" }}>
            <input  type="file"  onChange= {(e)=> handleimg(e.target.files)}/>
          </div>
          <div className="form-group">
            <p>People visiting your profile will see the following info</p>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="User name"
              required
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="about me">
              <b>About Me</b>
            </label>
            <br />
            <textarea
              id="about me"
              name="about me"
              style={{ height: "150px" }}
              value={about}
              onChange={(e) => setabout(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ph.no whatsapp">
              <b>Whatsapp link</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter link"
              name="ph.no whatsapp"
              id="ph.no whatsapp"
              required
              value={whats}
              onChange={(e) => setwhats(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ph.no">
              <b>Phonenumber*</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter Phone number"
              name="ph.no"
              id="ph.no"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <button
              type="button"
              className="temporarilybtn"
              style={{ paddingRight: "4%", border: "none" }}
            >
              Temporarily disable my account
            </button>
            <button
            onClick={async()=>{
                 let token = localStorage.getItem("token");
                 if (token !== undefined && token !== null) {
                   token = token.replace(/['"]+/g, "");
                 
                  try{
                    const user = await fetch(
                      "http://localhost:5000/user/infor",
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
                      `http://localhost:5000/user/delete/${delete_id}`,{
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
                  }
                  catch(err){
                    console.log(err,"error in deleting account")
                  }}
                  else{
                    navigate("/");
                  }
              
            }}
              type="button"
              className="deletebtn"
              style={{ paddingLeft: "3%", border: "none" }}
            >
              Delete my account
            </button>
          </div>
          <div className="form-group">
            <button type="submit" className={styles.savebtn}>
              Save
            </button>
          </div>
        </form>
        </div>
        </div>
        {/* <Footer/> */}
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
      </div>
    );
}
export default Profile1;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Photo from "../Images/pic.png";
import Icon from "../Images/Icon.png";
import EditProfile from "../Images/edit_profile.svg";
import Axios from "axios";
import "../App.css";
const Section = (props) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const { plan } = props || {}
  useEffect(() => {
    async function Underuseffect() {
      let token = localStorage.getItem("token");
      if (token !== undefined && token !== null) {
        token = token.replace(/['"]+/g, "");
        try {
          const response = await Axios.get('http://3.110.108.123:5000/user/getpic', {
            headers: {
              'Authorization': localStorage.getItem('token').replace(/['"]+/g, ""),
            }
          });
          console.log(response)
          setProfile(response.data.profile);
          setName(response.data.name);
          setAbout(response.data.about);

          const { data } = await Axios.get()


        }
        catch (err) {
          console.log(err)
        }
      }
      else {
        alert("Login please");
      }
    }
    Underuseffect();

  });

  return (
    <>
      <div className="header-container">
        <header>
          <div className="hero-container">
            <img src={profile} alt="123" id="photo" />

          </div>
          <section className="bio">
            <p className="username">{name}</p>
            <div className="videoicon">
              <img src={Icon} alt="123" /> VIDEOS {localStorage.getItem("userVidsSize")}
            </div>
            <div className="bio-container">
              <h5>{about}</h5>
            </div>

          </section>
          <section className="edit_profile">
            <button
              onClick={() => {
                console.log("ck");
                navigate("/personal/updateProfile");
              }}
            >
              <img src={EditProfile} alt="356" />
            </button>
            <div className="hide">Update profile</div>


          </section>

        </header>
      </div>
      <div>
        <div>
          {
            plan?.plan && <div
              style={{
                marginTop: "20px",
                textAlign: 'center',

              }}
            >
              <p>Plan:{plan?.plan}</p>
              <p>Payment Id:{plan?.paymentId}</p>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Section;

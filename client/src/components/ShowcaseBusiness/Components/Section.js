import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Photo from "../Images/pic.png";
import Axios from 'axios';
import Icon from "../Images/Icon.png";
import EditProfile from "../Images/edit_profile.svg";
import styles from "../Appbusiness.module.css";

const Section = (props) => {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [whatsapp, setWhatsapp] = useState();
  const naviagte = useNavigate();
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
        
          setProfile(response.data.profile);
          setName(response.data.name);
          setAbout(response.data.about);

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
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
      token = token.replace(/['"]+/g, "");
      fetch("http://3.110.108.123:5000/user/infor", {
        method: "GET",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        return res.json();
      }
      ).then((data) => {
        const obj = {
          phone: data.phone,
          country: data.country,
        }
        setWhatsapp(obj);
      }
      )
    }
    else {
      alert("Please login to see your profile");
    }
  }, [])
  return (
    <>
      <div className={styles.header_container}>
        <header>
          <div className={styles.hero_container}>
            <img className={styles.business_profile_img} src={profile} alt="123" id="photo" />
            {/* <input
              type="file"
              className={styles.my_file}
              onChange={(e) => {
                setProfilePic(URL.createObjectURL(e.target.files[0]));
              }}
              name=""
              id="my_file"
            /> */}
          </div>
          <section className="bio">
            <p className={styles.username}>{name}</p>
            <div className={styles.videoicon}>
              <img src={Icon} alt="123" /> VIDEOS {localStorage.getItem("vsize")}
            </div>
            <div className={styles.bio_container}>
              <h5>{about}</h5>
            </div>
          </section>
          <section className={styles.edit_profile}>
            <button
              onClick={() => {
                //console.log("chch")
                naviagte("/business/profile/p1");
              }}
            >
              <img src={EditProfile} alt="356" />
            </button>
            <div className={styles.hide}>Update profile</div>
          </section>
          <section className="whatsapp">
            <div className="box1">
              <button onClick={() => {
                if (whatsapp !== undefined) {
                  window.open(`https://wa.me/${whatsapp.country}${whatsapp.phone}`)
                }
                else {
                  alert("Please login to see your profile");
                }
              }} className="boxbtn1">
                <a id="sp">
                  Whatsapp
                </a>
                <br />
                <span id="sp">contact on whatsapp</span>
              </button>
            </div>
          </section>
          <section className="gps">
            <div className="box2">
              <button
                onClick={() => {
                  props.onGps(true);
                }}
                className="boxbtn2"
              >
                <a id="sp" href="https://www.google.com/maps" target="_blank">
                  GPS
                </a>
                <br />
                <span id="sp">Look for Direction</span>
              </button>
            </div>
          </section>

          <div className="post_videobtn">
            <button style={{ padding: '4px 10px' }} onClick={props.onModalClose} className="button button2">
              Post Video
            </button>
          </div>
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

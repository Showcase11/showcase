import React,{useState} from "react";
import styles from "./gsp.module.css";
import { useNavigate } from "react-router-dom";
import  Axios  from "axios";

const GSP = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("")
  const handleAddress = async() =>{
    const res = await Axios.patch('http://3.110.108.123:5000/user/address', {
      address: address,
  },{
    headers:{
      'Authorization':localStorage.getItem('token').replace(/['"]+/g, ""),
    }
  });
}


  return (
    <div className={styles.GPS}>
        <div className="container">
        <div className="row">
          <div className="col-8">
          <div className={styles.container1}>
      <form onSubmit={handleAddress} className="container" id="con">
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
            onChange={() => {
              navigate("/business/profile/p1");
            }}
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
            type="radio"
            id="gps"
            name="password"
            defaultValue="GPS"
          />
          <label className={styles.radio}>GPS</label>
        </div>
        <br />
        <br />
        <div className="form-group">
          <p1>
            <b>Add the following information,</b>
            <br />
            We will set it up for you
          </p1>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="address">
            <b>Your Shop Address</b>
          </label>
          <br />
          <input
            type="text"
            placeholder="Please enter complete address"
            name="address"
            id="address"
            required
            value = {address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <br />
 
        <br />
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
              src="/20945755.jpg"
              width="550px"
              height="550px"
              className={styles.img2}
            />
          </div>
      </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};
export default GSP;

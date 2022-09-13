import React, {  useState } from "react";

import { useNavigate } from "react-router-dom";


const Profile3 = () => {
  

  const navigate = useNavigate();
  
  const [newpass, setNew] = useState("");
  const [confirmpass, setConfirm] = useState("");

  const handlechange =  (e) => {
       e.preventDefault();
    if(newpass === confirmpass){
        
      const data = localStorage.getItem("changePasss");
      const data1 = JSON.parse(data);
      const email= data1.email;
      const password = newpass;
        fetch("http://3.110.108.123:5000/updatePass", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            newpass: password,
          }),
        }).then((res)=>{
          return res.json();
        }).then((data)=>{
          
          if(data.message === 1){
            alert("Password has been changed successfully");
            localStorage.removeItem("changePasss");
            navigate("/");
          }
          else{
           alert("Something went wrong");
          }
        }) 
    }
    else{
      alert("Password does not match");
    }
        // update api
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40%",
        margin: "20px 30%0",
        height: "360px"
      }}
    >
      
      <form onSubmit={handlechange} className="container" id="con">
        <div className="form-group">
          <label htmlFor="psw-new">
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
          <label htmlFor="psw-confirm">
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
          <button style={{width:"10.3rem"}} type="submit" className="savebtn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default Profile3;

import React, { useEffect, useState } from "react";
import "../App.css";
import ps from '../../../videogif.gif'
//const vids=[insta,insta2]

const Videos = (props) => {
  const [userVids, setUserVids] = useState([]);
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
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const id = data._id;
          console.log(data,"idm");
          fetch(`http://3.110.108.123:5000/user/saved/${id}`, {
            method: "GET",
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              
              if(data==undefined)
              {
                console.log("pop")
                return;
              }
      
              let b=[];
               for(let i = data.VideoLink.length-1;i>=0;i--)
               {
                const obj={
                  vid:data.VideoLink[i].vlink,
                  productId:data.productId,
                  lat:data.VideoLink[i].lat,
                  lng:data.VideoLink[i].lng,
                }
               b.push(obj);
               }
              
               localStorage.setItem("userVidsSize",b.length);
               setUserVids(b);
            });
        })
        .catch((err) => {
         
        });
    } else {
      //
      
    }
  }, []);
  return (
    <>
      <div className="Videos-wrapper">
         {userVids === [] || userVids===undefined ? (
          <div>Loading...</div>
        ) : (
          userVids.map((data,index) => {
            return (
              <video
              poster={ps}
                key={index}
                onClick={() => {
                  props.onCoord({
                    lat:data.lat,
                    lng:data.lng,
                  })
                  props.onFetch(data.vid);
                  props.onPreviewModal(true);
                }}
                width="200"
                height="320"
                style={{ objectFit: "cover", cursor: "pointer" }}
                src={data.vid}
                controls
                autoPlay
                loop
                muted={true}
              ></video>
            );
          })
        )}
        
        {userVids.length===0 && <div>No Videos</div>} 
        
      </div>
    </>
  );
};

export default Videos;

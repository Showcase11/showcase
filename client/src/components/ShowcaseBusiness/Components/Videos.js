import React, { useEffect, useState } from "react";
import styles from "../Appbusiness.module.css";
import videogif from "../../../videogif.gif";
const Videos = (props) => {
  const [vdp, setVdp] = useState([]);
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (props.load) {
      setRefresh(!refresh)
      props.setLoad(!props.load)
    }
    if (token !== undefined && token !== null) {
      token = token.replace(/['"]+/g, "");

      fetch("https://api.showcaseurbusiness.com/user/infor", {
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
          // console.log(data``)
          const id = data._id;
          fetch("https://api.showcaseurbusiness.com/admin/products", {
            method: "GET",
          })
            .then((res) => {
              return res.json();
            })
            .then((products) => {
              console.log(products)
              const product = products?.products?.filter((product) =>
                product?.companyName?.includes(id)
              );
              console.log(product)
              setVdp(product);
              localStorage.setItem("vsize", product.length);
            });
        });
    }
  }, [props.load, refresh,props]);

  return (
    <>
      {" "}
      {vdp.length === 0 && <h1>No Videos</h1>}
      <div className={styles.Videos_wrapper}>
        {vdp.map((product, index) => {
          return (
            <div key={index}>
              <video
                poster={videogif}
                onClick={() => {
                  props.onFetch(product);
                  props.onPreviewModal(true);
                }}
                src={product.link}
                width="200"
                height="320"
                controls
                autoPlay
                muted
                style={{ objectFit: "cover", cursor: "pointer" }}
              />
            </div>
          );
        })}
        {/* {props.VideoDetails.map((video,index) => {
        
        return (
          <div>
         
          <video key={index} onClick={()=>{
              props.onFetch(video)
              props.onPreviewModal(true)
             
              
          }}  src={video.previewVideo} width="200" height="320"  style={{objectFit:"cover",cursor:"pointer"}} />
          </div>
        )
      })} */}
      </div>
    </>
  );
};

export default Videos;

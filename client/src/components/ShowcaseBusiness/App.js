import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Section from "./Components/Section";
import PostVideo from "./Components/PostVideo";
import Videos from "./Components/Videos";
import PreviewVideo from "./Components/PreviewVideo";
import MapModal from "./Components/MapModal";
const App = () => {
  const navigate = useNavigate();
  const [ModalClose, setModalClose] = useState(false);
  const [displayVideos, setdisplayVideos] = useState([]);
  const [ProductInfo, setProductInfo] = useState(false);
  const [closeGps, setCloseGps] = useState(false);
  const [data1, setData] = useState();
  const [plan, setPlan] = useState({})
  const [load, setLoad] = useState(false)
  const VideoDetails = (data) => {

    setdisplayVideos((prev) => [...prev, data]);
  };
  const FetchVideoDetails = (data) => {
    
    setData(data);
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    // console.log(JSON.parse(token))
    if (token !== undefined && token !== null) {
      token = token.replace(/['"]+/g, "");
    }

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
       
        fetch(`https://api.showcaseurbusiness.com/api/v1/payment/getPaymentDetails/${data?._id}`)
        .then(res=>res.json())
        .then(data=>{
         
          setPlan(data?.data)
        })
        const role = data.role;
        if (role !== 1) {
          navigate('/');
        }

      })
      .catch((err) => {
      
      });
      // console.log(ModalClose)
  },[navigate]);

  return (
    <>
      {closeGps && <MapModal onGps={setCloseGps} />}

      <Section
        onGps={setCloseGps}
        TotalVids={displayVideos.length}
        onModalClose={setModalClose}
        plan={plan}
     
      />
      {ModalClose && (
        <PostVideo 
        onDisplay={VideoDetails} 
        onModalClose={setModalClose} 
        setLoad={setLoad}
        load={load}
        />
      )}
      <Videos
        onFetch={FetchVideoDetails}
        onPreviewModal={setProductInfo}
        VideoDetails={displayVideos}
        load={load}
        setLoad={setLoad}
      ></Videos>
      {ProductInfo && (
        <PreviewVideo
          onGps={setCloseGps}
          Data={data1}
          onPreviewModal={setProductInfo}
        />
      )}
    </>
  );
};

export default App;

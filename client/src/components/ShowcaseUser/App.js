import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Section from "./Components/Section";
import PostVideo from "./Components/PostVideo";
import Videos from "./Components/Videos";
import PreviewVideo from "./Components/PreviewVideo";
import MapModal from "./Components/MapModal";
const App = () => {
  const navigate = useNavigate();
  const [ModalClose, setModalClose] = useState(false);
  const [coord,setCoord]=useState();
  const [displayVideos, setdisplayVideos] = useState([]);
  const [ProductInfo, setProductInfo] = useState(false);
  const [closeGps, setCloseGps] = useState(false);
  const [data1, setData] = useState();
  const [plan, setPlan] = useState({})

  const VideoDetails = (data) => {
    setdisplayVideos((prev) => [...prev, data]);
  };

  const FetchVideoDetails = (data) => {
    setData(data);
  };
    useEffect(() => {
      console.log("ck1");
      let token = localStorage.getItem("token");
      if (token !== undefined && token !== null) {
        token = token.replace(/['"]+/g, "");
      }
   
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
          const role = data.role;
      
          fetch(`http://3.110.108.123:5000/api/v1/payment/getPaymentDetails/${data?._id}`)
          .then(res=>res.json())
          .then(data=>{
          
            setPlan(data?.data)
          })
          if (role !== 0) {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },[navigate]);
  return (
    <>
      {closeGps && <MapModal onGps={setCloseGps} onGpsData={coord} />}

      <Section
        onGps={setCloseGps}
        TotalVids={displayVideos.length}
        onModalClose={setModalClose}
        plan={plan}
      />
      {ModalClose && (
        <PostVideo onDisplay={VideoDetails} onModalClose={setModalClose} />
      )}
      <Videos
        onCoord={setCoord}
        onFetch={FetchVideoDetails}
        onPreviewModal={setProductInfo}
        VideoDetails={displayVideos}
      ></Videos>
      {ProductInfo && (
        <PreviewVideo
          onGps={setCloseGps}
          Data={data1}
          coordinates={coord}
          onPreviewModal={setProductInfo}
        />
      )}
    </>
  );
};

export default App;

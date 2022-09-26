// import React from "react";
// import "../App.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// const position = [17.387140, 78.491684];
// const MapModal = (props) => {
//   return (
//     <>
//       {/* <div
//         onClick={() => {
//           props.onGps(false);
//         }}
//         className="gps-wrapper"
//       >
//         <div
//           onClick={(e) => {
//             e.stopPropagation();
//           }}
//           className="map-gps"
//         >
//            <MapContainer
//             className="main-gps"
//             center={position}
//             dragging={true}
//             zoom={15}
//             zoomControl={true}
//             scrollWheelZoom={true}

//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={position}>
//               <Popup>Shop Location</Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       </div> */}
//       <MapContainer
//         style={{ width: "100%", height: "100vh" }}
//         center={position}
//         zoom={13}
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={position}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </>
//   );
// };

// export default MapModal;
import React, { useState, useEffect, useRef } from "react";
import { Snackbar, Alert, Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import DoneIcon from "@mui/icons-material/Done";
import "../Appbusiness.module.css";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

const MapModal = (props) => {
  const [ErrorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [position, setPosition1] = useState([25.38714, 82.91684]);
  const navigate = useNavigate();
  function LocationMarker() {
    const [position1, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound() {
        let obj = {
          lat: position[0],
          lng: position[1],
        };
        setPosition(obj);

        map.flyTo(obj, map.getZoom());
      },
    });
    //  console.log(position,typeof(position),"pop");
    let obj1 = {
      lat: position[0],
      lng: position[1],
    };
    return (
      <>
        <Marker position={obj1}>
          <Popup>Your Shop Location</Popup>
        </Marker>
      </>
    );
  }
  //  const animateRef = useRef(false);
  //  function SetViewOnClick({ animateRef }) {
  //    const map = useMapEvent("click", (e) => {
  //      map.setView(e.latlng, map.getZoom(), {
  //        animate: animateRef.current || false,
  //      });
  //    });

  //    return null;
  //  }
  useEffect(() => {
    const MapModalAsync = async () => {
      try {
        let token = localStorage.getItem("token");
        token = token.replace(/['"]+/g, "");
        const roles = await fetch("http://3.110.108.123:5000/user/infor", {
          method: "GET",
          headers: {
            Authorization: token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const roleData = await roles.json();
        console.log(roleData)
        setPosition1([roleData.latitude, roleData.longitude]);
        console.log(position);
      } catch (err) {
        console.log(err.message);
      }
    };
    MapModalAsync();
    setOpen(true);
  }, []);
  return (
    <>
      <div
        onClick={() => {
          props.onGps(false);
          // navigate('/')
        }}
        className="gps-wrapper"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="map-gps"
        >
          <MapContainer
            className="main-gps"
            center={position}
            dragging={true}
            zoom={15}
            zoomControl={true}
            scrollWheelZoom={true}
            style={{ overflow: "hidden" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            {/* <Marker position={position}>
              <Popup>Shop Location</Popup>
            </Marker> */}
            {/* <SetViewOnClick animateRef={animateRef} /> */}
          </MapContainer>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Alert
            sx={{
              fontSize: "1rem",
              width: "500px",
              color: "white",
            }}
            onClose={() => {
              setOpen(false);
            }}
            icon={<DoneIcon />}
            severity="success"
            variant="filled"
          >
            Click On Map To Navigate to your location
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default MapModal;

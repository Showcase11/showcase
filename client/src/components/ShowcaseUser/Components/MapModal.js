
import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import "../App.css";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from "react-leaflet";

const MapModal = (props) => {
  console.log(props.onGpsData,"hjk");
   //const [ErrorMessage, setErrorMessage] = useState("");
   const [open, setOpen] = useState(false);
  const [position, setPosition1] = useState([25.38714, 82.91684]);
  useEffect(()=>{
    setOpen(true)
  },[])
 // const navigate = useNavigate();
  function LocationMarker() {
    const [position1, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound() {
         let obj = {
           lat: props.onGpsData.lat,
           lng: props.onGpsData.lng,
         };
        setPosition(obj);
       
        map.flyTo(obj, map.getZoom());
      },
    });
    //  console.log(position,typeof(position),"pop");
       let obj1 = {
         lat: props.onGpsData.lat,
         lng: props.onGpsData.lng,
       };
    return (<>
      <Marker position={obj1}>
        <Popup>Your Shop Location</Popup>
      </Marker>
    </>)
  }
 
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

import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { Snackbar, Alert, Button, Box } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from 'react-select';
import Axios from "axios"
import HyperModal from 'react-hyper-modal';
import ShowCase from "./ShowCase.png";
import zIndex from "@mui/material/styles/zIndex";
const NavBar = () => {
  const data = [
    {
      value: 1,
      label: "Profile"
    },
    {
      value: 2,
      label: "Logout"
    }
  ];
  const [selectedValue, setSelectedValue] = useState(null);
  const handlechange = obj => {
    setSelectedValue(obj);
  }


  const navigate = useNavigate();
  const [selectOption, setSelectOption] = useState([])
  const [brand, setbrand] = useState("")
  const [category, setCategory] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [ErrorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [display1, setDisplay] = useState("none");
  const [color1, setColor1] = useState("black");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Login, setLogin] = useState("Login");
  const [search, setSearch] = useState("")
  const ope = Boolean(anchorEl);

  useEffect(() => {
    function onlySpaces(str) {
      return str.trim().length === 0;
    }
    async function Searchfilter() {
      // if(!onlySpaces(search)){
      const response = await Axios.get("http://localhost:5000/admin/products");
      const data = response.data.products
      const options = data.map(d => ({
        "value": d.category + " : " + d.brand,
        "label": d.category + " : " + d.brand
      }))
      setSelectOption(options);
      // console.log(options);
      // }
    }
    Searchfilter();
  }, [])

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
      token = token.replace(/['"]+/g, "");
      setLogin("Logout")
    }
    else {
      setLogin("Login")
    }

  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDashboard = () => {
    let token = localStorage.getItem("token");
    console.log(token)
    if (token !== undefined && token !== null) {
      token = token.replace(/['"]+/g, "");
      fetch("http://localhost:5000/user/infor", {
        method: "GET",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res)
          return res.json();
        })
        .then((data) => {
          console.log(data, "sp");
          const role = data.role;

          if (role == 0) {
            navigate("/dashboarduser");
          } else if (role == 1) {
            navigate("/dashboardbusiness");
          } else {
            navigate("/");
          }
        })
    }
    else {
      navigate("/joinus")
      setErrorMessage("Please login first");
    }
    setAnchorEl(null);
  };
  const handleLogout = () => {
    let token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
      localStorage.removeItem("token");
      navigate("/");
    }
    else {
      navigate("/login");
    }

    setAnchorEl(null);
  };

  console.log('from searchbar', search)


  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
            src={ShowCase}
            alt=''
          />
        </div>
        <div className={styles.links}>
          {/* <NavLink to="/as"  activeClassName={styles.active}>
            Home
          </NavLink> */}
          <Link to="/">
            <div
              style={{
                margin: "0px 10px",
                fontSize: "1.1rem",
                color: "black",
              }}
            >
              HOME
            </div>
          </Link>
          <Link to="/subs">
            <div
              style={{
                margin: "0px 10px",
                fontSize: "1.1rem",
                color: "black",
              }}
            >
              {"Subscription".toUpperCase()}
            </div>
          </Link>
          <Link to="/FAQ">
            <div
              style={{
                margin: "0px 10px",
                fontSize: "1.1rem",
                color: "black",
              }}
            >
              FAQ
            </div>
          </Link>
          <Link to="/contact">
            <div
              style={{
                margin: "0px 10px",
                fontSize: "1.1rem",
                color: "black",
              }}
            >
              CONTACT-US
            </div>
          </Link>
        </div>

        <div className={styles.icons}>
          <div style={{ display: display1, width: "300px" }}>
            <Select options={selectOption} value={search} onChange={(e) => {
              setSearch(e.value)
              setOpenModal(true)
            }}
            />
          </div>

          {/* search icon  */}
          <SearchIcon
            onClick={() => {
              setColor1((prev) => {
                if (prev === "black") {
                  setDisplay("block");
                  return "red";
                } else {
                  setDisplay("none");
                  return "black";
                }
              });
            }}
            style={{ color: color1 }}
            className={styles.si}
          />

          {/* personal icon  */}
          <PersonIcon className={styles.pi} id="demo-positioned-button"
            aria-controls={ope ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={ope ? 'true' : undefined}
            onClick={handleClick}
          />

          {/* menu for account and login  */}
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={ope}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleDashboard}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>{Login}</MenuItem>
          </Menu>
        </div>
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
            zIndex: "1002 !important",
          }}
          onClose={() => {
            setOpen(false);
          }}
          icon={<ErrorIcon />}
          severity="error"
          variant="filled"
        >
          {ErrorMessage}
        </Alert>
      </Snackbar>

      {/* modal  */}
      {
        openModal && <HyperModal
          isOpen={openModal}
          requestClose={() => setOpenModal(false)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: 'center',
              alignItems: "center",
              height: '100%',
              fontSize: '25px',
              fontWeight: 'bold',
              zIndex:1000
            }}
          >
            You have selected this option{search}
          </Box>

        </HyperModal>
      }


    </>
  );
};

export default NavBar;
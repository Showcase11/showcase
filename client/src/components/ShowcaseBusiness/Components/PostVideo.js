import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

import styles from "../Formbusiness.module.css";
// import S3 from "react-aws-s3";
// import { S3Client } from "@aws-sdk/client-s3";
// const REGION = "us-east-1";
// const s3Client = new S3Client({ region: REGION });
// export { s3Client };

import { uploadFile } from 'react-s3';
import axios from "axios";
import Loading from "../../shared/Loading";

// const config = {
//   bucketName: "showcase27",
//   dirName: "media" /* optional */,
//   region: "us-east-1",
//   accessKeyId: "AKIAR3UTLLOPKVE3HVHF",
//   secretAccessKey: "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",
//   s3Url: "https://showcase27.s3.amazonaws.com/",
// };
// const ReactS3Client = new S3(config);

const S3_BUCKET = 'showcase28';
const REGION = 'us-east-1';
const ACCESS_KEY = 'AKIAQFXX4ZU3AHYZQUFH';
const SECRET_ACCESS_KEY = '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';

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
}


const PostVideo = (props) => {
  const [fileMeta, setfileMeta] = useState({});
  const [CompanyName, setCompanyName] = useState("");
  const [CompanyAddress, setCompanyAddress] = useState("");
  const [ProductBrand, setProductBrand] = useState("");
  const [ProductType, setProductType] = useState("");
  const [Category, setCategory] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [id, setID] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setphone] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const [fileDisplay, setfileDisplay] = useState(
    "No file currently selected for Upload"
  );
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false)
  const [previewVideo, setPreviewVideo] = useState(null);


  useEffect(() => {

  }, [fileMeta]);

  const FileChangeHandler = (e) => {
    setfileMeta(e.target.files[0]);


    const display =
      "File name " +
      e.target.files[0].name +
      " File size " +
      (e.target.files[0].size / 1000000).toFixed(3) +
      "MB";
   

    setfileDisplay(display);
    // console.log(e.target.files[0], "obj");
    setPreviewVideo(URL.createObjectURL(e.target.files[0]));

    //console.log(e.target.files[0]);
  };
  const CancelUpload = () => {
    // setSelected(false);
    setfileMeta({});
    setPreviewVideo(null);
    setfileDisplay("No file currently selected for Upload");
    props.onModalClose(false);
  };



  const PostVideoHandler = (e) => {
    e.preventDefault();
    setLoading(true)

    const handleUpload = async (file) => {
      uploadFile(file, config)
        .then(data => {
          setLoading(false)
         
          props.setLoad(true)
          
          return setLink(data.location)
        })
        .catch(err => {
          setLoading(false)
          console.error(err)
        })
    }

    handleUpload(fileMeta);
    async function locate() {
      try {
        const resp = await axios.get("https://api.showcaseurbusiness.com/user/infor",
          {
            headers: {
              'Authorization': localStorage.getItem('token').replace(/['"]+/g, ""),
            },
          }
        );
        setLatitude(resp.data.latitude);
        setLongitude(resp.data.longitude);
        setID(resp.data._id);
        setCountry(resp.data.country);
        setphone(resp.data.phone);
      } catch (err) {
        console.log(err);
      }
    }
    locate();

  }


  useEffect(() => {
   
    async function handleupdate() {
      try {
       
        const response = await axios.post(
          "https://api.showcaseurbusiness.com/admin/products",
          {
            link: link,
            companyName: CompanyName + "*" + id,
            email: CompanyAddress,
            brand: ProductBrand + "*" + country + phone,
            type: ProductType,
            category: Category,
            price: ProductPrice,
            Description: ProductDescription,
            latitude: latitude,
            longitude: longitude,
          },
          {
            headers: {
              'Authorization': localStorage.getItem('token').replace(/['"]+/g, ""),
            },
          }
        );
 
        props.setLoad(true)
        props.onModalClose(false)
      } catch (err) {
        console.log(err);
      }
      /* setLink("");
      setCompanyName("");
      setCompanyAddress("");
      setProductBrand("");
      setProductType("");
      setCategory("");
      setProductPrice("");
      setProductDescription("");
      setLatitude(0);
      setLongitude(0); */
    }
    if (link != "") {
    
      handleupdate();
    }

  }, [link, Category,link,CompanyName,ProductBrand,ProductPrice,loading])


  // const PostVideoHandler = (e) => {
  //   e.preventDefault();



  // let aws;
  //   if (fileMeta.name === undefined) {
  //     alert("Select File");
  //     return;
  //   }
  //   fetch("https://api.showcaseurbusiness.com/s3Url", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       fn: fileMeta.name,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       ///////
  //       aws = data.uploadUrl.split("?")[0];
  //       const VideoMetaData = {
  //         previewVideo,
  //         ProductBrand,
  //         ProductType,
  //         Category,
  //         ProductPrice,
  //         ProductDescription,
  //         latitude: 10,
  //         longitude: 10,
  //       };
  //       console.log(VideoMetaData);
  //       props.onDisplay(VideoMetaData);
  //       props.onModalClose(false);
  //       var token = localStorage.getItem("token");
  //       token = token.replace(/['"]+/g, "");
  //       fetch("https://api.showcaseurbusiness.com/user/infor", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token,
  //           Accept: "application/json",
  //         },
  //       })
  //         .then((res) => {
  //           return res.json();
  //         })
  //         .then((data) => {
  //           //
  //           console.log(data,"gpsdone")
  //           fetch("https://api.showcaseurbusiness.com/admin/products", {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: token,
  //               Accept: "application/json",
  //             },
  //             body: JSON.stringify({
  // link: aws,
  // companyName: CompanyName + "*" + data._id,
  // email: CompanyAddress,
  // brand: ProductBrand + "*" + data.country + data.phone,
  // type: ProductType,
  // category: Category,
  // price: ProductPrice,
  // Description: ProductDescription,
  // latitude: data.latitude,
  // longitude: data.longitude,
  //             }),
  //           })
  //             .then((res) => {
  //               console.log(res);
  //               return res.json();
  //             })
  //             .then((data) => {
  //               console.log("login succesfully", data);
  //             })
  //             .catch((err) => {
  //               console.log("error", err);
  //             });
  //         });
  //       //////
  //       fetch(data.uploadUrl, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         body: fileMeta,
  //       });
  //     });
  // };
  return (
    <div
      onClick={() => {
        //   console.log("clicked");
        props.onModalClose(false);
      }}
      className={styles.wrapper_form}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          //   console.log("clicked2");
        }}
        className={styles.form}
      >
        <h1>New Post</h1>
        <br></br>
        <div className={styles.inputHolder}>
          <div className={styles.upload}>Upload</div>
          <input
            required
            type="file"
            style={{ display: "none" }}
            id="video"
            onChange={FileChangeHandler}
            placeholder="choose file"
          ></input>
          <input
            disabled
            className={styles.File}
            placeholder="Choose file"
          ></input>
          <label className={styles.LabelVideo} htmlFor="video">
            Browse
          </label>

        </div>
        <div className={styles.fd}>{fileDisplay}</div>

        <ReactPlayer
          className={styles.VideoPlayer}
          url={previewVideo}
          width="300px"
          controls
          height="150px"
          playing={true}
        ></ReactPlayer>
        <br />
        <form onSubmit={PostVideoHandler}>

          <div className={styles.h4}>Company Name*</div>
          <input
            value={CompanyName}
            className={styles.inputStyle}
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            required
          ></input>
          <div className={styles.h4}>Email Address*</div>
          <input
            value={CompanyAddress}
            type="email"
            className={styles.inputStyle}
            onChange={(e) => {
              setCompanyAddress(e.target.value);
            }}
            required
          ></input>
          <div className={styles.h4}>Product Brand(with Model)*</div>
          <input
            value={ProductBrand}
            className={styles.inputStyle}
            onChange={(e) => {
              setProductBrand(e.target.value);
            }}
            required
          ></input>
          <div className={styles.h4}>Product Type*</div>
          <input
            value={ProductType}
            className={styles.inputStyle}
            onChange={(e) => {
              setProductType(e.target.value);
            }}
            required
          ></input>
          <div className={styles.h4}>Category*</div>
          <select
            className={styles.inputStyle}
            value={Category}
            onChange={(e) => {
              //  console.log(e.target.value);
              setCategory(e.target.value);
            }}
          >
            <option value="shirt">shirt</option>
            <option value="shoes">shoes</option>
            <option value="pants">pants</option>
          </select>
          <div className={styles.h4}>Product Price*</div>
          <input
            type="number"
            value={ProductPrice}
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            className={styles.inputStyle}
            required
          ></input>
          <div className={styles.h4}>Product Description*</div>
          <textarea
            value={ProductDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
            className={styles.textInput}
          ></textarea>

          <div className={styles.Buttons}>

            {
              loading ? <button className={styles.button_29} >
               Processing...
              </button> : <input className={styles.button_28} type="submit" value="Upload" />
            }
            <button className={styles.button_29} onClick={CancelUpload}>
              Cancel
            </button>
            {/* <button
              onClick={(e) => {
                e.preventDefault();
                // let aws;

                // console.log(apl)
                // await fetch(apl.uploadUrl,{
                //     method:"PUT",
                //     headers:{

                //         "Content-Type":"multipart/form-data",
                //     },
                //     body:fileMeta
                //  })
                //  console.log(apl.uploadUrl,"apl")
                //  const videoUrl=apl.uploadUrl.split('?')[0];
                //  console.log(videoUrl,"mw");
              }}
            >
              aws
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostVideo;

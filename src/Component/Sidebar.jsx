import React, { useState } from "react";
import "../Style/Sidebar.css";
import MobileScreenShareOutlinedIcon from "@mui/icons-material/MobileScreenShareOutlined";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import AutoDeleteOutlinedIcon from "@mui/icons-material/AutoDeleteOutlined";
import CloudQueueOutlinedIcon from "@mui/icons-material/CloudQueueOutlined";
import Modal from "@mui/material/Modal";
import {db,storage} from '../firebase';

import firebase from 'firebase';


function Sidebar() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const handleClose = () => {
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }

  }
  const handleUpload = (event) => {
    event.preventDefault();
    setUploading(true);
    storage.ref(`files/${file.name}`).put(file).then(snapshot=>{
      storage.ref("files").child(file.name).getDownloadURL().then(url=>{
        db.collection("myfiles").add({
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
          filename:file.name,
          fileURL:url,
          size:snapshot._delegate.bytesTransferred
        })

      })
    })
 };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="modal_pop">
          <form>
            <div className="modalHeading">
              <h3>Select file ypu want to upload</h3>
            </div>
            <div className="modalBody">
              {uploading ? (
                <p className="uploading">Uploading</p>
              ) : (
                <>
                  <input type="file" onChange={handleChange} />
                  <input
                    type="submit"
                    className="post_submit"
                    onClick={handleUpload}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>
      <div className="sidebar">
        <div className="sidebar_btn">
          <button onClick={handleOpen}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9312/9312231.png"
              alt=""
            />
            <span>New</span>
          </button>
        </div>
        <div className="sidebar_optons">
          <div className="sidebar_option sidebar_optionActive">
            <MobileScreenShareOutlinedIcon />
            <span>
              <b>My Drive</b>
            </span>
          </div>
          <div className="sidebar_option">
            <DevicesIcon />
            <span>Computers</span>
          </div>{" "}
          <div className="sidebar_option">
            <PeopleAltOutlinedIcon />
            <span>Shared with me</span>
          </div>{" "}
          <div className="sidebar_option">
            <QueryBuilderOutlinedIcon />
            <span>Recent</span>
          </div>{" "}
          <div className="sidebar_option">
            <StarBorderOutlinedIcon />
            <span>Starred</span>
          </div>{" "}
          <div className="sidebar_option">
            <AutoDeleteOutlinedIcon />
            <span>Trash</span>
          </div>
        </div>
        <hr />
        <div className="sidebar_options">
          <div className="sidebar_option">
            <CloudQueueOutlinedIcon />
            <span>Stroage</span>
          </div>
          <div className="progress_bar">
            <progress size="tiny" value="50" max="100" />
            <span>6.48 GB of 15 GB used</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
   
  /*  event.preventDefault();
    setUploading(true);

    storage
      .ref(`fiels/${file.name}`)
      .put(file)
      .then((snapshot) => {
        console.log(snapshot)
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("myfiles").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              filename: file.name,
              fileURL: url,
              size: snapshot.delegate.bytesTransferred,
            });
            setUploading(false);
            setFile(null);
            setOpen(false);
          });
      });
      */
  
import React, { useEffect, useState } from "react";
import "../Style/Date.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { InfoOutlined, InsertDriveFile, List } from "@mui/icons-material";
//import { Modal } from "@mui/material";
import { db } from '../firebase';
function Data() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    db.collection("myfiles").onSnapshot((snapshot) => {
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  function formateBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const size = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + size[i];
  }
  return (
    <>
      <div className="data">
        <div className="data__header">
          <div className="data__headerLeft">
            <p>My Drive</p>
            <ArrowDropDownOutlinedIcon />
          </div>
          <div className="data__headerRight">
            <List />
            <InfoOutlined />
          </div>
        </div>
        <div className="data__content">
          <div className="data__grid">
            {files.map((file) => {
              return (
                <div className="data__file">
                  <InsertDriveFile />
                  <p>{file.data.filename}</p>
                </div>
              );
            })}
          </div>
          <div className="data__list">
            <div className="detailesRow">
              <p>
                <b>
                  Name
                  <ArrowDropDownOutlinedIcon />
                </b>
              </p>
              <p>
                <b>Owner</b>
              </p>
              <p>
                <b>Last Modified</b>
              </p>
              <p>
                <b>File Size</b>
              </p>
            </div>

            {files.map((file) => {
              return (
                <div className="detailesRow">
                  <p>
                     <InsertDriveFile />
                     <a className="file_link" href={file.data.fileURL} target="_blank">
                   
                    {file.data.filename}
                    </a>
                  </p>
                  <p>Me</p>
                  <p>
                    {new Date(
                      file.data.timestamp?.seconds * 1000
                    ).toUTCString()}
                  </p>
                  <p>{formateBytes(file.data.size)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Data;

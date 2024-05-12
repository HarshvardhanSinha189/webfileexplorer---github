"use client"

import React, { useState } from "react";
import Filecard from "./componets/filecard";
import { useEffect } from "react";

export default function Home() {
  const [isGoingBack, setIsGoingBack] = useState(false);
  const [resObject, setResObject] = useState([]);
  const [currentWorkingDirectory, setcurrentWorkingDirectory] = useState("C:\\")

  //to go back
  function goBackOneFolder(currentPath) {
    const parts = currentPath.split('/');

    if (parts.length > 1) {
      parts.pop();
      return parts.join('/');
    } else {
      return currentPath;
    }
  }


  const FetchData = async () => {
    try {
      const data = await fetch("/api/ls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "current_working_directory" : `${currentWorkingDirectory}`
        },
      });
      const res = await data.json();
      // Update state with fetched data
      setResObject(res.file.files);
      // setcurrentWorkingDirectory(res.cwd)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data every 100 miliseconds
    const interval = setInterval(FetchData, 100);
    return () => clearInterval(interval);
  }, []);

  const styleForNavigationButton1 = {
    display: 'flex',
    gap: "2vw"
  }

  return (
    <>
      <div className="sidepanel">SidePanel</div>
      <div className="filecradcontainder1">
        <span className="navigationButtons" style={styleForNavigationButton1} >
          <div id="backbtn" onClick={() => {
            console.log(goBackOneFolder(currentWorkingDirectory))
          }
          }>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16" >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </div>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg> */}
        </span>
        <span>Current Working Directory:</span><span>{currentWorkingDirectory}</span>
        <div className="fileCardContaner">
          {resObject.map((file, index) => (
            <Filecard key={index} file={file} />
          ))}
        </div>
      </div>
    </>
  );
}

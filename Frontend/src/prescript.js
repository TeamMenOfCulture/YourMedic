import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "./db";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"; // To use navigate()

// Initialize Firebase
initializeApp(firebaseConfig);

const Prescription = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate(); // To use navigate()

  const { loginWithPopup, logout, user, isAuthenticated } = useAuth0();

  // Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
  const options = { multi: true };
  const apiUrl = "https://ocrimage.azurewebsites.net/upload/";

  const uploader = Uploader({
    apiKey: "public_12a1ybzAoQPUAkbH314vXasd1Qmj", // Get production API keys from Bytescale
  });

  function fake() {
    setClicked(true);
  }

  const uploadImages = async (files) => {
    const imageUrls = files.map((x) => x.fileUrl);

    // Update the imageUrl state variable with the uploaded image URLs
    setImageUrl(imageUrls.join("\n"));
    console.log(imageUrl);
  };

  if (!clicked) {
    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f0f0f0",
          margin: 0,
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
            padding: "30px",
            textAlign: "center",
            width: "35%",
          }}
        >
          <h2>Patient Report</h2>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <UploadButton
              uploader={uploader}
              options={options}
              onComplete={(files) =>
                console.log(files.map((x) => x.fileUrl).join("\n"))
              }
            >
              {({ onClick }) => (
                <button onClick={onClick}>Upload Patient Report Images</button>
              )}
            </UploadButton>
            <button onClick={setTimeout(fake, 7000)}>Send</button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            {/* Add more buttons for other detections as needed */}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        Prescription Uploaded
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }
};

export default Prescription;

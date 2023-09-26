import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "./db";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import axios from "axios";

// Initialize Firebase
initializeApp(firebaseConfig);

const PatientReport = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [clicked, setClicked] = useState(false);

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
  const patientData = {
    name: "Mr. Baivab Mukhopadhyay",
    date: "26 September, 2023",
    pregnancies: 0,
    glucose: 137,
    bloodPressure: 40,
    skinThickness: 35,
    insulin: 168,
    bmi: 43.1,
    diabetesPedigreeFunction: 2.288,
    age: 33,
    prediction: "The patient is diabetic",
    reason:
      "Based on the provided data, it appears that the patient has a high glucose level (137) and a high BMI (Body Mass Index) of 43.1. These are key indicators that suggest the patient may have diabetes.",
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
            width: "45%",
          }}
        >
          <h2>Patient Report</h2>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div>
              <h3>Diabetes Prediction Report</h3>
              <p>Patient: {patientData.name}</p>
              <p>Date: {patientData.date}</p>

              <table border="1">
                <thead>
                  <tr>
                    <th>Pregnancies</th>
                    <th>Glucose</th>
                    <th>Blood Pressure</th>
                    <th>Skin Thickness</th>
                    <th>Insulin</th>
                    <th>BMI</th>
                    <th>Diabetes Pedigree Function</th>
                    <th>Age</th>
                    <th>Prediction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{patientData.pregnancies}</td>
                    <td>{patientData.glucose}</td>
                    <td>{patientData.bloodPressure}</td>
                    <td>{patientData.skinThickness}</td>
                    <td>{patientData.insulin}</td>
                    <td>{patientData.bmi}</td>
                    <td>{patientData.diabetesPedigreeFunction}</td>
                    <td>{patientData.age}</td>
                    <td>{patientData.prediction}</td>
                  </tr>
                </tbody>
              </table>

              <p>Reason: {patientData.reason}</p>
            </div>
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
  }
};

export default PatientReport;

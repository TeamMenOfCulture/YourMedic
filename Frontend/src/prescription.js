import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import DummyComponent from "./dummyComponent";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./db";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fetch from 'node-fetch';




const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const PrescriptionDetectionDashboard = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!uploadedFile) {
      return;
    }

    const storageRef = ref(storage, 'prescriptions/' + uploadedFile.name);
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Handle upload progress
      },
      (error) => {
        // Handle upload error
      },
      async () => {
        // Handle successful upload

        const downloadURL = await getDownloadURL(storageRef);
        console.log("Upload Done")
        console.log(downloadURL);
        // ---------------------------------------------------------------------------------------------------
        let text ="SCAM SCAM SCAM SCAM SCAM SCAM SCAM SCAM SCAM SCAM "
        function downloadTextFile() {
          var blob = new Blob([text], { type: "text/plain" });
          var url = URL.createObjectURL(blob);

          var a = document.createElement("a");
          a.href = url;
          a.download = "Prescription.txt";

          a.click();

          // Clean up
          URL.revokeObjectURL(url);
        }

        await setTimeout(downloadTextFile, 5000);














        // ------------------------------------------------------------------------------------------------------
        // // Send a POST request to your API with axios
        // try {
        //   console.log("trying...")
        //   const apiUrl = 'https://ocrimage.azurewebsites.net/upload/';
        //   const response = await axios.post(apiUrl, { image_url: downloadURL });
        //   console.log('API Response:', response.data);
        // } catch (error) {
        //   console.error('API Request error:', error);
        // }
      }
    );
  };




  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', padding: '30px', textAlign: 'center', width: '35%' }}>
        <h2>Prescription Detection</h2>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <label
            htmlFor="prescription-upload"
          >
            Upload Prescription Image
          </label>
          <input type="file" id="prescription-upload" style={{ display: 'none' }} accept="image/*" onChange={handleChange} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
          <button onClick={uploadImage}>Upload Prescription Image</button>
          {/* Add more buttons for other detections as needed */}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetectionDashboard;

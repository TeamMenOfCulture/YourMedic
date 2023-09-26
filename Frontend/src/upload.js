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

const ImageUploader = () => {
  const uploader = Uploader({
    apiKey: "public_12a1ybzAoQPUAkbH314vXasd1Qmj", // Get production API keys from Bytescale
  });
  const [url, setURL] = useState("");

  // Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
  const options = { multi: true };
  const apiUrl = "https://ocrimage.azurewebsites.net/upload/";
  const file = "path_to_your_file.jpg"; // Replace with the actual path to your file
  const imageUrl = "URL"; // Replace with the actual image URL

  const formData = new FormData();
  formData.append("file", file);
  formData.append("image_url", url);
  if (url !== "") {
    axios({
      method: "post",
      url: apiUrl,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((response) => {
        // Handle the response here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }

  return (
    <UploadButton
      uploader={uploader}
      options={options}
      onComplete={(files) => setURL(files.map((x) => x.fileUrl).join("\n"))}
    >
      {({ onClick }) => <button onClick={onClick}>Upload a file...</button>}
    </UploadButton>
  );
};

export default ImageUploader;

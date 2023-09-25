import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "./db";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";

// Initialize Firebase
initializeApp(firebaseConfig);

const ImageUploader = () => {
  const [imageFile, setImageFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const randomizedFileName = `${uuidv4()}-${file.name}`;

    // Create a reference to the upload location in Firebase Storage.
    const storageRef = ref(getStorage(), `/images/${randomizedFileName}`);

    // Upload the file to Firebase Storage.
    const uploadTask = uploadBytes(storageRef, file);

    // Wait for the upload to complete.
    await uploadTask;

    // Get the download URL for the uploaded image.
    const downloadURL = await getDownloadURL(storageRef);

    // Set the download URL state variable.
    setDownloadURL(downloadURL);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />

      {imageFile && (
        <img src={imageFile} alt="Uploaded image" />
      )}

      {downloadURL && (
        <a href={downloadURL}>Download image</a>
      )}
    </div>
  );
};

export default ImageUploader;

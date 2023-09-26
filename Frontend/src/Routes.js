import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DummyComponent from "./dummyComponent";
import ButtonPage from "./link";
import App from "./App";
import ImageUploader from "./upload";
import PatientReport from "./report";
import LabTests from "./prescription";
import GetYourData from "./getYourData";
import SkinReport from "./skin";
import Prescription from "./prescript";
const IndexComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/speech" element={<DummyComponent />} />
        <Route path="/" element={<App />} />
        <Route path="/buttons" element={<ButtonPage />} />
        <Route path="/upload" element={<ImageUploader />} />
        <Route path="/diagnosis" element={<PatientReport />} />
        <Route path="/report" element={<LabTests />} />
        <Route path="/getYourData" element={<GetYourData />} />
        <Route path="/skin" element={<SkinReport />} />
        <Route path="/prescription" element={<Prescription />} />
      </Routes>
    </BrowserRouter>
  );
};

export default IndexComponent;

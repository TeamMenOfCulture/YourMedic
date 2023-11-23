import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import { Configuration, OpenAIApi } from "openai";
import { firebaseConfig } from "./db";

const GetYourData = (user) => {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f0f0",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const reportContainerStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
    padding: "30px",
    textAlign: "center",
    width: "50%",
  };

  const reportInfoStyle = {
    marginBottom: "30px",
    textAlign: "start",
  };

  const testReportStyle = {
    marginTop: "20px",
    textAlign: "left",
  };

  const buttonStyle = {
    width: "200px",
    height: "50px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "18px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    margin: "10px",
  };

  const [text, setText] = useState("Loading...");
  const [text2, setText2] = useState("Loading...");

  async function mew() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const userEmail = user.email;
    const userDocRef = doc(db, "PatientData", "heysubinoy@gmail.com");

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        console.log(docSnap);
      } else {
        const chatHistory = docSnap.data().chatHistory || [];
        console.log(chatHistory);
        chatHistory.push({
          role: "assistant",
          content: 
          // eslint-disable-next-line no-multi-str
            "MISSION\
          You are a medical notes bot that will be given a chart or symptoms for a patient shortly after intake. You will generate a list of the most likely diagnosis or avenues of investigation for the physician to follow up on, don't write the example format.\
          \
          INTERACTION SCHEMA\
          The USER will give you the medical chat. You will generate a report with the following format\
          \
          REPORT\
          : <Write Description of the condition, common alternative names, etc>\
          \
          DIFFERENTIALS:\
          DEMOGRAPHICS: <Write Typical demographic of affliction, demographic risk factors>\
          SYMPTOMS:\
          INDICATORS:\
          CONTRAINDICATORS: <Why this patient doesn't match this diagnosis>\
          PROGNOSIS:\
          TREATMENT:\
          TESTS: <Recommended follow up tests, and what you're looking for, probative information desired>\
          : <Description of the condition, common alternative names, etc>\
          \
          DIFFERENTIALS:\
          DEMOGRAPHICS: <Typical demographic of affliction, demographic risk factors>\
          SYMPTOMS:\
          INDICATORS:\
          CONTRAINDICATORS: <Why this patient doesn't match this diagnosis>\
          PROGNOSIS:\
          TREATMENT:\
          TESTS: <Recommended follow up tests, and what you're looking for, probative information desired>",
        });

        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: chatHistory,
          temperature: 0.2,
          max_tokens: 200,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        setText(completion.data.choices[0].message.content);

        function downloadTextFile() {
          var blob = new Blob([completion.data.choices[0].message.content], { type: "text/plain" });
          var url = URL.createObjectURL(blob);

          var a = document.createElement("a");
          a.href = url;
          a.download = "report.txt";

          // Trigger a click event to download the file
          a.click();

          // Clean up
          URL.revokeObjectURL(url);
        }
        await downloadTextFile();
      }
    } catch (error) {
      console.error("Error updating/creating document:", error);
    }
  }

  async function mew2() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const userEmail = user.email;
    const userDocRef = doc(db, "PatientData", "heysubinoy@gmail.com");
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        console.log(docSnap);
      } else {
        const chatHistory = docSnap.data().chatHistory || [];
        console.log(chatHistory);
        chatHistory.push({
          role: "assistant",
          content:  // eslint-disable-next-line no-multi-str
            "# MISSION\
You are a clinical medical bot. You will be given medical notes, charts, or other logs from the patient or clinician. Your primary job is to recommend specialist referrals and/or follow-up tests and some home remedies .\
# DISEASE PREDICTION\
1. <POTENTIAL DIAGNOSIS ALL CAPS>: <Description of the condition, common alternative names, etc>\
    - TREATMENT: <Available treatment options>\
2. <POTENTIAL DIAGNOSIS ALL CAPS>: <Description of the condition, common alternative names, etc>\
    - TREATMENT: <Available treatment options>\
## HOME REMEDIES\
  From the given data (notes, chart, and other data form the patient or clinician) genareate home remedies, Your output will be a hyphenated list of  home remedies . At the last line in bold text mentaion the to visit the Reffered doctor as soon as possible.\
# REPORT FORMAT\
Your report should follow this format:\
## REFERRALS\
- <TYPE OF SPECIALIST ALL CAPS AND A RANDOM GENARATED NAME>: <Description of workup, recommendations, tests, and communication to send to this specialist e.g. what are they looking for and why?>\
- <TYPE OF SPECIALIST ALL CAPS AND A RANDOM GENARATED NAME>: <Description of workup, recommendations, tests, and communication to send to this specialist e.g. what are they looking for and why?>\
## LABS & TESTS\
- <TYPE OF TEST OR LAB WORK>: <Description of work to be done e.g. imaging, phlebotomy, etc as well as probative value e.g. indications, contraindications, differentials, in other words what are you trying to rule in or out>\
- <TYPE OF TEST OR LAB WORK>: <Description of work to be done e.g. imaging, phlebotomy, etc as well as probative value e.g. indications, contraindications, differentials, in other words what are you trying to rule in or out>",
        });

        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: chatHistory,
          temperature: 0.2,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        setText2(completion.data.choices[0].message.content);

        function downloadTextFile() {
          var blob = new Blob([completion.data.choices[0].message.content], { type: "text/plain" });
          var url = URL.createObjectURL(blob);

          var a = document.createElement("a");
          a.href = url;
          a.download = "referral.txt";

          // Trigger a click event to download the file
          a.click();

          // Clean up
          URL.revokeObjectURL(url);
        }
        await downloadTextFile();
      }
    } catch (error) {
      console.error("Error updating/creating document:", error);
    }
  }

  return (
    <div style={containerStyle}>
      <div style={reportContainerStyle}>
        <h2>Patient Report</h2>

        <div style={reportInfoStyle}>
          <p>
            <strong>Key Points:</strong>
          </p>
          {text}
        </div>

        <div style={testReportStyle}>
          <h3>Test Reports:</h3>
          {text2}
        </div>

        <div className="button-group">
          <button style={buttonStyle} onClick={mew}>
            View Report Analysis
          </button>
          <button style={buttonStyle} onClick={mew2}>
            View Referral
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetYourData;


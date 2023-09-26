import React from "react";

const YourComponent = () => {
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

  const innerContainerStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
    padding: "30px",
    textAlign: "center",
    width: "35%",
  };

  const profileImgStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "30px",
  };

  const patientNameStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const infoLabelStyle = {
    fontWeight: "bold",
    fontSize: "16px",
  };

  const infoValueStyle = {
    fontSize: "15px",
    marginBottom: "10px",
  };

  const circularButtonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "5px",
    textDecoration: "none",
    margin: "0 20px",
    transition: "background-color 0.3s ease",
  };

  const circularButtonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const blackIconStyle = {
    mixBlendMode: "screen",
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <img
          src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png"
          alt="Patient's Profile Picture"
          style={profileImgStyle}
        />
        <h2 style={patientNameStyle}>Souradip Pal</h2>
        <div className="profile-info">
          <p>
            <span style={infoLabelStyle}>Email:</span>{" "}
            souradippal10000@gmail.com
          </p>
          <p>
            <span style={infoLabelStyle}>Phone:</span> +91 98009278273
          </p>
          <p>
            <span style={infoLabelStyle} id="underdiagnosis">
              Under Diagnosis:
            </span>{" "}
            Conjunctivitis
          </p>
        </div>
        <div className="buttonGroup">
          <div className="button-group">
            <div>
              <a href="/chat" style={circularButtonStyle}>
                <img src="chat.png" alt="" id="icons" />
                Talk with Disha
              </a>
            </div>
            <div>
              <a
                href="/reportGeneration"
                style={{ ...circularButtonStyle, ...blackIconStyle }}
              >
                <img src="report.png" alt="" id="icons" />
                Conversation Report
              </a>
            </div>
            <div>
              <a href="/download" style={circularButtonStyle}>
                <img src="donwload.png" alt="" id="icons" />
                Report Analysis
              </a>
            </div>
            <div>
              <a href="/newDoctor" style={circularButtonStyle}>
                +
              </a>
              Connect a Doctor
            </div>
            <div>
              <a href="/login" style={circularButtonStyle}>
                ➔
              </a>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;

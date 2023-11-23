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
    width: "70%", // Adjusted width for better responsiveness
    margin: "0 auto", // Center the container
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

  const circularButtonContainer = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const circularButtonStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "14px",
    textDecoration: "none",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  };

  const circularButtonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const blackIconStyle = {
    mixBlendMode: "screen",
    marginBottom: "10px", // Added space below the icon for better spacing
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <img
          src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png"
          alt="Profile Picture of Souradip Pal"
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
        <div className="buttonGroup" style={circularButtonContainer}>
          <a href="/disha" style={circularButtonStyle}>
            <img src="chat.png" alt="Chat Icon" style={blackIconStyle} />
            Talk with Disha
          </a>
          <a href="/download" style={circularButtonStyle}>
            <img src="download.png" alt="Download Icon" style={blackIconStyle} />
            Report Analysis
          </a>
          <a href="/download" style={circularButtonStyle}>
            <img src="download.png" alt="Download Icon" style={blackIconStyle} />
            Report Analysis
          </a>
          <a href="/newDoctor" style={circularButtonStyle}>
            <span style={{ fontSize: "40px", marginBottom: "5px" }}>+</span>
            Connect a Doctor
          </a>
          <a href="/login" style={circularButtonStyle}>
            <span style={{ fontSize: "30px", marginBottom: "5px" }}>➔</span>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const YourComponent = () => {
  const { loginWithPopup, logout, user, isAuthenticated } = useAuth0();
  const STYLES = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#333",
      color: "#fff",
    },
    leftContent: {
      flex: 1,
    },
    rightContent: {},
    loginButton: {
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    logoutButton: {
      padding: "8px 16px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    area: { position: "absolute", bottom: "10px", left: "10px", zIndex: 500 },
    text: {
      margin: "0px",
      width: "300px",
      padding: "5px",
      background: "none",
      color: "#ffffff",
      fontSize: "1.2em",
      border: "none",
    },
    speak: {
      padding: "10px",
      marginTop: "5px",
      display: "block",
      color: "#FFFFFF",
      background: "#222222",
      border: "None",
    },
    area2: { position: "absolute", top: "5px", right: "15px", zIndex: 500 },
    label: { color: "#777777", fontSize: "0.8em" },
    a1: { position: "sticky" },
    loginSection: {
      backgroundColor: "#222",
      padding: "40px",

      borderRadius: "15px",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      maxWidth: "1100px",
      margin: "auto",
      color: "#fff",
    },
    mainbg: {
      backgroundColor: "#222",
    },
  };
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
  if (isAuthenticated) {
    console.log(user);
    return (
      <div style={containerStyle}>
        <div style={innerContainerStyle}>
          <img
            src={user.picture}
            alt="Profile Picture of Souradip Pal"
            style={profileImgStyle}
          />
          <h2 style={patientNameStyle}>{user.name}</h2>
          <div className="profile-info">
            <p>
              <span style={infoLabelStyle}>Email:</span> {user.email}
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
              <img
                src="download.png"
                alt="Download Icon"
                style={blackIconStyle}
              />
              Report Analysis
            </a>
            <a href="/download" style={circularButtonStyle}>
              <img
                src="download.png"
                alt="Download Icon"
                style={blackIconStyle}
              />
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
  } else {
    return (
      <body class="loginBG">
        <div style={STYLES.loginSection} className="loginSection">
          <h1 class="Headline">
            Aarogya<span class="medic">Disha</span>
          </h1>
          <h2 class="Tagline">
            Hi, I am Disha. Sign Up to get me as your own medical assistant
          </h2>
          <button
            style={STYLES.loginButton}
            className="loginButton"
            onClick={loginWithPopup}
          >
            Get Started
          </button>
        </div>
      </body>
    );
  }
};

export default YourComponent;

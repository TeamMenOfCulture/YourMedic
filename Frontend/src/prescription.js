import React from 'react';

function PrescriptionDetectionDashboard() {
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const containerAnimationStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
    padding: '30px',
    textAlign: 'center',
    width: '35%',
  };

  const uploadInputWrapperStyle = {
    textAlign: 'center',
    marginBottom: '30px',
  };

  const uploadInputLabelStyle = {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const uploadInputLabelHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const uploadInputStyle = {
    display: 'none',
  };

  const buttonGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
  };

  const detectionButtonStyle = {
    width: '200px',
    height: '50px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '18px',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const detectionButtonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={containerStyle}>
      <div style={containerAnimationStyle} className="container">
        <h2>Prescription Detection</h2>
        <div style={uploadInputWrapperStyle} className="upload-input-wrapper">
          <label
            htmlFor="prescription-upload"
            style={uploadInputLabelStyle}
            onMouseOver={(e) => e.target.style = {...uploadInputLabelStyle, ...uploadInputLabelHoverStyle}}
            onMouseOut={(e) => e.target.style = uploadInputLabelStyle}
          >
            Upload Prescription Image
          </label>
          <input type="file" id="prescription-upload" style={uploadInputStyle} accept="image/*" />
        </div>

        <div style={buttonGroupStyle} className="button-group">
          <button
            style={detectionButtonStyle}
            onMouseOver={(e) => e.target.style = {...detectionButtonStyle, ...detectionButtonHoverStyle}}
            onMouseOut={(e) => e.target.style = detectionButtonStyle}
            id="diabetes-button"
          >
            Diabetes Detection
          </button>
          <button
            style={detectionButtonStyle}
            onMouseOver={(e) => e.target.style = {...detectionButtonStyle, ...detectionButtonHoverStyle}}
            onMouseOut={(e) => e.target.style = detectionButtonStyle}
            id="skin-button"
          >
            Skin Detection
          </button>
          {/* Add more buttons for other detections as needed */}
        </div>
      </div>
    </div>
  );
}

export default PrescriptionDetectionDashboard;

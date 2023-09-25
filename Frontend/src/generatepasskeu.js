import React, { useState } from 'react';

function GeneratePasskey() {
  const [passkey, setPasskey] = useState('');

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

  const generateButtonStyle = {
    width: '200px',
    height: '50px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '18px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const passkeyStyle = {
    fontSize: '24px',
    marginTop: '20px',
  };

  // Function to generate a random passkey
  function generateRandomPasskey() {
    const passkeyLength = 6; // Change the length as needed
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let passkey = '';
    for (let i = 0; i < passkeyLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      passkey += characters.charAt(randomIndex);
    }
    return passkey;
  }

  // Event handler for generating passkey
  const handleGeneratePasskey = () => {
    const generatedPasskey = generateRandomPasskey();
    setPasskey(`Your Passkey: ${generatedPasskey}`);
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <h2>Generate Passkey</h2>

        <button style={generateButtonStyle} onClick={handleGeneratePasskey}>
          Generate Passkey
        </button>

        <p style={passkeyStyle}>{passkey}</p>
      </div>
    </div>
  );
}

export default GeneratePasskey;

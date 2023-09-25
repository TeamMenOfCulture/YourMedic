import React from 'react';

function PatientLogin() {
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    animation: 'backgroundAnimation 10s infinite alternate',
  };

  const containerAnimationStyle = {
    animation: 'fade-in 1s',
    transition: 'transform 0.5s, box-shadow 0.5s',
    transformOrigin: 'center',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
    padding: '30px',
    textAlign: 'center',
    width: '35%',
  };

  const loginBoxAnimationStyle = {
    animation: 'slide-in 1s',
  };

  const inputGroupStyle = {
    marginBottom: '20px',
    transition: 'transform 0.3s',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
  };

  const inputFocusStyle = {
    borderColor: '#007BFF',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const orDividerStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  };

  const hrStyle = {
    flexGrow: 1,
    height: '1px',
    backgroundColor: '#ccc',
    margin: '0 10px',
  };

  const googleLoginButtonStyle = {
    backgroundColor: '#007BFF',
  };

  const googleLoginButtonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={containerStyle}>
      <div style={containerAnimationStyle}>
        <div style={loginBoxAnimationStyle} className="login-box">
          <h2>Patient Login</h2>
          <form id="login-form">
            <div style={inputGroupStyle} className="input-group">
              <input
                type="text"
                id="email"
                placeholder="Email"
                style={inputStyle}
                onFocus={(e) => e.target.style = {...inputStyle, ...inputFocusStyle}}
                onBlur={(e) => e.target.style = inputStyle}
              />
            </div>
            <div style={inputGroupStyle} className="input-group">
              <input
                type="password"
                id="password"
                placeholder="Password"
                style={inputStyle}
                onFocus={(e) => e.target.style = {...inputStyle, ...inputFocusStyle}}
                onBlur={(e) => e.target.style = inputStyle}
              />
            </div>
            <button type="button" id="login-button" style={buttonStyle}>Login</button>
          </form>
          <div style={orDividerStyle} className="or-divider">
            <hr style={hrStyle} />
            <span>OR</span>
            <hr style={hrStyle} />
          </div>
          <button
            type="button"
            id="google-login-button"
            style={googleLoginButtonStyle}
            onMouseOver={(e) => e.target.style = {...googleLoginButtonStyle, ...googleLoginButtonHoverStyle}}
            onMouseOut={(e) => e.target.style = googleLoginButtonStyle}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;

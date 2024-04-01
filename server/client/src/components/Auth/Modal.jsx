import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Modal() {
  const [showSignup, setShowSignup] = useState(false);

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        {showSignup ? <Signup /> : <Login />}
        <p>
          {showSignup
            ? "Already have an account? "
            : "Don't have an account? "}
          <button onClick={toggleSignup}>
            {showSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Modal;

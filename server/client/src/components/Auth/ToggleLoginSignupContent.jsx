import React, { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function ToggleLoginSignupContent() {
  const [showSignup, setShowSignup] = useState(false);

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    
    
  };

  return (
    <div>
      <div>
        {showSignup ? <Signup showSignup={showSignup}/> : <Login showSignup={showSignup}/>}
        <p>
          {showSignup ? "Already have an account? " : "Don't have an account? "}
          <button onClick={toggleSignup}>
            {showSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default ToggleLoginSignupContent;

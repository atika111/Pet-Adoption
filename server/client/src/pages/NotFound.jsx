// Example NotFound component with console log
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  console.log('Rendering NotFound component');
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The requested page does not exist.</p>
    </div>
  );
}

export default NotFound;

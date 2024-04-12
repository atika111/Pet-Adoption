import React from "react";
import { Link } from "react-router-dom";

function MenuItem({ id, onClick, to, children }) {
  return (
    <li id={id} onClick={() => onClick(id)}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default MenuItem;
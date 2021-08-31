import React from "react";
import { Link, navigate } from "gatsby";

function goToSliceMasters() {
  setTimeout(() => {
    console.log("slice masters");
    navigate("/slicemasters", { replace: true });
  }, 2000);
}

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas/">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

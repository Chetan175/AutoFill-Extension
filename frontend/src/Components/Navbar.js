import React from "react";

const Navbar = ({handleSignout}) => {
  // const handleSignout = () => {
  //   setIsLoggedIn(false);
  // }
  return (
    <div className="navbar">
      <h1 className="logo">ResuMate</h1>
      <button className="signout-btn" onClick={handleSignout}>Sign Out</button>
    </div>
  );
};
export default Navbar;

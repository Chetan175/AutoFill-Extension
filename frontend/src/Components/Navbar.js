import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left-section">
        <select className="profile-dropdown">
          <option value="profile1">Profile 1</option>
          <option value="profile2">Profile 2</option>
          <option value="profile3">Profile 3</option>
        </select>
      </div>
      <h1 className="logo">Auto Job Filler</h1>
      <button className="signout-btn">Sign Out</button>
    </div>
  );
};
export default Navbar;

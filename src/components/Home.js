import React from "react";
import { signOut } from "../util/auth";
const Home = () => {
  return (
    <div>
      <p>You are signed In</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Home;

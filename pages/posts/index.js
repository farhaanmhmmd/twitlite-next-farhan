import React from "react";

function Posts() {
  let userVerif = false;
  if (typeof window !== "undefined") {
    userVerif = window.localStorage.getItem("userVerified");
  }
  if (userVerif) {
    return <div>Posts</div>;
  } else {
    return <div>Unverified</div>;
  }
}

export default Posts;

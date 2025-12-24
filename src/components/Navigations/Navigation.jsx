import React from "react";

function Navigation({ onChangeRoute, isSignedIn }) {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onChangeRoute("signout")}
          className="f3 link dim black underline pa3 pointer"
        >
          sign out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onChangeRoute("signin")}
          className="f3 link dim black underline pa3 pointer"
        >
          sign in
        </p>
        <p
          onClick={() => onChangeRoute("register")}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
}

export default Navigation;

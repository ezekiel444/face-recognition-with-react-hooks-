import React from "react";

function Rank({ updateUser }) {
  return (
    <div>
      <div className="white f3">{`${updateUser.name} your current rank is ....`}</div>
      <div className="white f1">{updateUser.entries}</div>
    </div>
  );
}

export default Rank;

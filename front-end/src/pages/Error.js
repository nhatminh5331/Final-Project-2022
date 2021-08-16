import React from "react";

const error = () => {
  return (
    <div
      className="position-relative"
      style={{
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <h1
        className="position-absolute text-secondary"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        Well...Page not found 404
      </h1>
    </div>
  );
};

export default error;

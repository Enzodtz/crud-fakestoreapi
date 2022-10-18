import React from "react";

interface ICenter {
  children: React.ReactNode;
}

function Center({ children }: ICenter) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {children}
    </div>
  );
}

export default Center;

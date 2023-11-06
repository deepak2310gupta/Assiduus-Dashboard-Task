import React from "react";

export default function GraphCardHeader({ leftSectionText, rightSection }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <p style={{ color: "black", fontSize: "14px", fontWeight: "bold" }}>
          {leftSectionText}
        </p>
      </div>
      <div>{rightSection}</div>
    </div>
  );
}

import React from "react";

export default function GraphChip({ text, chipColor }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <div
        style={{
          width: "15px",
          height: "15px",
          borderRadius: "5px",
          backgroundColor: chipColor,
        }}
      >
        {}
      </div>
      <p>{text}</p>
    </div>
  );
}

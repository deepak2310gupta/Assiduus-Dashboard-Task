import { Card, CardContent, Divider } from "@mui/material";
import React from "react";
import "./GraphCardView.css";

export default function GraphCardView({ TopComponent, BottomComponent }) {
  return (
    <Card className="card">
      <CardContent className="topComponent">{TopComponent}</CardContent>
      <Divider />
      <CardContent className="bottomComponent">{BottomComponent}</CardContent>
    </Card>
  );
}

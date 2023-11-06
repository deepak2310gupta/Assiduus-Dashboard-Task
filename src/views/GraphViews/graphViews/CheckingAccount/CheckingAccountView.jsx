import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import GraphCardView from "../../../../components/GraphCardView/GraphCardView";
import CurveLineChart from "../../../../components/CurveLineChart/CurveLineChart";
import GraphCardHeader from "../../../../components/GraphCardHeader/GraphCardHeader";
import { generateCurvedGraphData } from "../../../../constants/constants";
import "./CheckingAccount.css";

export default function CheckingAccountView({ data, setCurvedGraphData }) {
  const [month, setMonth] = useState("March");

  const onMonthSelectHandler = (e) => {
    setMonth(e.target.value);
    const curvedGraphData = generateCurvedGraphData(6);
    setCurvedGraphData((prev) => {
      return {
        ...prev,
        curvedLineData: curvedGraphData,
      };
    });
  };

  return (
    <GraphCardView
      TopComponent={
        <GraphCardHeader
          leftSectionText={"Checking account"}
          rightSection={
            <Select
              value={month}
              onChange={onMonthSelectHandler}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className="my-select"
            >
              <MenuItem value={"January"}>January</MenuItem>
              <MenuItem value={"February"}>February</MenuItem>
              <MenuItem value={"March"}>March</MenuItem>
              <MenuItem value={"April"}>April</MenuItem>
            </Select>
          }
        />
      }
      BottomComponent={<CurveLineChart width={600} height={200} data={data} />}
    />
  );
}

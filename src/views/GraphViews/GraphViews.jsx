import React, { useState } from "react";
import { Card, Grid } from "@mui/material";
import CheckingAccountView from "./graphViews/CheckingAccount/CheckingAccountView";
import InvoicesOwnedView from "./graphViews/InvoicesOwned/InvoicesOwnedView";
import TotalCashFlowView from "./graphViews/TotalCashFlow/TotalCashFlowView";
import AccountWatchlistView from "./graphViews/AccountsWatchlist/AccountWatchlistView";
import {
  BAR_CHART_DATA,
  CURVED_LINE_DATA,
  STACKED_BAR_DATA,
  generateBarGraphData,
  generateCurvedGraphData,
  generateStackedGraphData,
} from "../../constants/constants";
import "./GraphViews.css";

export default function GraphViews() {
  const [graphData, setGraphData] = useState({
    curvedLineData: CURVED_LINE_DATA,
    barChartData: BAR_CHART_DATA,
    stackedBarChartData: STACKED_BAR_DATA,
  });

  const filterDataHandler = () => {
    setGraphData({
      curvedLineData: [],
      barChartData: [],
      stackedBarChartData: [],
    });

    const curvedGraphData = generateCurvedGraphData(6);
    const stackGraphData = generateStackedGraphData(6);
    const barGraphData = generateBarGraphData();
    setGraphData(() => {
      return {
        curvedLineData: curvedGraphData,
        stackedBarChartData: stackGraphData,
        barChartData: barGraphData,
      };
    });
  };

  return (
    <div className="graph-content">
      <button className="filter" onClick={filterDataHandler}>
        {"Filter Data"}
      </button>
      <Grid container spacing={3}>
        <Grid item className="grid" xs={6}>
          <Card className="card">
            <CheckingAccountView
              data={graphData.curvedLineData}
              setCurvedGraphData={setGraphData}
            />
          </Card>
        </Grid>

        <Grid item className="grid" xs={6}>
          <Card className="card">
            <InvoicesOwnedView data={graphData.barChartData} />
          </Card>
        </Grid>

        <Grid item className="grid" xs={6}>
          <Card className="card">
            <TotalCashFlowView data={graphData.stackedBarChartData} />
          </Card>
        </Grid>

        <Grid item className="grid" xs={6}>
          <Card className="card">
            <AccountWatchlistView />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

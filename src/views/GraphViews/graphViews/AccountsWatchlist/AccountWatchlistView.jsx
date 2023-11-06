import React from "react";
import GraphCardView from "../../../../components/GraphCardView/GraphCardView";
import GraphCardHeader from "../../../../components/GraphCardHeader/GraphCardHeader";

import "../../../GraphViews/GraphViews.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function AccountWatchlistView() {
  const data = [];
  return (
    <GraphCardView
      TopComponent={
        <GraphCardHeader
          leftSectionText={"Account watchlist"}
          rightSection={<p></p>}
        />
      }
      BottomComponent={<AccountTable data={data} />}
    />
  );
}

function AccountTable() {
  function createData(name, thisMonth, ytd) {
    return { name, thisMonth, ytd };
  }

  const rows = [
    createData("Sales", 1592, 6.0),
    createData("Advertising", 2, 9.0),
    createData("Inventory", 262, 16.0),
    createData("Entertainment", 305, 3.7),
    createData("Product", 356, 16.0),
  ];

  return (
    <TableContainer component="div">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="theader">Account</TableCell>
            <TableCell className="theader" align="right">
              This month
            </TableCell>
            <TableCell className="theader" align="right">
              YTD
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" className="tbody">
                {row.name}
              </TableCell>
              <TableCell align="right" className="tbody">
                {row.thisMonth}
              </TableCell>
              <TableCell className="tbody" align="right">
                {row.ytd}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

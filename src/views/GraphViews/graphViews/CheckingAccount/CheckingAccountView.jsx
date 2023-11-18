import React, { useEffect, useState } from "react";
import GraphCardView from "../../../../components/GraphCardView/GraphCardView";
import CurveLineChart from "../../../../components/CurveLineChart/CurveLineChart";
import GraphCardHeader from "../../../../components/GraphCardHeader/GraphCardHeader";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "./CheckingAccount.css";

export default function CheckingAccountView() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [curvedLineData, setCurvedLineData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const checkValidDate = (date, sDate, eDate) => {
    const givenDate = new Date(date);
    const start = new Date(sDate);
    const end = new Date(eDate);
    return givenDate >= start && givenDate <= end;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setGraphData([]);
      const response = await fetch(
        "https://data.covid19india.org/v4/min/timeseries.min.json"
      );
      const result = await response.json();
      const firstKey = Object.keys(result)[0];
      const firstValue = result[firstKey];

      const data = Object.entries(firstValue?.dates).map(([date, value]) => {
        return {
          date: new Date(date),
          confirmed: value?.delta?.confirmed || 0,
          recovered: value?.delta?.recovered || 0,
          deceased: value?.delta?.deceased || 0,
        };
      });
      const filteredGraphData = data?.filter((entry) =>
        checkValidDate(entry?.date, startDate, endDate)
      );
      setGraphData(filteredGraphData);
      setIsLoading(false);
    };
    if (startDate && endDate) fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    if (graphData?.length > 0) setCurvedLineData(graphData);
    else setCurvedLineData([]);
  }, [graphData]);

  return (
    <GraphCardView
      TopComponent={
        <GraphCardHeader
          leftSectionText={"Checking account"}
          rightSection={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateRangePicker"]}>
                  <DesktopDatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    className="customDatePickerInput"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateRangePicker"]}>
                  <DesktopDatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    className="customDatePickerInput"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          }
        />
      }
      BottomComponent={
        !startDate && !endDate && curvedLineData?.length === 0 ? (
          isLoading ? (
            <p>Loading....</p>
          ) : (
            <p>Please select the start and end dates</p>
          )
        ) : (
          <CurveLineChart
            width={600}
            height={200}
            filteredGraphData={curvedLineData}
          />
        )
      }
    />
  );
}

import React from "react";
import GraphCardView from "../../../../components/GraphCardView/GraphCardView";
import StackedBarChart from "../../../../components/StackedBarChart/StackedBarChart";
import GraphCardHeader from "../../../../components/GraphCardHeader/GraphCardHeader";
import GraphChip from "../../../../components/GraphChip/GraphChip";

export default function TotalCashFlowView({ data }) {
  return (
    <GraphCardView
      TopComponent={
        <GraphCardHeader
          leftSectionText={"Total Cash flow"}
          rightSection={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <GraphChip text="In" chipColor={"#00c881"} />
              <GraphChip text="Out" chipColor={"#4800f0"} />
            </div>
          }
        />
      }
      BottomComponent={<StackedBarChart width={600} height={200} data={data} />}
    />
  );
}

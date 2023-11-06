import React, { useState } from "react";
import GraphCardView from "../../../../components/GraphCardView/GraphCardView";
import BarChart from "../../../../components/BarChart/BarChart";
import GraphCardHeader from "../../../../components/GraphCardHeader/GraphCardHeader";
import UploadFileDialog from "../../../../components/UploadFileDialog/UploadFileDialog";

export default function InvoicesOwnedView({ data }) {
  const [openFileDialog, setOpenFileDialog] = useState(false);
  return (
    <>
      <GraphCardView
        TopComponent={
          <GraphCardHeader
            leftSectionText={"Invoices owed to you"}
            rightSection={
              <button
                style={{
                  backgroundColor: "#e4e9fe",
                  color: "#4713f0",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "8px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setOpenFileDialog(true)}
              >
                {"New Sales Invoice"}
              </button>
            }
          />
        }
        BottomComponent={<BarChart width={600} height={200} data={data} />}
      />
      <UploadFileDialog
        open={openFileDialog}
        setOpen={setOpenFileDialog}
        dialogTitle={"Upload the sales invoice file"}
      />
    </>
  );
}

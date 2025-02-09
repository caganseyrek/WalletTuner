"use client";

import React from "react";

import { Milestone } from "@wallettuner/resource-types";

import { milestoneColumns } from "@/components/data_table/columns/MilestoneColumns";
import DataTable from "@/components/data_table/DataTable";
import MilestoneDialog from "@/components/dialogs/MilestoneDialog";

const MilestonePage = () => {
  return (
    <DataTable
      columns={milestoneColumns}
      data={[
        {
          _id: "2398492839423",
          user_id: "912849129841",
          account_id: "92149128912",
          name: "Birikim",
          target_amount: 100,
          progress: 25,
          start_date: "Sun Feb 09 2025 18:10:55 GMT+0300 (GMT+03:00)",
          end_date: "Sun Feb 09 2025 18:10:55 GMT+0300 (GMT+03:00)",
          status: "success",
        } as Milestone.MilestonePropsWithString,
      ]}
      createDialog={<MilestoneDialog />}
    />
  );
};

export default MilestonePage;

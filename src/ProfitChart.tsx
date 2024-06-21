import React from "react";

import { Area } from "@ant-design/plots";
import { OptionLeg } from "./utils";
import { getMainChartData, getLegChartData } from "./calc";

export const ProfitChart = ({ options }: { options: OptionLeg[] }) => {
  const profitLossData = getMainChartData(options);
  const legProfitLossData = getLegChartData(options);

  return (
    <Area
      {...{
        data: [profitLossData, legProfitLossData].flat(),
        axis: { x: { title: "Price at Expiry" }, y: { title: "Profit/Loss" } },
        xField: "expiryPrice",
        yField: "profitLoss",
        colorField: "category",
        type: "view",
        children: [
          {
            data: profitLossData,
            type: "area",
          },
          {
            data: legProfitLossData,
            type: "line",
          },
        ],
      }}
    />
  );
};

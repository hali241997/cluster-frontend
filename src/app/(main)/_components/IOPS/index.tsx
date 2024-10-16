"use client";

import { FC, useCallback, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CategoricalChartState } from "recharts/types/chart/types";

interface DataPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

const data: DataPoint[] = [
  {
    name: "Page A",
    uv: 40000,
    pv: 24000,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 30000,
    pv: 13980,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 20000,
    pv: 98000,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 27800,
    pv: 39080,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 18900,
    pv: 48000,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 23900,
    pv: 38000,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 34900,
    pv: 43000,
    amt: 2100,
  },
];

export const IOPS: FC = () => {
  const [hoveredData, setHoveredData] = useState<{
    uv: number;
    pv: number;
  }>({
    uv: data[data.length - 1].uv,
    pv: data[data.length - 1].pv,
  });

  const handleMouseMove = useCallback((nextState: CategoricalChartState) => {
    if (nextState && nextState.activePayload) {
      const { payload } = nextState.activePayload[0];
      setHoveredData({ uv: payload.uv, pv: payload.pv });
    }
  }, []);

  return (
    <div className="w-full h-[144px] flex relative">
      <div className="flex-1 mr-4">
        <div className="text-[#C7CACC] text-lg leading-6 mb-3 ml-4">IOPS</div>
        <ResponsiveContainer width="100%" height={144}>
          <LineChart data={data} onMouseMove={handleMouseMove}>
            <CartesianGrid vertical={false} stroke="#646B72" />
            <XAxis dataKey="name" />
            <YAxis
              dataKey="pv"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#A6AAAE",
                fontWeight: 400,
                fontSize: "12px",
              }}
              ticks={[0, 50000, 100000]}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ visibility: "visible" }}
            />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#00A3CA"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#AA7EDD"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <div className="text-lg text-[#858B90]">IOPS</div>

        <div className="w-[160px] border-[#333B4480] border-[1px] bg-[#222C364D]">
          <div className="border-b-[#333B4480] border-b-[1px] px-3 py-2">
            <div className="text-base leading-5 font-medium text-[#A6AAAE]">
              UV
            </div>
            <div className="text-lg text-[#AA7EDD]">
              {(Number(hoveredData.uv) / 1000).toFixed(1)}k{" "}
              <span className="text-xs">IOPS</span>
            </div>
          </div>

          <div className="px-3 py-2">
            <div className="text-base leading-5 font-medium text-[#A6AAAE]">
              PV
            </div>
            <div className="text-lg leading-5 text-[#00A3CA]">
              {(Number(hoveredData.pv) / 1000).toFixed(1)}k{" "}
              <span className="text-xs">IOPS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: DataPoint }[];
  coordinate?: { x: number; y: number };
}

const CustomTooltip: FC<CustomTooltipProps> = ({
  active,
  payload,
  coordinate,
}) => {
  if (!active || !payload || !payload.length || !coordinate) return null;

  const { pv, uv } = payload[0].payload;

  return (
    <div
      className="absolute top-0 -translate-x-1/2 -translate-y-full flex w-full gap-5 pointer-events-none"
      style={{ left: coordinate.x }}
    >
      <div>UV: {uv}</div>
      <div>PV: {pv}</div>
    </div>
  );
};

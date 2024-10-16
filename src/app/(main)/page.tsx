"use client";

import { SelectField, SelectFieldOption } from "@/components/SelectField";
import { FC, useCallback, useState } from "react";
import { IOPS } from "./_components/IOPS";
import { Throughput } from "./_components/Throughput";

const options: Array<SelectFieldOption> = [
  { value: "today", label: "Today" },
  { value: "week", label: "Last 7 days" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

const PerfomanceMetrics: FC = () => {
  const [selectedOption, setSelectedOption] = useState<SelectFieldOption>({
    value: "today",
    label: "Today",
  });

  const handleOptionSelect = useCallback((option: SelectFieldOption) => {
    setSelectedOption(option);
  }, []);

  return (
    <div className="py-3 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="font-light text-xl leading-8">Performance Metrics</div>

        <SelectField
          id="interval"
          containerClassName="w-[150px] h-6"
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={handleOptionSelect}
        />
      </div>

      <div className="flex flex-col gap-[70px]">
        <IOPS />

        <Throughput />
      </div>
    </div>
  );
};

export default PerfomanceMetrics;

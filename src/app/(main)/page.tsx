"use client";

import { SelectField, SelectFieldOption } from "@/components/SelectField";
import { addCluster, ClusterData } from "@/redux/cluster/slice";
import { ErrorType } from "@/types";
import axiosClient from "@/utils/axiosClient";
import { AxiosResponse } from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { IOPS } from "./_components/IOPS";
import { Throughput } from "./_components/Throughput";

const options: Array<SelectFieldOption> = [
  { value: "week", label: "Last 7 days" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

interface ClusterResponse {
  id: string;
  name: string;
  data: ClusterData[];
}

const client = axiosClient();

const PerfomanceMetrics: FC = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState<SelectFieldOption>({
    value: "week",
    label: "Last 7 days",
  });

  const handleOptionSelect = useCallback((option: SelectFieldOption) => {
    setSelectedOption(option);
  }, []);

  const getAllClusterData = useCallback(async () => {
    try {
      setLoading(true);

      const response: AxiosResponse<ClusterResponse> = await client.get(
        "/getTimeSeries",
        { params: { timezone: selectedOption.value } }
      );
      if (response.status === 200) {
        dispatch(
          addCluster({
            id: response.data.id,
            name: response.data.name,
            data: response.data.data,
          })
        );
      }
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  }, [dispatch, selectedOption.value]);

  useEffect(() => {
    getAllClusterData();
  }, [getAllClusterData]);

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

      <div className="flex flex-col gap-14 lg:gap-[70px]">
        <IOPS isLoading={isLoading} />

        <Throughput isLoading={isLoading} />
      </div>
    </div>
  );
};

export default PerfomanceMetrics;

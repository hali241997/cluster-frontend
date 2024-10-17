"use client";

import { SelectField, SelectFieldOption } from "@/components/SelectField";
import {
  addCluster,
  ClusterData,
  useClusterState,
} from "@/redux/cluster/slice";
import axiosClient from "@/utils/axiosClient";
import { AxiosResponse } from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
  const { iops, throughputs } = useClusterState();

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

      const response: AxiosResponse<ClusterResponse> = await client({
        url: "/getTimeSeries",
        params: { timezone: selectedOption.value },
      });
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
      console.log(error);
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
        {iops.length > 0 && <IOPS />}

        {throughputs.length > 0 && <Throughput />}
      </div>
    </div>
  );
};

export default PerfomanceMetrics;

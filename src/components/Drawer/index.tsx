import { FC } from "react";
import { CurrentUser } from "./CurrentUser";
import { Heading } from "./Heading";
import { Routes } from "./Routes";

export const Drawer: FC = () => {
  return (
    <div className="w-[200px] hidden lg:block transition-all  border-[#283038] border-r-[1px] bg-grey">
      <div className="py-[14px] flex flex-col h-full">
        <div className="h-full">
          <Heading />

          <Routes />
        </div>

        <div>
          <CurrentUser />
        </div>
      </div>
    </div>
  );
};

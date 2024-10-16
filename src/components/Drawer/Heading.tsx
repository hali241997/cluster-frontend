import { FC } from "react";
import Logo from "@/vectors/logo.svg";
import Image from "next/image";

export const Heading: FC = () => {
  return (
    <div className="px-3 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div>
          <Image src={Logo} alt="logo" width={28} height={28} />
        </div>

        <div className="font-light text-xl leading-8">[Cluster Name]</div>
      </div>

      <hr className="border-lightGrey" />
    </div>
  );
};

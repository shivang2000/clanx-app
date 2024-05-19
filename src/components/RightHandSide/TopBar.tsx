"use client";

import Image from "next/image";
import { memo, useState } from "react";

const TopBar = () => {
  const [isTodaySelected, setIsTodaySelected] = useState(false);

  const [isCelsiusSelected, setIsCelsiusSelected] = useState(true);

  return (
    <div className="flex flex-row w-full justify-between px-[32px] pt-[64px]">
      <div className="flex flex-row gap-4">
        <div
          className={`${
            !isTodaySelected ? "text-[#C0C0C0]" : "text-black underline"
          } font-semibold cursor-pointer text-2xl`}
          onClick={() => setIsTodaySelected(true)}
        >
          Today
        </div>
        <div
          className={`${
            isTodaySelected ? "text-[#C0C0C0]" : "text-black underline"
          } font-semibold cursor-pointer text-2xl`}
          onClick={() => setIsTodaySelected(false)}
        >
          Week
        </div>
      </div>
      <div className="flex flex-row gap-4">
        {/* degree celsius */}
        <div
          className={`${
            isCelsiusSelected ? "bg-black text-white" : "bg-white text-black"
          } cursor-pointer font-medium rounded-full p-2 text-2xl`}
          onClick={() => setIsCelsiusSelected(true)}
        >
          {"\u00b0"}C
        </div>
        <div
          className={`${
            !isCelsiusSelected ? "bg-black text-white" : "bg-white text-black"
          }   cursor-pointer font-medium rounded-full p-2 text-2xl`}
          onClick={() => setIsCelsiusSelected(false)}
        >
          {"\u00b0"}F
        </div>

        {/* image */}
        <div>
          <Image
            alt=""
            src={"https://images.unsplash.com/photo-1417325384643-aac51acc9e5d"}
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(TopBar);

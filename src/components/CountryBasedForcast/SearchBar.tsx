"use client";

import { getWeatherData } from "@/Global/services";
import { useGetWeatherDataQuery } from "@/Store";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const data = useGetWeatherDataQuery({});

  console.log("asdas", data);

  // useEffect(() => {
  //   getWeatherData().then((res) =>
  //     console.log("getWeatherDatagetWeatherData", res)
  //   );
  // }, []);

  return (
    <div className="flex flex-row gap-x-2 mt-16 mx-16 content-between">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for places ..."
          value={search}
        />
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;

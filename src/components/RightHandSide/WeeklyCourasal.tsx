"use client";

import { IGlobalAppStore, useGet7DaysQuery } from "@/Store";
import { Fragment, memo, useMemo } from "react";
import SingleDayWeatherCarousalCard from "./SingleDayWeatherCarousalCard";
import { shallowEqual, useSelector } from "react-redux";

const WeeklyCourasal = () => {
  const { lat, lon } = useSelector(
    (store: IGlobalAppStore) => ({
      lat: store.appStore.lat,
      lon: store.appStore.lon,
    }),
    shallowEqual
  );

  const { data } = useGet7DaysQuery(
    {
      lat: lat ? lat : "",
      lon: lon ? lon : "",
    },
    {
      skip: lat === null || lon === null,
    }
  );

  const DataIndexToshow: number[] = useMemo(() => {
    const temp = new Set<string>();
    const outputIndexes: number[] = [];
    if (data) {
      data.list.forEach((item, idx) => {
        if (
          item.dt_txt.split(" ")[1] === "12:00:00" &&
          !temp.has(item.dt_txt.split(" ")[0])
        ) {
          temp.add(item.dt_txt.split(" ")[0]);
          outputIndexes.push(idx);
        }
      });
    }

    return outputIndexes;
  }, [data]);
  console.log("DataIndexToshowDataIndexToshow", DataIndexToshow);
  return (
    <div className="flex flex-row px-[32px] pt-[32px] w-full gap-4 ">
      {data &&
        DataIndexToshow.map((idx) => (
          <Fragment key={data.list[idx].dt}>
            <SingleDayWeatherCarousalCard index={idx} />
          </Fragment>
        ))}
    </div>
  );
};
export default memo(WeeklyCourasal);

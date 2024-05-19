"use client";
import { DAYS_NAME } from "@/Global/Helpers";
import { IGlobalAppStore, useGet7DaysQuery } from "@/Store";
import Image from "next/image";
import { memo, useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";

const SingleDayWeatherCarousalCard = ({ index }: { index: number }) => {
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

  const currentCardData = useMemo(() => {
    return data?.list[index] ?? null;
  }, [data?.list, index]);

  const day = useMemo(() => {
    if (currentCardData) {
      const d = new Date(currentCardData.dt * 1000);

      return DAYS_NAME[d.getDay()];
    }
    return "-";
  }, [currentCardData]);

  return currentCardData ? (
    <div className="grow">
      <div className="flex  flex-col items-center bg-white rounded-2xl min-w-32 p-4">
        {/* day */}
        <div className="text-xl">{day}</div>
        {/* img */}
        <div>
          <Image
            src={`https://openweathermap.org/img/wn/${currentCardData.weather[0].icon}.png`}
            width={100}
            height={100}
            alt=""
          />
        </div>
        {/* value */}
        <div className="flex flex-row gap-[2px]">
          <div className="text-xl">
            {currentCardData.main.temp_max}
            {"\u00b0"}
          </div>
          <div className="text-xl text-[#B4B4B4]">
            {currentCardData.main.temp_min}
            {"\u00b0"}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default memo(SingleDayWeatherCarousalCard);

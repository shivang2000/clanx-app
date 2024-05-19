"use client";

import Card from "@/Global/Components/Card";
import {
  IGlobalAppStore,
  useGetTodaysAirPopluationInfoQuery,
  useGetTodaysWeatherInfoQuery,
} from "@/Store";
import { memo, useMemo, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { SemiCircleProgress } from "react-semicircle-progressbar";

const TodayHighlightSection = () => {
  const { lat, lon } = useSelector(
    (store: IGlobalAppStore) => ({
      lat: store.appStore.lat,
      lon: store.appStore.lon,
    }),
    shallowEqual
  );
  const { data } = useGetTodaysWeatherInfoQuery(
    {
      lat: lat ? lat : "",
      lon: lon ? lon : "",
    },
    {
      skip: lat === null || lon === null,
    }
  );
  const { data: airPopluationData } = useGetTodaysAirPopluationInfoQuery(
    {
      lat: lat ? lat : "",
      lon: lon ? lon : "",
    },
    {
      skip: lat === null || lon === null,
    }
  );

  const getDateFormate = (date: string | number | undefined) => {
    let d = date ? new Date(date) : new Date();

    const hr = d.getHours();
    const mm = d.getMinutes();

    return `${hr >= 10 ? "" : "0"}${hr}:${mm >= 10 ? "" : "0"}${mm} ${
      hr > 12 ? "PM" : "AM"
    }`;
  };

  const visibilityText = useMemo(() => {
    if (data) {
      if (data.visibility < 3) {
        return "Bad";
      }
      if (data.visibility < 7) {
        return "Average";
      }

      return "Good";
    }
    return "-";
  }, [data]);

  return (
    <div className="self-start px-[32px] py-[64px] pb-8 h-full w-full">
      <div className="flex flex-col  gap-8">
        <div className="text-3xl">Todays&apos;s Highlights</div>

        <div className="grid grid-cols-3 grid-rows-2 gap-6 ">
          <div>
            <Card>
              <div className="flex flex-col p-4 h-full">
                <div>UV Index</div>
                <div className="flex items-center justify-center">
                  <SemiCircleProgress
                    percentage={80}
                    size={{
                      width: 200,
                      height: 200,
                    }}
                    strokeWidth={10}
                    strokeColor="#f00"
                  />
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card>
              <div className="flex flex-col p-4 justify-between h-full">
                <div className="text-gray-400 text-2xl">Wind Status</div>
                <div className="text-6xl font-medium">
                  {data?.wind.speed
                    ? (+(data?.wind.speed ?? "") * 3.6).toFixed(2) + " km/h"
                    : "-"}
                </div>
                <div>WSW</div>
              </div>
            </Card>
          </div>
          <div>
            <Card>
              <div className="flex flex-col p-4  h-full">
                <div className="text-gray-400 text-2xl">Sunrise & Sunset</div>
                <div className="flex flex-col justify-around flex-grow">
                  <div className="flex items-center gap-4 ">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="orange"
                        className="bi bi-sunrise"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                      </svg>
                    </div>
                    <div className="text-xl">
                      {getDateFormate(
                        data?.sys.sunrise ? data?.sys.sunrise * 1000 : undefined
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="orange"
                        className="bi bi-sunset"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                      </svg>
                    </div>
                    <div className="text-xl">
                      {getDateFormate(
                        data?.sys.sunset ? data?.sys.sunset * 1000 : undefined
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card>
              <div className="flex flex-col p-4 justify-between h-full">
                <div className="text-gray-400 text-2xl">Humidity</div>
                <div className="text-6xl font-medium">
                  {data?.main.humidity ? data?.main.humidity + "%" : "-"}
                </div>
                <div>Normal</div>
              </div>
            </Card>
          </div>
          <div>
            <Card>
              <div className="flex flex-col p-4 justify-between h-full">
                <div className="text-gray-400 text-2xl">Visibility</div>
                <div className="text-6xl font-medium">
                  {data?.visibility ? data.visibility / 1000 + " km" : "-"}
                </div>
                <div>{visibilityText}</div>
              </div>
            </Card>
          </div>
          <div>
            <Card>
              <div className="flex flex-col p-4 justify-between h-full">
                <div className="text-gray-400 text-2xl">Air Quality</div>
                <div className="text-6xl font-medium">
                  {airPopluationData?.list[0].main.aqi
                    ? airPopluationData?.list[0].main.aqi
                    : "-"}
                </div>
                <div>{visibilityText}</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TodayHighlightSection);

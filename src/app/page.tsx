"use client";

import { Providers } from "@/app/providers";

import CountryBasedForcast from "@/components/CountryBasedForcast";
import TodayHighlightSection from "@/components/RightHandSide/TodayHighlightSection";
import TopBar from "@/components/RightHandSide/TopBar";
import WeeklyCourasal from "@/components/RightHandSide/WeeklyCourasal";
import {
  useGetCurrentGeolocationDataQuery,
  useGetWeatherDataQuery,
} from "@/Store";
import { updateAppStore } from "@/Store/appStoreSlice";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  // useGetWeatherDataQuery({});
  const { data } = useGetCurrentGeolocationDataQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (data)
      dispatch(
        updateAppStore({
          type: "UPDATE_COORDINATES",
          value: {
            lat: `${data.lat}`,
            lon: `${data.lon}`,
          },
        })
      );
  }, [data, dispatch]);
  const windowHeight = useMemo(() => window.screen.availHeight * 0.95, []);
  return (
    <Providers>
      <div
        className={`w-screen h-screen flex items-center justify-center bg-[#D6D7DA] h-[${windowHeight}px]`}
      >
        <div className="w-11/12  flex flex-row  bg-white rounded-[64px]  m-6">
          {/* left hand side */}
          <div>
            <CountryBasedForcast />
          </div>

          {/* right hand side */}
          <div className="w-full bg-[#F5F5F7] flex flex-col rounded-r-[64px]   items-center">
            <TopBar />

            <WeeklyCourasal />

            <TodayHighlightSection />
          </div>
        </div>
      </div>
    </Providers>
  );
}

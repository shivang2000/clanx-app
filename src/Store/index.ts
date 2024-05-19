import { IGeoLocationStructure } from "@/Global/services";

import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appStoreSlice, IAppStore } from "./appStoreSlice";

export const openWeatherApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org/" }),
  endpoints: (builder) => ({
    getWeatherData: builder.query<any, { searchQuery?: string }>({
      queryFn: async ({ searchQuery }) => {
        try {
          let query =
            searchQuery && searchQuery.length > 0
              ? `q=${searchQuery}`
              : searchQuery;
          if (searchQuery === undefined) {
            const currentlocation = await fetch("http://ip-api.com/json");
            const currentlocationjson: IGeoLocationStructure =
              await currentlocation.json();

            query = `lat=${currentlocationjson.lat}&lon=${currentlocationjson.lon}`;
          }

          const data = await fetch(
            `https://api.openweathermap.org/data/2.5/${
              query?.includes("q") ? "find" : "weather"
            }?${query}&appid=515c76cdeb47e8492c2fc0017d53a23f&units=metric`
          );

          const json = data.json();
          return { data: json };
        } catch (err: any) {
          return {
            error: err,
          };
        }
      },
    }),
    getCurrentGeolocationData: builder.query<IGeoLocationStructure, any>({
      queryFn: async () => {
        try {
          const currentlocation = await fetch("http://ip-api.com/json");
          const currentlocationjson: IGeoLocationStructure =
            await currentlocation.json();

          return { data: currentlocationjson };
        } catch (err: any) {
          return { error: err };
        }
      },
    }),
    getCurentGeoLocation: builder.query<IGeoLocationStructure, {}>({
      queryFn: async () => {
        try {
          const currentlocation = await fetch("http://ip-api.com/json");
          const currentlocationjson: IGeoLocationStructure =
            await currentlocation.json();

          return { data: currentlocationjson };
        } catch (err: any) {
          return { error: err };
        }
      },
    }),
    getTodaysWeatherInfo: builder.query<
      ICurrentWeatherData,
      { lat: string; lon: string }
    >({
      query: ({ lat, lon }) =>
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=515c76cdeb47e8492c2fc0017d53a23f&units=metric`,
    }),
    getTodaysAirPopluationInfo: builder.query<
      {
        coord: {
          lon: number;
          lat: number;
        };
        list: Array<{
          main: {
            aqi: number;
          };
          components: {
            co: number;
            no: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            nh3: number;
          };
          dt: number;
        }>;
      },
      { lat: string; lon: string }
    >({
      query: ({ lat, lon }) =>
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=515c76cdeb47e8492c2fc0017d53a23f&units=metric`,
    }),
    get7Days: builder.query<IGetWeartherForCast, { lat: string; lon: string }>({
      query: ({ lat, lon }) =>
        `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=515c76cdeb47e8492c2fc0017d53a23f`,
    }),
    getOneApiCallData: builder.query<
      IGetWeartherForCast,
      { lat: string; lon: string }
    >({
      query: ({ lat, lon }) =>
        `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=515c76cdeb47e8492c2fc0017d53a23f`,
    }),
  }),
});

export const {
  useGetWeatherDataQuery,
  useGetCurentGeoLocationQuery,
  useGet7DaysQuery,
  useGetCurrentGeolocationDataQuery,
  useGetTodaysWeatherInfoQuery,
  useGetTodaysAirPopluationInfoQuery,
} = openWeatherApiSlice;

export interface IGlobalAppStore {
  appStore: IAppStore;
}

export const store = configureStore({
  reducer: {
    api: openWeatherApiSlice.reducer,
    appStore: appStoreSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(openWeatherApiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export interface IGetWeartherForCast {
  cod: string;
  message: number;
  cnt: number;
  list: IGetWeartherForcastList[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface IGetWeartherForcastList {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface ICurrentWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

"use client";
// https://openweathermap.org/data/2.5/find?q=mumbai&appid=515c76cdeb47e8492c2fc0017d53a23f&units=metric
// 7772202b4575c4c89ce9e45d41b78d13 aapid

export const getWeatherData = async (searchQuery?: string) => {
  try {
    let query =
      searchQuery && searchQuery.length > 0 ? `q=${searchQuery}` : searchQuery;
    if (searchQuery === undefined) {
      const currentlocation = await fetch("http://ip-api.com/json");
      const currentlocationjson: IGeoLocationStructure =
        await currentlocation.json();

      query = `lat=${currentlocationjson.lat}&lon=${currentlocationjson.lon}`;
    }

    const data = await fetch(
      `https://openweathermap.org/data/2.5/${
        query?.includes("q") ? "find" : "weather"
      }?${query}&appid=515c76cdeb47e8492c2fc0017d53a23f&units=metric`
    );

    const json = data.json();
    return json;
  } catch (err) {
    throw err;
  }
};

export interface IGeoLocationStructure {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

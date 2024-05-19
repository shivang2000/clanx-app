import Image from "next/image";
import SearchBar from "./SearchBar";
import sunyimg from "@/../public/sunnyimag.png";
import { DAYS_NAME } from "@/Global/Helpers";

const CountryBasedForcast = () => {
  const date = new Date();

  return (
    <div className="flex flex-col justify-between h-full gap-y-8">
      <div>
        <SearchBar />
      </div>

      <div className="pl-14">
        <Image src={sunyimg} alt={""} />
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="pl-14">
          <div className="flex flex-row">
            <span className="text-9xl font-250">12{"\u00b0"}</span>
            <span className="text-8xl font-250">C</span>
          </div>
        </div>

        <div className="pl-14">
          <div className="flex flex-row">
            <span className="text-2xl font-150">
              {DAYS_NAME[date.getDay()]},&nbsp;
            </span>
            <span className="text-2xl font-extralight">
              {(date.getHours() >= 10 ? "" : "0") + date.getHours()}:
              {(date.getMinutes() >= 10 ? "" : "0") + date.getMinutes()}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-16">
        <hr />
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="mx-16">Mostly Cloudy</div>
        <div className="mx-16">Rain - 30%</div>
      </div>

      <div></div>
    </div>
  );
};

export default CountryBasedForcast;

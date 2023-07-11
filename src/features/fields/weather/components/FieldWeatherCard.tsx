import { useAppSelector } from "@/store";
import { selectSelectedFieldId } from "../../fieldsSlice";
import { useFieldWeather } from "../services";

const FieldWeatherCard = () => {
  const selectedFieldId = useAppSelector(selectSelectedFieldId);
  const { data: fieldWeather } = useFieldWeather(selectedFieldId);

  console.log("fieldWeather", fieldWeather);

  if (!fieldWeather) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div className="text-sm font-semibold">Temperature</div>
          <div className="text-sm font-semibold">
            {fieldWeather.temperature} °C
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-sm font-semibold">Humidity</div>
          <div className="text-sm font-semibold">{fieldWeather.humidity} %</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-sm font-semibold">Wind speed</div>
          <div className="text-sm font-semibold">
            {fieldWeather.windSpeed} m/s
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-sm font-semibold">Wind direction</div>
          <div className="text-sm font-semibold">
            {fieldWeather.windDirection} °
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div className="text-sm font-semibold">Precipitation</div>
          <div className="text-sm font-semibold">
            {fieldWeather.precipitation} mm
          </div>
        </div>
        {/* <div className="flex flex-row justify-between">
          <div className="text-sm font-semibold">Pressure</div>
          <div className="text-sm font-semibold">
            {fieldWeather.pressure} hPa
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-sm font-semibold">Cloudiness</div>
          <div className="text-sm font-semibold">
            {fieldWeather.cloudiness} %
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-sm font-semibold">Soil temperature</div>
          <div className="text-sm font-semibold">
            {fieldWeather.soilTemperature} °C
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FieldWeatherCard;

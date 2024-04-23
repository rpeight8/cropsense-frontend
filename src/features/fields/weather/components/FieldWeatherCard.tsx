import { useAppSelector } from "@/store";
import { selectSelectedFieldId } from "../../fieldsSlice";
import { useFieldWeather } from "../services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const FieldWeatherCard = () => {
  const selectedFieldId = useAppSelector(selectSelectedFieldId);
  const { data: fieldWeather } = useFieldWeather(selectedFieldId);

  console.log("fieldWeather", fieldWeather);

  if (!fieldWeather) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Temperature: {fieldWeather.temperature}</div>
        <div>Humidity: {fieldWeather.humidity}</div>
        <div>Wind: {fieldWeather.windDirection}</div>
        <div>Wind Speed: {fieldWeather.windSpeed}</div>
      </CardContent>
    </Card>
  );
};

export default FieldWeatherCard;

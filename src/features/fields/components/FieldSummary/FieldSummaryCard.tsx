import { selectSelectedFieldId } from "../../fieldsSlice";
import { useAppSelector } from "@/store";
import { useFieldSummary } from "../../services";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import List, { ListItem } from "@/components/ui/List";
import FieldSummarySeasonItem from "./FieldSummarySeasonItem";

const FieldSummaryCard = () => {
  const selectedFieldId = useAppSelector(selectSelectedFieldId);
  const { data: fieldSummary, isLoading } = useFieldSummary(selectedFieldId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!fieldSummary) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fieldSummary.name}</CardTitle>
        <CardDescription>
          {fieldSummary.area} {fieldSummary.areaUnit}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="mb-2 text-sm font-semibold">Crops rotation</h4>
        <List className="p-0 h-[130px]">
          {fieldSummary.seasons.map((season) => (
            <FieldSummarySeasonItem
              key={season.id}
              seasonName={season.name}
              cropName={season.crop?.name ?? "No crop"}
              cropColor={season.crop?.color ?? "gray"}
              startDate={season.startDate}
              endDate={season.endDate}
            />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default FieldSummaryCard;

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useAppSelector } from "@/store";
import { selectCrops } from "@/features/crops/cropsSlice";

type CropSelectProps = ElementProps<typeof Select> & {
  isLoading?: boolean;
};

const CropSelect = ({ isLoading, ...props }: CropSelectProps) => {
  const crops = useAppSelector(selectCrops);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a crop" />
      </SelectTrigger>
      <SelectContent>
        {crops.map((crop) => (
          <SelectItem key={crop.id} value={crop.id}>
            {crop.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CropSelect;

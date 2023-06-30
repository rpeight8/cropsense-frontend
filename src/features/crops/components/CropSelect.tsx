import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useAppSelector } from "@/store";
import { selectCrops } from "@/features/crops/cropsSlice";
import { SelectGroup } from "@radix-ui/react-select";

type CropSelectProps = ElementProps<typeof Select> & {
  isLoading?: boolean;
  initialCropId?: string;
  displayNone?: boolean;
};

const CropSelect = ({
  isLoading,
  initialCropId,
  displayNone,
  ...props
}: CropSelectProps) => {
  const crops = useAppSelector(selectCrops);

  return (
    <Select value={initialCropId} {...props}>
      <SelectTrigger className="w-full" isLoading={isLoading}>
        <SelectValue placeholder="Select a crop" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Crops</SelectLabel>
          {displayNone && (
            <SelectItem key="#NONE" value="">
              None
            </SelectItem>
          )}
          {crops.map((crop) => (
            <SelectItem key={crop.id} value={crop.id}>
              {crop.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CropSelect;

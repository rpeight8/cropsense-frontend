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
import { Crop } from "@/types";

type CropSelectProps = ElementProps<typeof Select> & {
  isLoading?: boolean;
  initialCropId?: string;
  displayNone?: boolean;
  onCropSelect?: (crop: Crop | null) => void;
};

const CropSelect = ({
  isLoading,
  initialCropId,
  displayNone,
  onValueChange,
  onCropSelect,
  ...props
}: CropSelectProps) => {
  const crops = useAppSelector(selectCrops);

  return (
    <Select
      value={initialCropId}
      onValueChange={(e) => {
        if (onCropSelect) {
          const selectedCrop = crops.find((crop) => crop.id === e);
          onCropSelect(selectedCrop || null);
        }

        if (onValueChange) {
          onValueChange(e);
        }
      }}
      {...props}
    >
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

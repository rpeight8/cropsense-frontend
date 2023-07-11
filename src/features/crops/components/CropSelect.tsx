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
import { Crop } from "../types";
import { useCrops } from "../services";

type CropSelectProps = ElementProps<typeof Select> & {
  initialCropId?: string;
  displayNone?: boolean;
  onCropSelect?: (crop: Crop | null) => void;
};

const CropSelect = ({
  initialCropId,
  displayNone,
  onValueChange,
  onCropSelect,
  ...props
}: CropSelectProps) => {
  const { data: crops, isLoading } = useCrops();

  return (
    <Select
      value={initialCropId}
      onValueChange={(e) => {
        if (onCropSelect) {
          const selectedCrop = crops?.find((crop) => crop.id === e);
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
          {crops?.map((crop) => (
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

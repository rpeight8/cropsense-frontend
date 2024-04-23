import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { SelectGroup } from "@radix-ui/react-select";
import { useCrops } from "../services";

type CropSelectProps = ElementProps<typeof Select> & {
  initialCropId?: string;
  displayNone?: boolean;
  onCropSelect?: (cropId: string) => void;
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
          onCropSelect(e);
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

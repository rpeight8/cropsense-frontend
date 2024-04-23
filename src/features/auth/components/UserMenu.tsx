import { ComponentPropsWithoutRef } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/NavigationMenu";
import { useAuth } from "../hooks/useAuth";
import List, { ListItem } from "@/components/ui/List";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

const UserMenu = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => {
  const { user, signOutUser } = useAuth();

  if (!user) {
    return null;
  }

  // signOutUser();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost"> {user.email}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <Button onClick={signOutUser}>Sign Out</Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;

import { ComponentPropsWithoutRef } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/NavigationMenu";
import { useAuth } from "../hooks/useAuth";
import List, { ListItem } from "@/components/ui/List";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const UserMenu = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => {
  const { user, signOutUser } = useAuth();

  console.log(user);

  if (!user) {
    return null;
  }

  return (
    <div className={cn(className)} {...props}>
      <NavigationMenu orientation="vertical" placement="bottom">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger placement="bottom" className="text-lg">
              {user.email}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-5">
              <List className="space-y-2">
                <ListItem>
                  <Button
                    className="w-[100px]"
                    onClick={() => {
                      signOutUser();
                    }}
                  >
                    Sign out
                  </Button>
                </ListItem>
              </List>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default UserMenu;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const AuthLayout = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Sign In using your credentials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SignInForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Sign Up using your credentials </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SignUpForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthLayout;

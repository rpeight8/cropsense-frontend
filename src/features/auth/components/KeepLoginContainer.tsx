import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const KeepLoginContainer = () => {
  const { user, verifyAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyAuth();
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      verify();
    } else {
      setIsLoading(false);
    }
  }, []);

  return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
};

export default KeepLoginContainer;

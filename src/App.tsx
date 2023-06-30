import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.split("/").length <= 1 || location.pathname === "/") {
      navigate(`/52.4,31,15/fields`);
    }
  }, [location.pathname, navigate]);
  return <Outlet />;
}

export default App;

import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.split("/").length <= 1) {
      navigate(`/20,11,15/fields`);
    }
  }, []);
  return <Outlet />;
}

export default App;

import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import FieldsMap from "./components/FieldsMap";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("A");
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname.split("/").length <= 1 || location.pathname === "/") {
      navigate(`/52.4,31,15/fields`);
    }
  }, [location.pathname, navigate]);
  return <Outlet />;
  // return (
  //   <FieldsMap
  //     className="h-full w-full"
  //     initialPosition={[50, 32]}
  //     initialZoom={15}
  //   />
  // );
}

export default App;

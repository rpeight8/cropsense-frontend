// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

import { AppProvider } from "@/providers/app";
import { AppRoutes } from "@/routes";
import Layout from "./features/auth/components/Layout";

//   useEffect(() => {
//     if (location.pathname.split("/").length <= 1 || location.pathname === "/") {
//       navigate(`/52.4,31,15/fields`);
//     }
//   }, [location.pathname, navigate]);
//   return <Outlet />;
// }

function App() {
  return (
    <AppProvider>
      <Layout></Layout>
      {/* <AppRoutes /> */}
    </AppProvider>
  );
}

export default App;

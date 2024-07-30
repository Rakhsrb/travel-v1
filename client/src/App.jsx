import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import Paths from "./Paths";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: Paths,
    },
  ]);
  return <RouterProvider router={routers} />;
}

export default App;

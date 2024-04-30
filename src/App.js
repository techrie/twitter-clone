import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ]);

  return <RouterProvider router={appRouter}>{/* <Home /> */}</RouterProvider>;
}

export default App;

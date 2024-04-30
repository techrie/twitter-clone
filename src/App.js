import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Body from "./Components/Body";

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

  return <RouterProvider router={appRouter}>{<Body />}</RouterProvider>;
}

export default App;

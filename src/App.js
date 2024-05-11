import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Body from "./Components/Body";
import DisplayUser from "./Components/DisplayUser";
import DisplayUserProfile from "./Components/DisplayUserProfile";

import ProfilePagee from "./Components/ProfilePagee";

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
    // {
    //   path: "/profile",
    //   element: <DisplayUserProfile />,
    // },
    {
      path: "/profile",
      element: <ProfilePagee />,
    },
  ]);

  return (
    <RouterProvider router={appRouter}>
      <Body />
    </RouterProvider>
  );
}

export default App;

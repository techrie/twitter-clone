import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Body from "./Components/Body";
import ProfilePage from "./Components/ProfilePage";

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
    //   element: <ProfilePage />,
    // },
  ]);

  return (
    <RouterProvider router={appRouter}>
      <Body />
    </RouterProvider>
  );
}

export default App;

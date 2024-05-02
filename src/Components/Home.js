import Feed from "./Feed";
import Sidebar from "./Sidebar";
import "./Home.css";
import Widgets from "./Widgets";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      {/* <Outlet /> */}
      <Feed />
      <Widgets />
    </div>
  );
};
export default Home;

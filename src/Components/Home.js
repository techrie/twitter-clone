import Feed from "./Feed";
import Sidebar from "./Sidebar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Feed />
    </div>
  );
};
export default Home;

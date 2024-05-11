import Feed from "./Feed";
import Sidebar from "./Sidebar";
import "./Home.css";
import Widgets from "./Widgets";
import FeedPagination from "./FeedPagination";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <FeedPagination />
      <Widgets />
    </div>
  );
};
export default Home;

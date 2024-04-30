import "./Widgets.css";
import SearchIcon from "@mui/icons-material/Search";

const Widgets = () => {
  return (
    <div className="widgets">
      <div className="widgets-search">
        <SearchIcon className="widgetsSearchIcon" />
        <input type="text" className="" />
      </div>

      <div className="widgetsContainer"></div>
    </div>
  );
};
export default Widgets;

import "./User.css";

const User = ({ displayName }) => {
  return (
    <>
      <div className="user">
        <img
          className="user-img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s"
        />
        <h1 className="user-name">{displayName}</h1>
      </div>
    </>
  );
};
export default User;

/*
<SomeIcon className="svg_icons"/>

.svg_icons {
  transform: scale(1.8);
}
*/

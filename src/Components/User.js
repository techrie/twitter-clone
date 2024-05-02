const User = ({ displayName }) => {
  return (
    <>
      <div className="user-container">
        <div className="user">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s" />
          <h1>{displayName}</h1>
        </div>
      </div>
    </>
  );
};
export default User;

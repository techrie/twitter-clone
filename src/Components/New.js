const [open, setOpen] = React.useState(false);

const handleOpen = () => {
  setOpen(!open);
};

const handleMenuOne = () => {
  // do something
  setOpen(false);
};

const handleMenuTwo = () => {
  // do something
  setOpen(false);
};
return (
  <>
    <div className="editdelete-container">
      return (
      <div className="dropdown">
        <button onClick={handleOpen}>Dropdown</button>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              <button onClick={handleMenuOne}>Edit</button>
            </li>
            <li className="menu-item">
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </li>
          </ul>
        ) : null}
      </div>
      );
      <button
        className="edit-btn"
        onClick={() => {
          setEditBox(true);
          setEditId(post.id);
        }}
      >
        Edit
      </button>
      <button className="delete-btnn" onClick={() => handleDeletePost(post.id)}>
        Delete
      </button>
      {editBox && editId === post.id && (
        <EditPost post={post} setEditBox={setEditBox} editId={post.id} />
      )}
      {/* <button onClick={() => setCommentBox(true)}>Comment</button>
                {commentBox && (
                  <CommentInput post={post} setCommentBox={setCommentBox} />
                )} */}
    </div>

    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <p>{lang}</p>
      <select value={lang} onChange={changeLanguage}>
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
    </div>
  </>
);

// useEffect(() => {
//   db.collection("posts").onSnapshot((snapshot) => {
//     setPosts(
//       snapshot?.docs
//         .map((doc) => doc.data())
//         .filter(function (doc) {
//           console.log(
//             JSON.stringify(doc.authorId) + " printing doc feed js useEffect"
//           );
//           return post.followees.indexOf(doc.authorId) >= 0;
//         })
//     );
//     // setPosts(snapshot?.docs.map((doc) => doc.data()));
//   });
// }, []);

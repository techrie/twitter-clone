import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { fetchUser } from "./FetchUser";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../utils/firebase";
import { nanoid } from "nanoid";
import { isCommentEdit, setPostsData } from "../utils/postsSlice";

const FeedPagination = () => {
  const [posts, setPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, SetPostsPerPage] = useState(2);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const refreshPost = useSelector((store) => store.post.refreshPost);
  console.log(JSON.stringify(refreshPost) + " refresh post");
  const isComment = useSelector((store) => store.post);

  console.log(user?.uid + "  from feed.....");

  const postData = useSelector((store) => store.posts);
  console.log(postData, "from Post slice feed ");
  // console.log(JSON.stringify(post) + "  from Feed js.....");

  useEffect(() => {
    dispatch(isCommentEdit(false));
  }, []);

  const fetchUserPosts = async (userID) => {
    let dataObj = [];
    console.log(userID, "userID");
    let followsIdList;
    userID?.uid &&
      (await db
        .collection("users")
        .doc(userID?.uid)
        .onSnapshot((snapshot) => {
          let dataArray = snapshot?.data();
          followsIdList = dataArray && dataArray?.follows;
          followsIdList &&
            followsIdList.map(async (id) => {
              console.log(id, "from Feed Usersfollow id ");
              let postData = await getAuthorPosts(id);
              console.log(postData, " postData");
              dataObj.push(...postData);
              console.log(dataObj, "postsArray");
              return setPosts([...dataObj]);
            });
        }));
  };

  const getAuthorPosts = async (id) => {
    const fetchedUser = await fetchUser(id);
    const postsQuerySnapShot = await db
      .collection("posts")
      .where("authorId", "==", id)
      .orderBy("createdAt", "desc")
      .get();
    const posts = postsQuerySnapShot.docs.map((post) => {
      const data = post.data();
      return {
        id: post.id,
        ...data,
        author: fetchedUser,
        // createdAt: data.createdAt.toDate().toString(),
      };
    });
    return posts;
  };
  useEffect(() => {
    fetchUserPosts(user);
    dispatch(isCommentEdit(false));
  }, [user, isComment, refreshPost]);

  useEffect(() => {
    console.log(posts, "posts");
    setPosts(posts);
    // fetchUserPosts(user);
    // dispatch(setPostsData(posts));
  }, [posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let paginationNumbers = [];
  for (let i = 1; i <= Math.ceil(posts?.length / postsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="feed">
      <TweetBox />

      {posts?.length === 0 ? (
        <div className="no-posts">
          <h3>No posts by User. Please add a post!</h3>
        </div>
      ) : (
        currentPosts?.map((post) => (
          <div>
            <Post
              key={nanoid()}
              displayName={post.displayName}
              username={post.username}
              verified={post.verified}
              text={post.text}
              image={post.image}
              avatar={post.avatar}
              createdAt={post.createdAt}
              comments={post.comments}
              id={post.id}
            />
          </div>
        ))
      )}

      <div className="pagination">
        {paginationNumbers?.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePagination(pageNum)}
            className={currentPage === pageNum ? "active" : ""}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};
export default FeedPagination;

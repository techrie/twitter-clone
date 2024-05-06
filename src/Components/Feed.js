import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { fetchUser } from "./FetchUser";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../utils/firebase";
import { nanoid } from "nanoid";
import { isCommentEdit, setPostsData } from "../utils/postsSlice";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const [dataRefreshed, setDataRefreshed] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const refreshPost = useSelector((store) => store.post);
  console.log(JSON.stringify(refreshPost) + " refresh post");
  const isComment = useSelector((store) => store.post);

  console.log(user?.uid + "  from feed.....");

  const postData = useSelector((store) => store.posts);
  console.log(postData, "from Post slice feed ");
  // console.log(JSON.stringify(post) + "  from Feed js.....");

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

  useEffect(() => {
    dispatch(isCommentEdit(false));
  }, []);

  const fetchUserPosts = async (userID) => {
    debugger;
    let dataObj = [];
    console.log(userID, "userID");
    let followsIdList;
    userID?.uid &&
      (await db
        .collection("users")
        .doc(userID?.uid)
        .onSnapshot((snapshot) => {
          debugger;
          let dataArray = snapshot?.data();
          followsIdList = dataArray && dataArray?.follows;
          followsIdList &&
            followsIdList.map(async (id) => {
              debugger;
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
      // .orderByChild("timestamp")
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

  return (
    <div className="feed">
      <TweetBox />
      {posts.map((post) => (
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
          {/* <button onClick={handleCommentClick}>Comment</button> */}
        </div>
      ))}
    </div>
  );
};
export default Feed;

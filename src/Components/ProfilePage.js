// import { useEffect, useState } from "react";

// import { get, ref as sRef } from "firebase/database";
// import db from "../utils/firebase";
// import Post from "./Post";
// import { useSelector } from "react-redux";

// import { collection, Firestore, getDocs } from "firebase/firestore";
// import { fetchUser, fetchUserTweets } from "./FetchUser";

// const ProfilePage = () => {
//   const [posts, setPosts] = useState([]);

//   const user = useSelector((store) => store.user);

// console.log(JSON.stringify(user) + "from profilepage");

//   useEffect(() => {
//     fetchUser(user?.displayName, user?.uid);
//     console.log(fetchUser(user?.displayName, user?.uid));

//     const newTweets = fetchUserTweets(user?.uid);
//     setPosts(newTweets);
//   }, []);

//   return (
//     <>
//       <div>
//         <h1>User Profile</h1>
//       </div>
//       <div>
//         {posts?.map((post) => (
//           <Post
//             displayName={post.displayName}
//             username={post.username}
//             verified={post.verified}
//             text={post.text}
//             image={post.image}
//             avatar={post.avatar}
//           />
//         ))}
//       </div>
//     </>
//   );
// };
// export default ProfilePage;

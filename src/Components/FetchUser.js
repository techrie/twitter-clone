import db from "../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const fetchUser = async (userId) => {
  let userQuerySnapShot;
  // console.log(userId + " from fetching user");
  if (userId) {
    userQuerySnapShot = await db.collection("users").doc(userId).get();

    if (userQuerySnapShot.exists) {
      return {
        ...userQuerySnapShot.data(),
        uid: userQuerySnapShot.id,
      };
    } else {
      console.log("No such document!");
      return null;
    }
  }
};

export const deletePost = (postId) => {
  db.collection("posts")
    .doc(postId)
    .delete()
    .then(() => console.log("Deleted Post"))
    .catch((e) => console.log(e));
};

const getAuthorPosts = async (id) => {
  const fetchedUser = await fetchUser(id);
  const postsQuerySnapShot = await db
    .collection("posts")
    .where("authorId", "==", id)
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
export const fetchUserPosts = async (userID) => {
  const postsQuerySnapShot = await db
    .collection("posts")
    .where("authorId", "==", userID)
    .orderBy("createdAt", "desc")
    .get();

  const fetchedUser = await fetchUser(userID);

  // tweets = tweets Array of  Objects
  const posts = postsQuerySnapShot.docs.map((post) => {
    const data = post.data();
    const followsIdList = data?.follows;
    let dataObj = [];
    followsIdList &&
      followsIdList.map((id) => {
        dataObj.push(getAuthorPosts(id));
      });

    return {
      id: post.id,
      ...data,
      author: fetchedUser,
      // createdAt: data.createdAt.toDate().toString(),
    };
  });
  // returns array of objects (posts)
  return posts;
};

export const fetchPost = async (postId) => {
  const post = await firebase.firestore().collection("posts").doc(postId).get();

  if (!post.exists) return null;
  const user = await fetchUser({ userID: post.data().authorId });
  return {
    ...post.data(),
    author: user,
    id: postId,
    createdAt: post.data().createdAt.toDate().toString(),
  };
};

export const editPost = (postId) => {
  // db.collection("posts")
  //   .doc(postId)
  //   .update({
  //     text: "New Text Update",
  //   })
  //   .then(() => {
  //     console.log("Document successfully updated!");
  //   });

  const post = db.collection("posts").doc(postId).get();

  if (!post.exists) return null;
  // const user = await fetchUser({ userID: post.data().authorId });

  return {
    ...post.data,
    //edited post
  };
};

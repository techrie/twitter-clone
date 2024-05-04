// const db = firebase.firestore();

import db from "../utils/firebase";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const fetchUser = async (userId) => {
  let userQuerySnapShot;
  // console.log(userId + " from fetching user");
  // console.log(typeof userId);
  if (userId) {
    userQuerySnapShot = await db.collection("users").doc(userId).get();
    // console.log(typeof userQuerySnapShot);
    // console.log(userQuerySnapShot.exists);
    // console.log(Object.values(userQuerySnapShot));
    // console.log({ ...userQuerySnapShot.data() });
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

export const fetchUserPosts = async (userID) => {
  const postsQuerySnapShot = await db
    .collection("posts")
    .where("authorId", "==", userID)
    .get();

  const fetchedUser = await fetchUser(userID);

  // tweets = tweets Array of  Objects
  const posts = postsQuerySnapShot.docs.map((post) => {
    const data = post.data();

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

export const deletePost = (postId) => {
  db.collection("posts")
    .doc(postId)
    .delete()
    .then(() => console.log("Deleted Post"))
    .catch((e) => console.log(e));
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

// .where("parentTweet", "==", null)

/*

export const fetchUser = async ({ displayName, userID }) => {
  let userQuerySnapShot;

  if (displayName) {
    userQuerySnapShot = await db
      .collection("users")
      // .where("username", "==", displayName.slice(0, 4).toLowerCase())
      .where("username", "==", displayName.slice(0, 4).toLowerCase())
      .get();
    if (userQuerySnapShot.empty) {
      return null;
    }
    return {
      ...userQuerySnapShot.docs[0].data(),
      uid: userQuerySnapShot.docs[0].id,
    };
  }

  if (userID) {
    userQuerySnapShot = await db.collection("users").doc(userID).get();
    if (userQuerySnapShot.exists) {
      return {
        ...userQuerySnapShot.data(),
        uid: userQuerySnapShot.id,
      };
    } else {
      return null;
    }
  }
};
*/

// const db = firebase.firestore();

import db from "../utils/firebase";

export const fetchUser = async ({ displayName, userID }) => {
  let userQuerySnapShot;

  if (displayName) {
    userQuerySnapShot = await db
      .collection("users")
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

export const fetchUserTweets = async (userID) => {
  const tweetsQuerySnapShot = await db
    .collection("posts")
    .where("authorId", "==", userID)
    .get();

  const fetchedUser = await fetchUser({ userID });

  // tweets = tweets Array of  Objects
  const tweets = tweetsQuerySnapShot.docs.map((tweet) => {
    const data = tweet.data();

    return {
      id: tweet.id,
      ...data,
      author: fetchedUser,
      createdAt: data.createdAt.toDate().toString(),
    };
  });
  // returns array of objects (tweets)
  return tweets;
};

// .where("parentTweet", "==", null)

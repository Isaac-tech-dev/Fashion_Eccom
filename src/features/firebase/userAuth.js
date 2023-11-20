import { async } from "@firebase/util";
import { auth, db } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const userId = res.user.uid;
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    return {
      success: true,
      user: userDoc.data(),
    };
  } catch (error) {
    console.log(error);
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      name,
      email,
    });
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
    await signOut(auth);
    return {success:true}
}

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import auth from "../../firebase.init";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const cleanUp = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.log("no user is active!");
      }
      setLoading(false);
    });

    return () => {
      cleanUp();
    };
  }, []);

  const createUser = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);

      return result;
    } catch (error) {
      console.log("signup error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      return result;
    } catch (error) {
      console.log("firebase login error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const data = result.user;
      setUser(data);
      return result;
    } catch (error) {
      console.log("google pop-up error", error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log("logout error", error.message);
    }
  };

  const updateUserInfo = async (userName, url) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: url,
      });
      await auth.currentUser.reload();
      console.log(auth.currentUser);
    } catch (error) {
      console.log("firebase authentication failed", error.message);
    }
  };

  const contextProps = {
    user,
    loading,
    createUser,
    loginUser,
    googleSignUp,
    logoutUser,
    updateUserInfo,
  };
  return (
    <AuthContext.Provider value={contextProps}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

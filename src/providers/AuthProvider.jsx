/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        setLoading(true)
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false)
            setUser(user)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch(() => {
            // An error happened.
        });
    }

    const authInfo = { createUser, signInUser, user, logOut, loading }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
import {createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

const handleSignUp = async (firstName: string, lastName: string, email: string, password: string, setErrorMessage: (msg: string) => void) => {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email
        };
        await setDoc(doc(db, "userData", user.uid), userData);
        return true;
    } catch (e: any) {
        console.error(e);
        if (e.code) {
            setErrorMessage(e.code);
        } else setErrorMessage("Something went wrong. Try again later.");
        return false;
    }
}

const handleLogIn = async (email: string, password: string, setErrorMessage: (msg: string) => void) => {
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password)
        const user = userCred.user;
        return true;
    } catch (e: any) {
        console.error(e);
        if (e.code) {
            setErrorMessage(e.code);
        } else setErrorMessage("Something went wrong. Try again later.");
        return false;
    }
}

const fetchUserData = async (user: User | null) => {
    try {
        if (!user) return;

        const ref = doc(db, "userData", user.uid);
        const docSnap = await getDoc(ref);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.error("Error finding user");
            return;
        }

    } catch (e) {

    }

    
}

const deleteProfile = async (password: string, setErrorMessage: (msg :string) => void) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user || !user.email) {
            console.log("Error: user not found");
            setErrorMessage("There was an issue finding user");
            return false;
        };
        await signInWithEmailAndPassword(auth, user.email, password);

        await deleteUser(user);
        return true;
    } catch (error: any) {
        console.error(error);
        if (error.code) setErrorMessage(error.code);
        else setErrorMessage("Something went wrong");
        return false;
    }
}

export { handleSignUp, handleLogIn, fetchUserData, deleteProfile }
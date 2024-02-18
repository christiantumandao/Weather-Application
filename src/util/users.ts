import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

const handleSignUp = async (firstName: string, lastName: string, email: string, password: string, setErrorMessage: (msg: string) => void) => {
    await createUserWithEmailAndPassword(auth, email, password)
        .then( async (userCred)=> {
            const user = userCred.user;

            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email
            }
            await setDoc(doc(db, "userData", user.uid), userData);


        })
        .catch((e)=>{
            console.error(e);
            if (e.code) {
                setErrorMessage(e.code);
            }
            else setErrorMessage("Something went wrong. Try again later.");
            return false;
        })
}

const handleLogIn = async (email: string, password: string, setErrorMessage: (msg: string) => void) => {
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password)
        const user = userCred.user;

    } catch (e: any) {
        console.error(e);
        if (e.code) {
            setErrorMessage(e.code);
        } else setErrorMessage("Something went wrong. Try again later.");
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

export { handleSignUp, handleLogIn, fetchUserData }
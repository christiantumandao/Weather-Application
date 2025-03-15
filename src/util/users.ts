import {createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebaseConfig"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { location, userData } from "./types";


const handleSignUp = async (firstName: string, lastName: string, email: string, password: string, setErrorMessage: (msg: string) => void) => {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            units: "imperial"
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
            return docSnap.data() as userData; 
        } else {
            console.error("Error finding user");
            return;
        }

    } catch (e) {
        console.error(e);
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

const addRegion = async (loc: location | null, regions: location[], setUsersRegions: (d: location[])=>void) => {
    
    const user = auth.currentUser;
    if (!loc || !regions) return;
    if (!user) {
        alert("Must be signed in!");
        return;
    }

    try {
        const isAdded = checkIfRegionAdded(loc, regions);
        if (isAdded) return;
        const ref = collection(db, "userData", user.uid, "regions");
        const snap = await addDoc(ref, {...loc});
        const newRegions = [ ...regions ];
        newRegions.push({...loc, id: snap.id});
        setUsersRegions(newRegions);
    } catch (e) {
        console.error(e);
    }
}

export const checkIfRegionAdded = (loc: location, regions: location[]) => {
    for (const region of regions) {
        if (region.lat === loc.lat && region.lon === loc.lon) return true;
    }
    return false;
}

const fetchUserRegions = async (user: User) => {
    try {
        const newRegions:location[] = [];
        const ref = collection(db, "userData", user.uid, "regions");
        const querySnapshot = await getDocs(ref);
        querySnapshot.forEach((doc) => {
            const data = { ...doc.data() } as location;
            data.id = doc.id;
            newRegions.push(data);
        });
        return newRegions;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const changeUserUnits = async (units: "metric" | "imperial") => {
    try {
        const user = auth.currentUser;
        if (!user) return;
        const ref = doc(db, "userData", user.uid);
        await updateDoc(ref, {
            units: units
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export const deleteRegion = async (region: location, regions: location[], setUsersRegions: (regions: location[])=>void) => {
    try {
        const user = auth.currentUser;
        if (!user) return;
        if (!region.id) return;
        const ref = doc(db, "userData", user.uid, "regions", region.id);
        await deleteDoc(ref);
        const newRegions = regions.filter((r)=>r.id !== region.id);
        setUsersRegions(newRegions);

    } catch (e) {
        alert("Something went wrong deleting... Try again later.");
        console.error(e);
    }
}

export const changeFirstName = async (firstName: string) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            alert("Something went wrong finding user");
            return;
        }
        const ref = doc(db, "userData", user.uid);
        await updateDoc(ref, {
            firstName: firstName
        })

    } catch (e) {
        console.error(e);
    }
}

export const changeLastName = async (lastName: string) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            alert("Something went wrong finding user");
            return;
        }
        const ref = doc(db, "userData", user.uid);
        await updateDoc(ref, {
            lastName: lastName
        })
        
    } catch (e) {
        console.error(e);
    }
}




export { handleSignUp, handleLogIn, fetchUserData, deleteProfile, addRegion, fetchUserRegions }
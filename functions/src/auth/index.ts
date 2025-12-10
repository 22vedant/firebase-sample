import { getAuth as authV1 } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { HttpsError, onCall } from "firebase-functions/https"
// import { getAuth } from "firebase/auth"

const authv1 = authV1()
const db = getFirestore()


export const createUserAccount = onCall(async (request) => {
    const email = request.data.email
    const password = request.data.password
    const displayName = request.data.displayName
    const phoneNumber = request.data.phoneNumber

    if (!email || !password) {
        throw new HttpsError("invalid-argument", "Email and password are required")
    }

    try {
        const userRecord = await authv1.createUser({
            email,
            password,
            displayName,
            phoneNumber,
            emailVerified: false
        })

        const userDoc = {
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            username: (userRecord.displayName?.toLowerCase() ?? "") + Math.floor(Math.random() * 10000) + 1
        }

        await db.collection("users").doc(userRecord.uid).set(userDoc)

        return {
            message: "User account created successfully",
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
        };

    } catch (error: any) {
        console.error("Error creating user:", error);
        throw new HttpsError("internal", error.message);
    }
})

// export const signInUser = onCall(async (request) => {

// }) 
// import * as functions from "firebase-functions/v1"
import { getFirestore } from "firebase-admin/firestore"
import { logger } from "firebase-functions/logger"
import { onCall } from "firebase-functions/https"

const db = getFirestore()

export const newOnUserCreation = onCall(async (request) => {
    const { userDoc } = request.data
    await db.collection("users").doc(userDoc.uid).set(userDoc);

    logger.info(`Created Firestore record for user: ${userDoc.uid}`);

})

// const onUserCreation = functions.auth.user().onCreate(async (user) => {
//     const userDoc = {
//         uid: user.uid,
//         email: user.email ?? null,
//         displayName: user.displayName ?? null,
//         photoURL: user.photoURL ?? null,
//         signUpDate: FieldValue.serverTimestamp(),
//         username: (user.displayName?.toLowerCase() ?? "") + Math.floor(Math.random() * 10),
//         phoneNumber: user.phoneNumber ?? null,
//         role: "user",
//         isVerified: user.emailVerified,
//         socialLinks: {
//             "github": null,
//             "linkedin": null,
//             "portfolio": null,
//             "twitter": null,
//         }
//     };



// })

// export default onUserCreation
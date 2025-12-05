import { auth } from "firebase-functions/v1"
import { FieldValue, getFirestore } from "firebase-admin/firestore"
import { logger } from "firebase-functions/logger"

const db = getFirestore()

export const onUserCreation = auth.user().onCreate(async (event) => {
    const user = event.providerData
    const userDoc = {
        uid: user.uid,
        email: user.email ?? null,
        displayName: user.displayName ?? null,
        photoURL: user.photoURL ?? null,
        signUpDate: FieldValue.serverTimestamp(),
    };

    await db.collection("users").doc(user.uid).set(userDoc);

    logger.info(`Created Firestore record for user: ${user.uid}`);
})
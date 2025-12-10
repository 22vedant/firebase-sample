import { getFirestore } from "firebase-admin/firestore"
import { logger } from "firebase-functions/logger"
import { onCall } from "firebase-functions/https"

const db = getFirestore()

export const onUserInfoUpdate = onCall(async (request) => {
    const { userDoc } = request.data
    await db.collection("users").doc(userDoc.uid).update(userDoc)

    logger.info(`Created Firestore record for user: ${userDoc.uid}`);

})
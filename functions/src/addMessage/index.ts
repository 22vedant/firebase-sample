import { getDatabase } from "firebase-admin/database";
import { HttpsError, onCall } from "firebase-functions/https";
import { logger } from "firebase-functions/logger";

export const addMessage = onCall((req) => {
    const text = req.data?.text;

    if (!(typeof text == "string") || text.length == 0) {
        throw new HttpsError("invalid-argument", "The function must be called " +
            "with one arguments \"text\" containing the message text to add.");
    }

    if (!req.auth) {
        throw new HttpsError("failed-precondition", "The function must be " +
            "called while authenticated.");
    }

    const uid = req.auth.uid;
    const name = req.auth.token?.name || null;
    const picture = req.auth.token.picture
    const email = req.auth.token.email

    // const sanitizedMessage = sanitizer.sanitizeText(text)

    return getDatabase().ref("/messages").push({
        text: text,
        author: { uid, name, picture, email }
    }).then(() => {
        logger.info("New Message written");
        return { text }
    }).catch((error) => {
        throw new HttpsError("unknown", error.message, error);
    })

})

// HTTP Function
// export const addMessage = onRequest(async (req, res) => {
//     const original = req.query.text;

//     if (!original || typeof original !== "string") {
//         res.status(400).json({ error: "Query parameter 'text' is required" });
//         return;
//     }

//     const writeResult = await getFirestore()
//         .collection("messages")
//         .add({ original });

//     res.json({
//         result: `Message with ID: ${writeResult.id} added`,
//     });
// });
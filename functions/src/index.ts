import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

// HTTP Function
export const addMessage = onRequest(async (req, res) => {
    const original = req.query.text;

    if (!original || typeof original !== "string") {
        res.status(400).json({ error: "Query parameter 'text' is required" });
        return;
    }

    const writeResult = await getFirestore()
        .collection("messages")
        .add({ original });

    res.json({
        result: `Message with ID: ${writeResult.id} added`,
    });
});

// Firestore Trigger
export const makeUppercase = onDocumentCreated(
    "/messages/{documentId}",
    async (event) => {
        const data = event.data?.data();
        const original = data?.original;

        if (!original || typeof original !== "string") {
            logger.warn("No original message found");
            return null;
        }

        logger.log("Uppercasing", event.params.documentId, original);

        const uppercase = original.toUpperCase();

        return event.data?.ref.set({ uppercase }, { merge: true });
    }
);

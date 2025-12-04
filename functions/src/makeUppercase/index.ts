import { onDocumentCreated } from "firebase-functions/firestore";
import { logger } from "firebase-functions/logger";

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
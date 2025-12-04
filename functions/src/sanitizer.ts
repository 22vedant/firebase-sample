/**
 * Copyright 2022 Google Inc.
 * Licensed under the Apache License, Version 2.0
 */

import { Filter } from "bad-words";

const badWordsFilter = new Filter();

/**
 * Sanitizes the given text: fixes shouting and hides swearwords.
 */
export function sanitizeText(text: string): string {
    // Re-capitalize if the user is Shouting.
    if (isShouting(text)) {
        console.log("User is shouting. Fixing sentence case...");
        text = stopShouting(text);
    }

    // Moderate if the user uses SwearWords.
    if (containsSwearwords(text)) {
        console.log("User is swearing. moderating...");
        text = replaceSwearwords(text);
    }

    return text;
}

/**
 * Returns true if the string contains swearwords.
 */
function containsSwearwords(message: string): boolean {
    return message !== badWordsFilter.clean(message);
}

/**
 * Hide all swearwords. e.g: Crap => ****.
 */
function replaceSwearwords(message: string): string {
    return badWordsFilter.clean(message);
}

/**
 * Detect if the message is shouting (many uppercase chars or exclamation marks).
 */
function isShouting(message: string): boolean {
    return (
        message.replace(/[^A-Z]/g, "").length > message.length / 2 ||
        message.replace(/[^!]/g, "").length >= 3
    );
}

/**
 * Correctly capitalize the string as sentence case and remove exclamation points.
 */
function stopShouting(message: string): string {
    const sentenceCaseRegex =
        /(:?\.\s?|^)([A-Za-z\u00C0-\u1FFF\u2800-\uFFFD])/gi;
    const noExclamationsRegex = /!+/g;

    return message
        .toLowerCase()
        .replace(sentenceCaseRegex, match => match.toUpperCase())
        .replace(noExclamationsRegex, ".");
}

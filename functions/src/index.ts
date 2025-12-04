import { initializeApp } from "firebase-admin/app";

initializeApp();

import { addMessage } from "./addMessage";
import { addNumbers } from "./addNumbers";
import { makeUppercase } from "./makeUppercase";

export { addMessage, addNumbers, makeUppercase }

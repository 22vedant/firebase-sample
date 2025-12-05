import { initializeApp } from "firebase-admin/app";

initializeApp();

import { addMessage } from "./addMessage/index";
import { addNumbers } from "./addNumbers/index";
import { makeUppercase } from "./makeUppercase/index";
import { onUserCreation } from "./onUserCreation/index";

export { addMessage, addNumbers, makeUppercase, onUserCreation }

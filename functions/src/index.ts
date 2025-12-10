import { initializeApp } from "firebase-admin/app";
initializeApp();


import addMessage from "./addMessage";
import addNumbers from "./addNumbers";
import makeUppercase from "./makeUppercase";
import { newOnUserCreation } from "./onUserCreation";
// import { createUserAccount } from "./auth"

export { addMessage, addNumbers, makeUppercase, newOnUserCreation }

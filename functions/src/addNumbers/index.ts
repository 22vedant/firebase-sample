import { HttpsError, onCall } from "firebase-functions/https";

export const addNumbers = onCall((req) => {
    const firstNumber = req.data?.firstNumber;
    const secondNumber = req.data?.secondNumber;

    if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
        throw new HttpsError("invalid-argument", "Invalid Request")
    }

    return {
        firstNumber,
        secondNumber,
        operator: '+',
        operationResult: firstNumber + secondNumber
    }
})

export default addNumbers
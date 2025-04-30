import * as functions from "firebase-functions";
import next from "next";

const nextApp = next({
    dev: false,
    // the __dirname is essential for ensuring Firebase Functions resolves
    // the next config file correctly.
    conf: { distDir: ".next" },
});

const nextjsHandle = nextApp.getRequestHandler();

export const server = functions.https.onRequest(async (req, res) => {
    await nextApp.prepare();
    return nextjsHandle(req, res);
});

/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https"; // Commented out unused import
// import * as logger from "firebase-functions/logger"; // Commented out unused import

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

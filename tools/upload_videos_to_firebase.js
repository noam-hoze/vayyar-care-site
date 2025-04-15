const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// --- Configuration ---
const FIREBASE_BUCKET = "gs://walabothome-app-cloud.appspot.com";
const TARGET_FOLDER = "testimonials"; // Optional: Subfolder in the bucket
// ---------------------

function checkGcloud() {
    try {
        execSync("gcloud --version", { stdio: "ignore" });
        return true;
    } catch (error) {
        console.error(
            "Error: gcloud command could not be found or is not working correctly."
        );
        console.error(
            "Please ensure the Google Cloud SDK is installed and configured in your PATH."
        );
        return false;
    }
}

function uploadFile(filePath, targetBaseUrl) {
    if (!fs.existsSync(filePath)) {
        console.warn(`Warning: File not found at '${filePath}'. Skipping.`);
        return;
    }

    const filename = path.basename(filePath);
    const targetUrl = `${targetBaseUrl}${filename}`;

    console.log(`Uploading '${filename}' to '${targetUrl}'...`);

    try {
        // Use execSync to run the command. Add quotes for paths with spaces.
        // stdio: 'inherit' shows the gcloud command output directly in the console.
        execSync(`gcloud storage cp "${filePath}" "${targetUrl}"`, {
            stdio: "inherit",
        });
        console.log(`Successfully uploaded '${filename}'.`);
    } catch (error) {
        console.error(
            `Error uploading '${filename}'. Please check gcloud output or permissions.`
        );
        // console.error(error); // Uncomment for more detailed error object
        // Optional: Exit on first error
        // process.exit(1);
    }
    console.log("---");
}

function main() {
    if (!checkGcloud()) {
        process.exit(1);
    }

    // Get file paths from command line arguments (excluding 'node' and script path)
    const filePaths = process.argv.slice(2);

    if (filePaths.length === 0) {
        console.log(
            "Usage: pnpm run upload-videos -- <path_to_video1> [path_to_video2] ..."
        );
        console.log(
            "Or:    node tools/upload_videos_to_firebase.js <path_to_video1> [path_to_video2] ..."
        );
        process.exit(1);
    }

    let targetBaseUrl = FIREBASE_BUCKET;
    if (TARGET_FOLDER) {
        // Ensure target folder ends with a slash
        const folder = TARGET_FOLDER.endsWith("/")
            ? TARGET_FOLDER
            : `${TARGET_FOLDER}/`;
        targetBaseUrl = `${targetBaseUrl}/${folder}`;
    }

    console.log(`Target Bucket Path: ${targetBaseUrl}`);

    filePaths.forEach((filePath) => uploadFile(filePath, targetBaseUrl));

    console.log("Upload process finished.");
}

main();

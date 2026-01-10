const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const logFile = 'debug-output.txt';

function log(message) {
    console.log(message);
    try {
        fs.appendFileSync(logFile, message + '\n');
    } catch (e) {
        // ignore fs errors
    }
}

log(`Starting debug script at ${new Date().toISOString()}`);
log(`MONGO_URI present: ${!!process.env.MONGO_URI}`);
if (process.env.MONGO_URI) {
    // Hide credentials but show protocol and host
    const sanitized = process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@');
    log(`MONGO_URI value: ${sanitized}`);
}

if (!process.env.MONGO_URI) {
    log("FATAL: MONGO_URI is missing from .env");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        log("SUCCESS: Connected to MongoDB");
        mongoose.disconnect();
        process.exit(0);
    })
    .catch(err => {
        log(`ERROR: Connection failed.`);
        log(`Message: ${err.message}`);
        log(`Code: ${err.code}`);
        log(`Name: ${err.name}`);
        process.exit(1);
    });

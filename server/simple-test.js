const fs = require('fs');
console.log("Writing file...");
fs.writeFileSync('simple-test.txt', 'Hello node works');
console.log("File written.");


// Node.js program to demonstrate the 
// crypto.randomBytes() method

// Including crypto module
const crypto = require('crypto');

// Calling randomBytes method with callback
crypto.randomBytes(127, (err, buf) => {
  if (err) {
    // Prints error
    console.log(err);
    return;
  }

  // Prints random bytes of generated data
  console.log("The random data is: "
    + buf.toString('hex'));
});
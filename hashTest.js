const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync()
console.log(salt)
const saltCached = '$2a$10$LeIPSFzog02V9OsHMgM/JO'
console.log(bcrypt.hashSync('Hello', saltCached))
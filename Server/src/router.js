const express = require('express');
const router = express.Router();

router.post('/login', require("./routes/loginRoute"));

//export router to other files (make module)
module.exports = router
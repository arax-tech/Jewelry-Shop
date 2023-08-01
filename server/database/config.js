const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => {
    console.log("Connected : " + result.connection.db.namespace);
}).catch((error) => {
    console.log(error);
});
const mongoose = require("mongoose");

function connectAsync() {
    return new Promise((resolve, reject) => {
        const option = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
        mongoose.connect(config.mongodb.connectionString, option, (err, db) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(db);
        });
    });
}

(async () => {
    try {
        await connectAsync();
    }
    catch (err) {
        console.log(err);
    }
})();
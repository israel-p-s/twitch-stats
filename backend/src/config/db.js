const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("* CONECTADO A MONGO DB");

    } catch (err) {
        console.error("* ERROR EN LA CONEXIÓN A MONGO DB: ", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
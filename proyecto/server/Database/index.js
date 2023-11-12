const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://naiko:casa1984@bd-proyectog2.honpcpn.mongodb.net/?retryWrites=true&w=majority"

const db = async () => {
    try{
        const conn = await mongoose.connect(MONGO_URL);
        console.log("BD conectada",conn.connection.host);
    } catch (error){
        console.log(error);
    }
}

module.exports = db;
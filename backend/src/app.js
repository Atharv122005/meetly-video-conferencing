import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

async function startServer() {
    const connectionDb = await mongoose.connect(
        "mongodb+srv://Atharvpatil:sakshiyuvraj5445%40@zoomclonecluster.cr2tj7y.mongodb.net/"
    );
    console.log("MongoDB connected:", connectionDb.connection.host);

    server.listen(app.get("port"), () => {
        console.log("Server started on port", app.get("port"));
    });
}

startServer();
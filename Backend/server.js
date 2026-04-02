import { app } from "./app.js";
import http from "http"
import connectDB from "./database/database.js";
import dotenv from "dotenv"
import cors from "cors"
import { initializeSocket } from "./socket.js";

app.use(cors(
    {
        origin: "*",
        credentials: true
    }
));

const server = http.createServer(app);

initializeSocket(server);

dotenv.config({
    path : './.env'
})

connectDB()
.then(() => {
    server.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running at PORT ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO-DB connection failed !!!", err)
})
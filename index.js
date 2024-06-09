import express, {json} from "express";
import dotenv from "dotenv";
dotenv.config({ path: "Properties.env"});

const port = process.env.PORT;
const server = express();
server.use(express.json());

server.listen(port, () => {
    console.log("Express server listening on port ", port);
});
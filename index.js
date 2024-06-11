import express, {json, query} from "express";
import dotenv from "dotenv";
import {validateUser, validateUsers, addMessage} from "./database.js";
dotenv.config({ path: "Properties.env"});

const port = process.env.PORT;
const server = express();
server.use(express.json());

//Functions
// --------------------------------------------------------------

//Get all messages
server.get('/userMessages', function(req,res) {
    const user = req.query.user;
    console.log(user);

    validateUsers([user]).then((queryResults) => {
        console.log(queryResults[0]);
        if(queryResults[0]) {
            console.log("User exists");

        } else {
            return res.status(200).json({
                error: true,
                message: "User " + user + " does not exist!"
            });
        }
    });
}) 

server.post('/addMessages', function(req, res) {
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const message = req.body.message;

    let users = [user1, user2];

    //Validate if users exist
    validateUsers(users).then((result) => {
        console.log(result);
        if(result == "Success") {
            console.log("Users exists");

            //Add message
            addMessage(user1, user2, message).then((result) => {
                console.log(result);
                if (result) {
                    res.send("Success");
                } else {
                    res.status(500).json({
                        error: true,
                        message: "Error on last insert"
                    });
                }
            })

        } else {
            return res.status(200).json({
                error: true,
                message: "Users do not exist!"
            });
        }
    });
})

server.listen(port, () => {
    console.log("Express server listening on port ", port);
});
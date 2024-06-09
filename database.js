import mysql from "mysql";

//Database pool
const connPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'teste123',
    database: 'chat',
    waitForConnections: true,
    connectionLimit: 3,
    maxIdle: 3,
    queueLimit: 0,
    enableKeepAlive: true
})

//Functions
// -------------------------------------------------------------
//For HealthCheck
export async function ConnectDB() { }

//Get all chats
export async function getChat() { }
//Get chat for user
export async function getChatForUser() { }
//Add message
export async function addMessages() { }
//Remove chats
export async function deleteChat() { }
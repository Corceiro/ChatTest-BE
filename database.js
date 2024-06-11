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

//Validate user
export async function validateUser(user) {
    var sql = 'select 1 from users where user_name = ?;';
    var inserts = [user];
    sql = mysql.format(sql, inserts);

    console.log(sql);

    return new Promise((resolve, reject) =>
        connPool.query(sql, function(err, results, fields) {
            if(err) throw err;
            console.log("Result - ", results);
            resolve(results);
        })
    );
}

//Validate user
export async function validateUsers(user) {
    let sql;
    console.log(user.length);
    if(user.length>1) {
        sql = 'select 1 from users where user_name = ? or user_name = ?;';
        var inserts = [user[0], user[1]];
        sql = mysql.format(sql, inserts);
        console.log("SQL -> " + sql);

        return new Promise((resolve, reject) =>
            connPool.query(sql, function(err, results, fields) {
                if(err) throw err;
                console.log("Results length: " + results.length);
                if(results.length == 2) {
                    resolve("Success");
                } else if(results.length > 2) {
                    resolve("User does not exist");
                }
            })
        );
    } else if (user.length == 1) {
        sql = 'select 1 from users where user_name = ?;';
        var inserts = [user[0]];
        sql = mysql.format(sql, inserts);

        console.log("SQL single -> " + sql);

        return new Promise((resolve, reject) =>
            connPool.query(sql, function(err, results, fields) {
                if(err) throw err;
                console.log("Result - ", results);
                
                resolve(results);
            })
        );
    } else { return "More than 2 users provided"}
}

//Get all chats
export async function getChat() { }
//Get chat for user
export async function getChatForUser(user) { 
    var sql = 'select * from ;';
    var inserts = [bookName, bookEditor, bookAuthor, bookName];
    sql = mysql.format(sql, inserts);

}
//Add message
export async function addMessage(user1, user2, message, timestamp) { 

    //Validate if chat exists
    var sql = 'select chat_id from chat where user1_id = (select user_id from users where user_name = ?) and user2_id = (select user_id from users where user_name = ?);'
    var inserts = [user1, user2];
    sql = mysql.format(sql, inserts);

    console.log(sql);

    connPool.query(sql, function(err, results, fields) {
        console.log("Results - " + results);
        if(err) throw err;
        console.log("CHat results are: " + results)

        //Chat does not exist
        if(results == '') {
            //Create chat
            var sql = 'insert into chat (user1_id, user2_id) values ((select user_id from users where user_name = ?),(select user_id from users where user_name = ?));'
            var inserts = [user1, user2];
            sql = mysql.format(sql, inserts);

            console.log(sql);

            connPool.query(sql, function(err, secondResults, fields) {
                if(err) throw err;
                console.log("results are: " + secondResults);
                if(secondResults) {
                    console.log("Query executed");

                    timestamp = new Date();
                    var lastSQL = 'insert into messages (chat_id, message, timestamp, user) values ((select chat_id from chat where user1_id = (select user_id from users where user_name = ?) and user2_id = (select user_id from users where user_name = ?)),?, ?, (select user_id from users where user_name = ?))'
                    var lastInserts = [user1, user2, message, timestamp, user1];
                    lastSQL = mysql.format(lastSQL, lastInserts);
                
                    console.log(sql);
                
                    return new Promise((resolve, reject) =>
                        connPool.query(lastSQL, function(err, results, fields) {
                            if(err) throw err;
                            console.log("Result - ", results);
                            
                            resolve(results);
                        })
                    );
                }
            });
        }
    })   
}
//Remove chats
export async function deleteChat() { }
var mysql = require("mysql");

var connPool = mysql.createPool({
    connectionLimit: 5,
    host: "127.0.0.1",
    user: "C4131F22U84",
    database: "C4131F22U84",
    password: "fds-98jkl!"
});


function addNewNote(note, done) 
{
    console.log("\nAdd New Note");
    return new Promise((resolve, reject) =>
    {
        const sql = "     insert into todo (note, done) values (?, ?)";
        connPool.query(sql, [note, done], (error, rows) =>
        {
            if (error) 
            {
                reject(error);
            } 
            else 
            {
                resolve(rows);
            }
        })
    })
}
exports.addNewNote=addNewNote;


function getNotes(filter)
{
    console.log("\nGet Notes");
    return new Promise((resolve, reject) =>
    {
        let sql = "";
        console.log("     Filter: ", filter);      
        if (filter == "done")
        {
          sql = "     select note, done from todo where done = true";
          console.log(sql);
        }
        else if (filter == "not-done")
        {
            sql = "     select note, done from todo where done = false";
            console.log(sql);
        }
        else 
        {
            sql = "     select note, done from todo";
            console.log(sql);
        }

        connPool.query(sql, (err, rows) =>
        {
            if (err) 
            {
                reject(err);
            } 
            else 
            {
                resolve(rows);
            }
        })
    })
}
exports.getNotes=getNotes;


function deleteNote(note, status)
{
    console.log("\nDelete Note");
    return new Promise((resolve, reject) =>
    {
        let sql = `     delete from todo where note = "${note}" and done = ${status}`;
        console.log(sql);

        connPool.query(sql, (err, rows) =>
        {
            if (err) 
            {
                reject(err);
            } 
            else 
            {
                resolve(rows);
            }
        })
    })
}
exports.deleteNote=deleteNote;


function updateStatus(note, status)
{
    console.log("\nUpdate Status");
    return new Promise((resolve, reject) =>
    {
        let sql = `     update todo set done = ${status} where note = "${note}"`;
        console.log(sql);

        connPool.query(sql, (err, rows) =>
        {
            if (err) 
            {
                reject(err);
            } 
            else 
            {
                resolve(rows);
            }
        })
    })
}
exports.updateStatus=updateStatus;
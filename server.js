const express = require("express");
const session = require('express-session');

var db = require("./db")

const app = express();
const PORT = 3006

app.use(express.static("resources"));
app.use(express.json());

// Session Logic
app.use(express.urlencoded({extended:true})); 
app.use(session({secret:"oauhsdlmfnaliustrewsialjbkwegf"}))

app.set("views", "templates");
app.set("view engine", "pug");


// GET Requests
app.get("/", function(req, res)
{
    res.redirect("/create")
});


app.get("/create", async function(req, res)
{
    console.log("\nGET /create");
    
    const filter = req.query.filter;
    console.log("     Filter: ", filter);
    
    const notes = await db.getNotes(filter);
    console.log(notes);

    res.render("create.pug", {notes: notes});
});


app.get("/api/notes", async function(req, res)
{
    console.log("\nGET /api/notes");
    const notes = await db.getNotes();

    res.render("create.pug", {notes: notes});
})


// POST Requests
app.post("/api/notes", async function(req, res) 
{
    console.log("\nPOST /api/notes");

    const newNote = req.body.newNote;
    await db.addNewNote(newNote, false);
    
    const notes = await db.getNotes();

    res.json(notes);
});


app.post("/api/delete_note", async function(req, res) 
{
    console.log("\nPOST /api/delete_note");

    const note = req.body.note;
    const status = req.body.status;
    await db.deleteNote(note, status);
    
    const notes = await db.getNotes();

    res.render("create.pug", {notes: notes});
});


app.post("/api/update_note", async function(req, res) 
{
    console.log("\nPOST /api/update_note");

    const note = req.body.note;
    const status = req.body.status;
    const response = await db.updateStatus(note, status);

    const notes = await db.getNotes();

    res.render("create.pug", {notes: notes});
});


// Start the web server
app.listen(PORT, function() 
{
    console.log(`Listening on http://localhost:${PORT}`);
});
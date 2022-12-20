document.addEventListener("click", async (event) => {
    const addNote = document.querySelector(".note");
    let targetElement = event.target; // Clicked element  

    do {
        if (targetElement == addNote) {
            // This is a click inside, does nothing, just return
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside, make a POST request to send this note 
    const newNote = {newNote: addNote.innerText};
    addNote.childNodes[0].innerText = "";

    if (!onlySpaces(newNote["newNote"]))
    {
        await fetch('/api/notes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newNote),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});

function onlySpaces(str) {
    return str.trim().length === 0;
}


let trash_btn = document.querySelectorAll(".gg-trash.trash");
for (let i = 0; i < trash_btn.length; i++)
{
    trash_btn[i].addEventListener("click", trashAction);
}
function trashAction(event)
{
    let trashNote = event.target.parentNode.parentNode;
    trashNote = trashNote.childNodes[0].childNodes[0].innerText;
    console.log(trashNote);

    let status = "";
    let status_btn = event.target.parentNode.childNodes[0];
    if (status_btn.style.background == "rgb(146, 220, 229)")
    {
        status = "true";
    }
    else 
    {
        status = "false";
    }

    const deleteJSON = {note: trashNote, status: status};
    deleteNote(deleteJSON);
}


let status_btn = document.querySelectorAll(".status");
for (let i = 0; i < status_btn.length; i++)
{
    status_btn[i].addEventListener("click", statusAction);
}
function statusAction(event)
{
    console.log(event.target.style.background);

    const note = event.target.parentNode.parentNode.childNodes[0].childNodes[0].innerText;
    if (event.target.style.background != "rgb(146, 220, 229)")
    {
        event.target.style.background = "rgb(146, 220, 229)";
        let data = {note: note, status: true};
        updateStatus(data);
    }
    else 
    {
        event.target.style.background = "none";
        let data = {note: note, status: false};
        updateStatus(data);
    }
}


let status_btn2 = document.querySelectorAll(".status-2");
for (let i = 0; i < status_btn2.length; i++)
{
    status_btn2[i].addEventListener("click", statusAction2);
}
function statusAction2(event)
{
    console.log(event.target.style.background);

    const note = event.target.parentNode.parentNode.childNodes[0].childNodes[0].innerText;
    if (event.target.style.background != "rgb(146, 220, 229)")
    {
        event.target.style.background = "rgb(146, 220, 229)";
        let data = {note: note, status: true};
        updateStatus(data);
    }
    else 
    {
        event.target.style.background = "none";
        let data = {note: note, status: false};
        updateStatus(data);
    }
}


async function updateStatus(data)
{
    const response = await fetch('/api/update_note', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


async function deleteNote(data)
{
    const response = await fetch('/api/delete_note', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
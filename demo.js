console.log("Welcome to notes app. This is app.js");
showNotes();

//if user adds a note, add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    let today = new Date();
    let addTime = document.getElementById("addTime");
    // let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    // let time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    let time = today.toLocaleString("en");
    // let dtime = date+' '+time;
    let dtime = time;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        text: addTxt.value,
        time: dtime
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
});

//Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text"> ${element.text}</p>
            <button  id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            <span id="addTime"> ${element.time}</span>
        </div>
    </div>`;
    });
    let notesElm = document.getElementById('notes');
    // console.log("notesElm",notesElm);
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<marquee>Nothing to show! Use" Add a Note" section above to add notes.</marquee>`;
    }
}
//Function to delete a note
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
       let cardTxt = element.getElementsByTagName("p")[0].innerText;
       if(cardTxt.includes(inputVal)){
        element.style.display = "block";
       }
       else{
        element.style.display = "none";
       }
    });
});
/*
Futher Features
1. Add title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server
*/
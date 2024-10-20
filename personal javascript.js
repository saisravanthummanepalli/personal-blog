// JavaScript function to switch tabs
function openTab(evt, tabName) {
    var i, tabcontent, tabbuttons;
    
    // Get all elements with class="tab-content" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Get all elements with class="tab-button" and remove the class "active"
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }
    
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Function to add a new note to the list
function addNote() {
    var input = document.getElementById('noteInput');
    var noteText = input.value.trim();

    // Check if the input is not empty
    if (noteText !== '') {
        // Add the note to the list and save it
        appendNoteToList(noteText);
        saveNoteToStorage(noteText);
        
        // Clear the input field
        input.value = '';
    }
}

// Function to append a note to the list in the DOM
function appendNoteToList(noteText) {
    var notesList = document.getElementById('notesList');
    var newNote = document.createElement('li');
    newNote.className = 'note-item'; // Add a class for styling if needed

    // Add note text within a span for better control
    var textSpan = document.createElement('span');
    textSpan.textContent = noteText;
    textSpan.className = 'note-text';
    newNote.appendChild(textSpan);

    // Add delete button with a Unicode character
    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = '\u00D7'; // Unicode character for multiplication sign (×)
    deleteBtn.className = 'delete-note';
    deleteBtn.title = 'Delete note'; // Tooltip for extra clarity
    deleteBtn.onclick = function() {
        deleteNote(noteText, newNote);
    };
    newNote.appendChild(deleteBtn);

    notesList.appendChild(newNote);
}



// Function to save a note to local storage
function saveNoteToStorage(noteText) {
    // Get the current notes from storage, or initialize an empty array if none exist
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes from local storage
function loadNotesFromStorage() {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(function(noteText) {
        appendNoteToList(noteText);
    });
}

// Function to delete a note
function deleteNote(noteText, noteElement) {
    // Remove the note from the DOM
    noteElement.remove();

    // Remove the note from local storage
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    var noteIndex = notes.indexOf(noteText);
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

// Event listener for the note form submission
document.getElementById('noteForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    addNote();
});

document.addEventListener('DOMContentLoaded', function() {
    // Initially set the About Me tab to be active
    document.getElementById('About').style.display = 'block';
    document.getElementById('Certifications').style.display = 'none';
    document.getElementById('Notes').style.display = 'none';
    
    // Load notes from local storage
    loadNotesFromStorage();
});
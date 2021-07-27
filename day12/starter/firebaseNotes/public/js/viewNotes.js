window.onload = () => {
    // When page loads, check user logged in state
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // If logged in, get user's notes from db
            //      Display notes on page
            const googleUserId = user.uid;
            getNotes(googleUserId);
        } else {
            // If not logged in redirect to log in page
            window.location = 'index.html';
        }
    });
};

// Get user's notes from db, display notes on page
const getNotes = (userId) => {
    console.log(userId);
    // Get user's notes from db
    const userRef = firebase.database().ref(`users/${userId}`);
    userRef.on('value', snapshot => {
        writeNotesToHtml(snapshot.val());
    });
};

const writeNotesToHtml = (data) => {
    const noteRenderArea = document.querySelector('#app');
    for (let noteKey in data) {
        // Create html string for one note
        let noteHtml = createHtmlForNote(data[noteKey]);
        // append new HTML to the rendering area's existing HTML
        noteRenderArea.innerHTML += noteHtml;
    }
};

// Returns a string of HTML for one note
const createHtmlForNote = (note) => {
    // TODO: create the html and put in the note data
    return `<div class="column is-one-third">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            ${note.title}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            ${note.text}
                        </div>
                    </div>
                </div>
            </div>`;
};
var focused = false, todoFocused = false;
var mode = "normal";

const journal = document.getElementById('journal-entry-textarea');
const promptArea = document.getElementById('prompt');

function setTime(timeElement) {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    timeElement[0].innerHTML = hours;
    timeElement[1].innerHTML = minutes;
}

function handleKeyPress(event) {
    if (focused) return;
    if (event.code == 'KeyJ') focusJournal();
    else if (event.code == 'Semicolon') switchCommandMode();
    else if (event.code == 'KeyT') focusTodo();
    else if (event.code == 'Escape') switchCommandMode();
}

function unfocusJournal() {
    journal.removeEventListener('keypress');
    journal.disabled = true;
    document.body.focus();
    focused = false;
}

function focusJournal() {
    journal.disabled = false;
    journal.focus();
    promptArea.value = "INSERT";
    focused = true;
}

function focusTodo() {
    focused = true;
    todoFocused = true;
}

function promptEventHandler(event) {
    if (event.code == "Escape" && focused) {
        document.body.focus();
        focused = false;
        mode = "normal";
        promptArea.value = "NORMAL";
    }
}

function switchCommandMode() {
    if (mode == "normal") {
        mode = "command";
        promptArea.disabled = false;
        promptArea.value = ":";
        promptArea.focus();
        focused = true;
        todoFocused = false;
    } else {
        mode = "normal";
        promptArea.disabled = true;
        promptArea.value = "NORMAL";
        focused = false;
    }
}

const timeElement = [ document.getElementById('hours'), document.getElementById('minutes') ];
if (timeElement.length > 0) setInterval(() => { setTime(timeElement); }, 1000);
document.addEventListener('keypress', handleKeyPress);
promptArea.addEventListener('keypress', promptEventHandler);

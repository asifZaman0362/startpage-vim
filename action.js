const MODE_NORMAL = 0;
const MODE_INSERT = 1;
const MODE_COMMAND = 2;

let focused = false;
let vimData = {
    mode: normal,
    focus: null,
    buffer: null
};

function handleKey(event) {
    if (event.code == 'Escape') {
        if (vimData.mode == MODE_INSERT) {
            vimData.mode = MODE_NORMAL;
            // perform other necessary tasks to transition to normal mode
        }
    } else if (event.code == ':') {
        if (vimData.mode == MODE_NORMAL) {
            vimData.mode = MODE_COMMAND;
            prompt_area.disabled = false;
            prompt_area.focus();
            prompt_area.value = ":";
        }
    } else if (event.code == 'Enter') {
        if (vimData.mode == MODE_COMMAND) {
            const cmd = prompt_area.value;
            try {
                executeCommand(cmd);
            } catch (error) {
                console.log('invalid command!');
            }
            prompt_area.value = 'NORMAL';
            prompt_area.disabled = true;
        }
    }
}
function focusJournal() {
    document.querySelector('#journalarea').disabled = false;
    document.querySelector.addEventListener('keypress');
}
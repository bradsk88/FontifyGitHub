// Saves options to chrome.storage.sync.
function save_options() {
    var status = document.getElementById('status');
    status.textContent = 'Saving';
    var githubPAT = document.getElementById('github-pat').value;
    var data = {};
    data['githubPAT'] = githubPAT;
    chrome.storage.sync.set(data, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
            return;
        }
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'In sync set';
        status.textContent = 'Options saved locally.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
    status.textContent = 'not blocked';
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        githubPAT: ''
    }, function(items) {
        document.getElementById('github-pat').value = items.githubPAT;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
var plusBtn = document.querySelector('#save');
plusBtn.addEventListener('click', save_options);
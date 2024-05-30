// Načítání stavu skriptu z úložiště
chrome.storage.sync.get('scriptEnabled', function(data) {
    var scriptEnabled = data.scriptEnabled || false;

    // Pokud je skript povolený, přidat listener pro zavírání okna
    if (scriptEnabled) {
        chrome.windows.onCreated.addListener(closeWindow);
    }
});

// Obsluha zprávy z popup skriptu pro vypnutí/zapnutí skriptu
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.toggleScript !== undefined) {
        var scriptEnabled = message.toggleScript;
        if (scriptEnabled) {
            // Pokud je skript povolený, přidat listener pro zavírání okna
            chrome.windows.onCreated.addListener(closeWindow);
        } else {
            // Pokud je skript vypnutý, odstranit listener pro zavírání okna
            chrome.windows.onCreated.removeListener(closeWindow);
        }
    }
});

// Funkce pro zavírání okna
function closeWindow(window) {
    chrome.windows.remove(window.id);
    console.log("Okno zavřeno");
}

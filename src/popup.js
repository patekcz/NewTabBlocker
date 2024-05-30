document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleScript');

    // Získání stavu rozšíření ze storu
    chrome.storage.sync.get('scriptEnabled', function(data) {
        var scriptEnabled = data.scriptEnabled || false;

        // Nastavení textu tlačítka podle stavu skriptu
        toggleButton.innerText = scriptEnabled ? 'Disable Script' : 'Enable Script';

        // Po kliknutí na tlačítko změnit stav skriptu a aktualizovat tlačítko
        toggleButton.addEventListener('click', function() {
            scriptEnabled = !scriptEnabled;
            chrome.storage.sync.set({ scriptEnabled: scriptEnabled }, function() {
                toggleButton.innerText = scriptEnabled ? 'Disable Script' : 'Enable Script';
            });
            // Odešle zprávu do background skriptu pro vypnutí/zapnutí skriptu na zavírání oken
            chrome.runtime.sendMessage({ toggleScript: scriptEnabled });
        });
    });
});

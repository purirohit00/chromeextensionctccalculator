console.log("background.js");
var ctcValue = '0';
chrome.extension.onMessage.addListener(
    function(message, sender, sendResponse) {
        ctcValue = message.action;
        chrome.tabs.executeScript(null, { // defaults to the current tab
            file: "cs.js",
            allFrames: true // This injects script into iframes in the page and doesn't work before 4.0.266.0.
        }, function(tab) {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: ctcValue },
                    function(response) { /* Ignore any response. */ });
            });
        });
    });
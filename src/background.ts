console.log("background script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    if (request.type === "download") {
        chrome.downloads
            .download({
                url: request.url,
            })
            .then(() => {
                sendResponse("success");
            })
            .catch(() => {
                sendResponse("failure");
            });
    }
});

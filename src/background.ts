console.log("background script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    if (request.type === "download") {
        chrome.downloads
            .download({
                url: request.url,
                filename: `civitai/${request.folder}/${new Date().getTime()}.${
                    request.fileType
                }`,
            })
            .then(() => {
                sendResponse("success");
            })
            .catch(() => {
                sendResponse("failure");
            });
    }
});

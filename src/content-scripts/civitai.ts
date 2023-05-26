async function clickListener(event: MouseEvent) {
    function extractRawPostUrl(path: EventTarget[]) {
        for (let idx = 0; idx < path.length; idx++) {
            const element = path[idx] as HTMLElement;
            if (
                (element.tagName == "DIV" &&
                    element.classList.contains("mantine-mefm9g")) ||
                (element.tagName == "DIV" &&
                    element.classList.contains("mantine-Paper-root") &&
                    element.classList.contains("mantine-Card-root"))
            ) {
                console.log(element.children);
                for (let idx2 = 0; idx2 < element.children.length; idx2++) {
                    const childElem = element.children[idx2];
                    if (childElem.tagName == "A") {
                        return childElem.getAttribute("href");
                    }
                }
            }
        }
    }

    async function getImageUrlFromRawPostUrl(rawPostUrl: string) {
        const postUrl = `${rawPostUrl.split("?")[0]}`;
        const htmlString = await fetch(postUrl).then((res) => res.text());
        const doc = new DOMParser().parseFromString(htmlString, "text/html");
        const ogImage = doc.querySelector("meta[property='og:image']");
        const ogImageUrl = ogImage?.getAttribute("content");

        return ogImageUrl;
    }

    async function initiateDownload(imageUrl: string, folder: string) {
        const fileType = imageUrl.split(".").pop();
        const message = {
            type: "download",
            url: imageUrl,
            folder,
            fileType,
        };
        chrome.runtime.sendMessage(message);
    }

    const path = event.composedPath();
    for (let idx = 0; idx < path.length; idx++) {
        const element = path[idx] as HTMLElement;
        if (
            element.tagName === "BUTTON" &&
            element.classList.contains("mantine-UnstyledButton-root") &&
            element.classList.contains("mantine-Button-root") &&
            element.classList.contains("mantine-5ko2nj") // not selected class
        ) {
            // console.log(element.textContent);
            const rawPostUrl = extractRawPostUrl(path);
            if (rawPostUrl) {
                const imageUrl = await getImageUrlFromRawPostUrl(rawPostUrl);
                if (imageUrl) {
                    if (element.textContent?.includes("👍")) {
                        await initiateDownload(imageUrl, "horn");
                    } else if (element.textContent?.includes("❤️")) {
                        await initiateDownload(imageUrl, "like");
                    } else if (element.textContent?.includes("😂")) {
                        await initiateDownload(imageUrl, "love");
                    }
                }
            }
            break;
        }
    }
}
document.body.addEventListener("click", clickListener, { capture: true });

export {};

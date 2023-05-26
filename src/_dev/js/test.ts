console.log("HERE WE GO AGAIN.");

function recreateNode(el: HTMLElement, withChildren?: boolean) {
    if (el.parentNode) {
        if (withChildren) {
            el.parentNode?.replaceChild(el.cloneNode(true), el);
        } else if (el.firstChild) {
            var newEl = el.cloneNode(false);
            while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
            el.parentNode.replaceChild(newEl, el);
        }
    }
}
window.recreateNode = recreateNode;
recreateNode(document.body); // Clean up old event listeners

async function clickListener(event: MouseEvent) {
    function extractRawPostUrl(path: EventTarget[]) {
        console.log(path);
        for (let idx = 0; idx < path.length; idx++) {
            const element = path[idx] as HTMLElement;
            if (
                element.tagName == "DIV" &&
                element.classList.contains("mantine-mefm9g")
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

    async function initiateDownload(imageUrl: string) {
        console.log(imageUrl);
    }

    const path = event.composedPath();
    for (let idx = 0; idx < path.length; idx++) {
        const element = path[idx] as HTMLElement;
        if (
            element.tagName === "BUTTON" &&
            element.classList.contains("mantine-UnstyledButton-root")
        ) {
            const rawPostUrl = extractRawPostUrl(path.slice(idx + 1));
            console.log(rawPostUrl);
            if (rawPostUrl) {
                const imageUrl = await getImageUrlFromRawPostUrl(rawPostUrl);
                if (imageUrl) {
                    await initiateDownload(imageUrl);
                }
            }
            break;
        }
    }
}
document.body.addEventListener("click", clickListener, { capture: true });

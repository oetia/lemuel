var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
console.log("HERE WE GO AGAIN.");
function recreateNode(el, withChildren) {
    var _a;
    if (el.parentNode) {
        if (withChildren) {
            (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(el.cloneNode(true), el);
        }
        else if (el.firstChild) {
            var newEl = el.cloneNode(false);
            while (el.hasChildNodes())
                newEl.appendChild(el.firstChild);
            el.parentNode.replaceChild(newEl, el);
        }
    }
}
window.recreateNode = recreateNode;
recreateNode(document.body); // Clean up old event listeners
function clickListener(event) {
    return __awaiter(this, void 0, void 0, function () {
        function extractRawPostUrl(path) {
            console.log(path);
            for (var idx = 0; idx < path.length; idx++) {
                var element = path[idx];
                if (element.tagName == "DIV" &&
                    element.classList.contains("mantine-mefm9g")) {
                    console.log(element.children);
                    for (var idx2 = 0; idx2 < element.children.length; idx2++) {
                        var childElem = element.children[idx2];
                        if (childElem.tagName == "A") {
                            return childElem.getAttribute("href");
                        }
                    }
                }
            }
        }
        function getImageUrlFromRawPostUrl(rawPostUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var postUrl, htmlString, doc, ogImage, ogImageUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            postUrl = "".concat(rawPostUrl.split("?")[0]);
                            return [4 /*yield*/, fetch(postUrl).then(function (res) { return res.text(); })];
                        case 1:
                            htmlString = _a.sent();
                            doc = new DOMParser().parseFromString(htmlString, "text/html");
                            ogImage = doc.querySelector("meta[property='og:image']");
                            ogImageUrl = ogImage === null || ogImage === void 0 ? void 0 : ogImage.getAttribute("content");
                            return [2 /*return*/, ogImageUrl];
                    }
                });
            });
        }
        function initiateDownload(imageUrl) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log(imageUrl);
                    return [2 /*return*/];
                });
            });
        }
        var path, idx, element, rawPostUrl, imageUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = event.composedPath();
                    idx = 0;
                    _a.label = 1;
                case 1:
                    if (!(idx < path.length)) return [3 /*break*/, 6];
                    element = path[idx];
                    if (!(element.tagName === "BUTTON" &&
                        element.classList.contains("mantine-UnstyledButton-root"))) return [3 /*break*/, 5];
                    rawPostUrl = extractRawPostUrl(path.slice(idx + 1));
                    console.log(rawPostUrl);
                    if (!rawPostUrl) return [3 /*break*/, 4];
                    return [4 /*yield*/, getImageUrlFromRawPostUrl(rawPostUrl)];
                case 2:
                    imageUrl = _a.sent();
                    if (!imageUrl) return [3 /*break*/, 4];
                    return [4 /*yield*/, initiateDownload(imageUrl)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    idx++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
document.body.addEventListener("click", clickListener, { capture: true });

const DESKTOP_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.2210.91";
const MOBILE_USER_AGENT = "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.43 Mobile Safari/537.36";

browser.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        if (!details.requestHeaders) {
            return;
        }

        for (let i = 0; i < details.requestHeaders.length; i++) {
            if (details.requestHeaders[i].name.toLowerCase() === "user-agent") { // headers are case-insensitive
                if (details.requestHeaders[i].value.toLowerCase().includes("mobile")) {
                    details.requestHeaders[i].value = MOBILE_USER_AGENT;
                }
                else {
                    details.requestHeaders[i].value = DESKTOP_USER_AGENT;
                }
                break;
            }
        }

        return { requestHeaders: details.requestHeaders };
    },
    { urls: ["*://*.bing.com/*", "*://*.microsoft.com/*"] }, // added microsoft.com URLs
    ["blocking", "requestHeaders"]
);

browser.browserAction.onClicked.addListener(() => {
    browser.sidebarAction.toggle();
});

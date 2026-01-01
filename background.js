    let activeTab = null;
    let startTime = null;

    const productiveSites = [
    "github.com",
    "leetcode.com",
    "geeksforgeeks.org",
    "stackoverflow.com",
    "w3schools.com",
    "codeforces.com"
];
function isProductive(site) {
    return productiveSites.some(domain => site.includes(domain));
}


    chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    trackTime(tab.url);
    });

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        trackTime(tab.url);
    }
    });

    function trackTime(url) {
        if (!url || url.startsWith("chrome://")) return;

    const now = Date.now();

    if (activeTab && startTime) {
        const timeSpent = now - startTime;

        chrome.storage.local.get(["timeData"], (data) => {
        const timeData = data.timeData || {};
        const category = isProductive(activeTab)
    ? "productive"
    : "unproductive";

    if (!timeData[activeTab]) {
    timeData[activeTab] = {
        time: 0,
        category: category
    };
    }

timeData[activeTab].time += timeSpent;

        chrome.storage.local.set({ timeData });
        });
    }

    activeTab = getDomain(url);
    startTime = now;
    }

    function getDomain(url) {
    try {
        return new URL(url).hostname;
    } catch {
        return "unknown";
    }
    }

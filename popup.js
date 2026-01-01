    chrome.storage.local.get(["timeData"], (data) => {
    const stats = document.getElementById("stats");
    const timeData = data.timeData || {};

    stats.innerHTML = "";

    for (let site in timeData) {
        const entry = timeData[site];

        if (!entry || !entry.time) continue;

        const minutes = Math.round(entry.time / 60000);
        const category = entry.category || "unknown";

        stats.innerHTML += `
        <p>
            <strong>${site}</strong><br>
            ${minutes} min (${category})
        </p>
        `;
    }
    });

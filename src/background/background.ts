chrome.runtime.onInstalled.addListener(() => {
  console.log("Productivity Tracker Installed");
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  console.log("Active Tab:", {
    title: tab.title,
    url: tab.url,
  });
});

chrome.idle.onStateChanged.addListener((state) => {
  console.log("Idle State:", state);
});

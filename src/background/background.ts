import { classifyYouTubeVideo } from "../utils/classifier";

chrome.runtime.onInstalled.addListener(() => {
  console.log("Productivity Tracker Installed");
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);

    if (!tab.url || !tab.title) return;

    console.log("Current Tab:", tab.title);

    if (tab.url.includes("youtube.com/watch")) {
      const classification = classifyYouTubeVideo(tab.title);

      console.log("YouTube Video Classification:");

      console.log({
        title: tab.title,
        classification,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

chrome.idle.onStateChanged.addListener((state) => {
  console.log("Idle State:", state);
});
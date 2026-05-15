import { classifyYouTubeVideo } from "../utils/classifier";

let startTime: number | null = null;

let currentClassification:
  | "productive"
  | "distracting"
  | "neutral"
  | null = null;

const stats = {
  productive: 0,
  distracting: 0,
  neutral: 0,
};

function startTracking(
  classification: "productive" | "distracting" | "neutral"
) {
  startTime = Date.now();

  currentClassification = classification;

  console.log("Tracking Started:", classification);
}

function stopTracking() {
  if (!startTime || !currentClassification) return;

  const endTime = Date.now();

  const duration = Math.floor(
    (endTime - startTime) / 1000
  );

  stats[currentClassification] += duration;

  console.log("Tracking Stopped");

  console.log({
    classification: currentClassification,
    duration,
    stats,
  });

  startTime = null;

  currentClassification = null;
}

async function handleTracking(tabId: number) {
  try {
    // stop previous tracking first
    stopTracking();

    const tab = await chrome.tabs.get(tabId);

    if (!tab.url || !tab.title) return;

    // ignore browser internal pages
    if (
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("edge://")
    ) {
      return;
    }

    let classification:
      | "productive"
      | "distracting"
      | "neutral" = "neutral";

    // YouTube Classification
    if (tab.url.includes("youtube.com/watch")) {
      classification = classifyYouTubeVideo(tab.title);
    }

    console.log({
      title: tab.title,
      classification,
    });

    startTracking(classification);
  } catch (error) {
    console.error(error);
  }
}

// when user switches tabs
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  handleTracking(activeInfo.tabId);
});

// when user becomes idle
chrome.idle.onStateChanged.addListener((state) => {
  console.log("Idle State:", state);

  if (state !== "active") {
    stopTracking();
  }
});

// extension installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("Productivity Tracker Installed");
});
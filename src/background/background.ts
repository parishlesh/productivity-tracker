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

let trackingTimeout: ReturnType<
  typeof setTimeout
> | null = null;

// unique activity identity
let currentActivityKey: string | null = null;

function startTracking(
  classification: "productive" | "distracting" | "neutral"
) {
  startTime = Date.now();

  currentClassification = classification;

  console.log(
    "Tracking Started:",
    classification
  );
}

function stopTracking() {
  if (!startTime || !currentClassification)
    return;

  const endTime = Date.now();

  const duration = Math.floor(
    (endTime - startTime) / 1000
  );

  // ignore noisy tiny updates
  if (duration <= 1) {
    startTime = null;

    currentClassification = null;

    currentActivityKey = null;

    return;
  }

  stats[currentClassification] += duration;

  console.log("Tracking Stopped");

  console.log({
    classification: currentClassification,
    duration,
    stats,
  });

  startTime = null;

  currentClassification = null;

  currentActivityKey = null;
}

async function handleTracking(tabId: number) {
  try {
    const tab = await chrome.tabs.get(tabId);

    if (!tab.url || !tab.title) return;

    // ignore browser internal pages
    if (
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("edge://")
    ) {
      return;
    }

    // unique activity identity
    const activityKey = `${tabId}-${tab.url}-${tab.title}`;

    // prevent duplicate activity tracking
    if (currentActivityKey === activityKey) {
      return;
    }

    // stop previous activity first
    stopTracking();

    // save current activity
    currentActivityKey = activityKey;

    let classification:
      | "productive"
      | "distracting"
      | "neutral" = "neutral";

    // YouTube Classification
    if (
      tab.url.includes("youtube.com/watch")
    ) {
      classification =
        classifyYouTubeVideo(tab.title);
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

function debouncedHandleTracking(
  tabId: number
) {
  if (trackingTimeout) {
    clearTimeout(trackingTimeout);
  }

  trackingTimeout = setTimeout(() => {
    handleTracking(tabId);
  }, 1000);
}

// when user switches tabs
chrome.tabs.onActivated.addListener(
  async (activeInfo) => {
    debouncedHandleTracking(
      activeInfo.tabId
    );
  }
);

// detect updates inside same tab
chrome.tabs.onUpdated.addListener(
  async (tabId, changeInfo, tab) => {
    // react only when title/url changes
    if (
      changeInfo.title ||
      changeInfo.url
    ) {
      // only if active tab
      if (tab.active) {
        debouncedHandleTracking(tabId);
      }
    }
  }
);

// idle detection
chrome.idle.onStateChanged.addListener(
  (state) => {
    console.log("Idle State:", state);

    if (state !== "active") {
      stopTracking();
    }
  }
);

// extension installed
chrome.runtime.onInstalled.addListener(
  () => {
    console.log(
      "Productivity Tracker Installed"
    );
  }
);
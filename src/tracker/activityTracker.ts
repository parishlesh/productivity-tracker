import { classifyYouTubeVideo } from "../utils/classifier";

type ActivityType =
    | "productive"
    | "distracting"
    | "neutral";

const activityStats = {
    productive: 0,
    distracting: 0,
    neutral: 0,
};

export async function trackActivity() {
    try {
        // Detect idle state
        const idleState = await chrome.idle.queryState(30);

        // Ignore if user inactive for 30 seconds
        if (idleState !== "active") {
            console.log("User is idle:", idleState);
            return;
        }

        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });

        if (!tab?.url || !tab?.title) return;

        // Ignore browser internal pages
        if (
            tab.url.startsWith("chrome://") ||
            tab.url.startsWith("edge://")
        ) {
            return;
        }

        let classification: ActivityType = "neutral";

        // YouTube Classification
        if (tab.url.includes("youtube.com/watch")) {
            classification = classifyYouTubeVideo(tab.title);
        }

        activityStats[classification] += 5;

        console.log("Tracked Activity:");

        console.log({
            title: tab.title,
            classification,
            stats: activityStats,
        });
    } catch (error) {
        console.error(error);
    }
}
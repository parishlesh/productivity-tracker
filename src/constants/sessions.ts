import {
    SessionConfig,
    SessionType,
} from "../types/session";

export const sessionPresets: Record<
    SessionType,
    SessionConfig
> = {
    coding: {
        type: "coding",

        label: "Coding",

        productiveDomains: [
            "github.com",
            "chatgpt.com",
            "stackoverflow.com",
            "developer.mozilla.org",
            "leetcode.com",
        ],

        distractingDomains: [
            "instagram.com",
            "facebook.com",
            "netflix.com",
            "tiktok.com",
        ],

        productiveKeywords: [
            "coding",
            "programming",
            "react",
            "javascript",
            "typescript",
            "algorithm",
        ],

        distractingKeywords: [
            "prank",
            "meme",
            "shorts",
        ],
    },

    research: {
        type: "research",

        label: "Research",

        productiveDomains: [
            "scholar.google.com",
            "wikipedia.org",
            "chatgpt.com",
        ],

        distractingDomains: [
            "instagram.com",
            "netflix.com",
        ],

        productiveKeywords: [
            "research",
            "study",
            "analysis",
            "science",
        ],

        distractingKeywords: [
            "reaction",
            "vlog",
        ],
    },

    learning: {
        type: "learning",

        label: "Learning",

        productiveDomains: [
            "youtube.com",
            "coursera.org",
            "udemy.com",
            "chatgpt.com",
        ],

        distractingDomains: [
            "instagram.com",
            "facebook.com",
        ],

        productiveKeywords: [
            "tutorial",
            "course",
            "learn",
            "education",
        ],

        distractingKeywords: [
            "prank",
            "drama",
        ],
    },

    sketching: {
        type: "sketching",

        label: "Sketching",

        productiveDomains: [
            "pinterest.com",
            "behance.net",
            "youtube.com",
        ],

        distractingDomains: [
            "twitter.com",
            "x.com",
        ],

        productiveKeywords: [
            "drawing",
            "anatomy",
            "art",
            "sketch",
        ],

        distractingKeywords: [
            "celebrity",
            "gossip",
        ],
    },

    writing: {
        type: "writing",

        label: "Writing",

        productiveDomains: [
            "notion.so",
            "medium.com",
            "chatgpt.com",
        ],

        distractingDomains: [
            "instagram.com",
            "youtube.com",
        ],

        productiveKeywords: [
            "writing",
            "essay",
            "blog",
            "article",
        ],

        distractingKeywords: [
            "meme",
            "reaction",
        ],
    },

    "deep-work": {
        type: "deep-work",

        label: "Deep Work",

        productiveDomains: [],

        distractingDomains: [
            "youtube.com",
            "instagram.com",
            "twitter.com",
            "reddit.com",
        ],

        productiveKeywords: [],

        distractingKeywords: [
            "shorts",
            "funny",
            "gaming",
        ],
    },

    custom: {
        type: "custom",

        label: "Custom",

        productiveDomains: [],

        distractingDomains: [],

        productiveKeywords: [],

        distractingKeywords: [],
    },
};
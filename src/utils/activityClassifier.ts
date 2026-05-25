import { classifyDomain } from "./domainClassifier";

import { classifyYouTubeVideo } from "./classifier";

import {
    SessionConfig,
} from "../types/session";

type Classification =
    | "productive"
    | "distracting"
    | "neutral";

export function classifyActivity({
    url,
    title,
    sessionConfig,
}: {
    url: string;

    title: string;

    sessionConfig?: SessionConfig | null;
}): Classification {
    const lowerUrl = url.toLowerCase();

    const lowerTitle =
        title.toLowerCase();

    // =========================
    // SESSION DOMAIN OVERRIDES
    // =========================

    if (sessionConfig) {
        const productiveDomain =
            sessionConfig.productiveDomains.some(
                (domain) =>
                    lowerUrl.includes(
                        domain.toLowerCase()
                    )
            );

        if (productiveDomain) {
            console.log(
                "Matched Session Productive Domain"
            );

            return "productive";
        }

        const distractingDomain =
            sessionConfig.distractingDomains.some(
                (domain) =>
                    lowerUrl.includes(
                        domain.toLowerCase()
                    )
            );

        if (distractingDomain) {
            console.log(
                "Matched Session Distracting Domain"
            );

            return "distracting";
        }

        // =========================
        // SESSION KEYWORD OVERRIDES
        // =========================

        const productiveKeyword =
            sessionConfig.productiveKeywords.some(
                (keyword) =>
                    lowerTitle.includes(
                        keyword.toLowerCase()
                    )
            );

        if (productiveKeyword) {
            console.log(
                "Matched Session Productive Keyword"
            );

            return "productive";
        }

        const distractingKeyword =
            sessionConfig.distractingKeywords.some(
                (keyword) =>
                    lowerTitle.includes(
                        keyword.toLowerCase()
                    )
            );

        if (distractingKeyword) {
            console.log(
                "Matched Session Distracting Keyword"
            );

            return "distracting";
        }
    }

    // =========================
    // LOCALHOST DEV RULE
    // =========================

    if (
        sessionConfig?.type === "coding" &&
        (
            lowerUrl.includes("localhost") ||
            lowerUrl.includes("127.0.0.1")
        )
    ) {
        console.log(
            "Matched Coding Localhost Rule"
        );

        return "productive";
    }

    // =========================
    // GLOBAL DOMAIN RULES
    // =========================

    const domainClassification =
        classifyDomain(url);

    if (
        domainClassification !==
        "neutral"
    ) {
        console.log(
            "Matched Global Domain Rule"
        );

        return domainClassification;
    }

    // =========================
    // YOUTUBE TITLE ANALYSIS
    // =========================

    if (
        lowerUrl.includes(
            "youtube.com/watch"
        )
    ) {
        const ytClassification =
            classifyYouTubeVideo(title);

        console.log(
            "Matched YouTube Title Rule"
        );

        return ytClassification;
    }

    // =========================
    // DEFAULT
    // =========================

    return "neutral";
}
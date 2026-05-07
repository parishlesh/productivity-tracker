import {
    productiveKeywords,
    distractingKeywords,
} from "../constants/keywords"

export function classifyYouTubeVideo(title: string) {
    const lowerTitle = title.toLowerCase();

    const productive = productiveKeywords.some((keyword) =>
        lowerTitle.includes(keyword)
    );

    if (productive) {
        return "productive";
    }

    const distracting = distractingKeywords.some((keyword) =>
        lowerTitle.includes(keyword)
    );

    if (distracting) {
        return "distracting";
    }

    return "neutral";
}
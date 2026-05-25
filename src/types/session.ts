export type SessionType =
    | "coding"
    | "research"
    | "learning"
    | "sketching"
    | "writing"
    | "deep-work"
    | "custom";

export type SessionConfig = {
    type: SessionType;

    label: string;

    productiveDomains: string[];

    distractingDomains: string[];

    productiveKeywords: string[];

    distractingKeywords: string[];
};

export type ActiveSession = {
    type: SessionType;

    startedAt: string;

    active: boolean;
};

export type SessionStats = {
    productive: number;

    distracting: number;

    neutral: number;
};

export type CompletedSession = {
    type: SessionType;

    startedAt: string;

    endedAt: string;

    duration: number;

    stats: SessionStats;

    focusScore: number;
};
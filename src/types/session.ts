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
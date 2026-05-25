import {
    CompletedSession,
} from "../types/session";

const COMPLETED_SESSIONS_KEY =
    "completedSessions";

export async function saveCompletedSession(
    session: CompletedSession
) {
    const result =
        await chrome.storage.local.get(
            COMPLETED_SESSIONS_KEY
        );

    const sessions:
        CompletedSession[] =
        result[
        COMPLETED_SESSIONS_KEY
        ] || [];

    sessions.push(session);

    await chrome.storage.local.set({
        [COMPLETED_SESSIONS_KEY]:
            sessions,
    });

    console.log(
        "Saved Completed Session:",
        session
    );
}

export async function getCompletedSessions() {
    const result =
        await chrome.storage.local.get(
            COMPLETED_SESSIONS_KEY
        );

    return (
        result[
        COMPLETED_SESSIONS_KEY
        ] || []
    );
}
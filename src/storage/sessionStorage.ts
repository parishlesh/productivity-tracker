import { ActiveSession } from "../types/session";

const ACTIVE_SESSION_KEY =
    "activeSession";

export async function saveActiveSession(
    session: ActiveSession
) {
    await chrome.storage.local.set({
        [ACTIVE_SESSION_KEY]: session,
    });

    console.log(
        "Saved Active Session:",
        session
    );
}

export async function getActiveSession(): Promise<ActiveSession | null> {
    const result =
        await chrome.storage.local.get(
            ACTIVE_SESSION_KEY
        );

    return (
        result[ACTIVE_SESSION_KEY] || null
    );
}

export async function clearActiveSession() {
    await chrome.storage.local.remove(
        ACTIVE_SESSION_KEY
    );

    console.log(
        "Active Session Cleared"
    );
}
import {
    saveActiveSession,
    getActiveSession,
    clearActiveSession,
} from "../storage/sessionStorage";

import {
    ActiveSession,
    SessionType,
} from "../types/session";

export async function startSession(
    type: SessionType
) {
    const session: ActiveSession = {
        type,

        startedAt: new Date().toISOString(),

        active: true,
    };

    await saveActiveSession(session);

    console.log(
        "Session Started:",
        session
    );

    return session;
}

export async function stopSession() {
    const session =
        await getActiveSession();

    if (!session) {
        console.log(
            "No Active Session Found"
        );

        return;
    }

    await clearActiveSession();

    console.log(
        "Session Stopped:",
        session
    );

    return session;
}

export async function getCurrentSession() {
    const session =
        await getActiveSession();

    console.log(
        "Current Session:",
        session
    );

    return session;
}
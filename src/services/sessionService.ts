import {
    saveActiveSession,
    getActiveSession,
    clearActiveSession,
} from "../storage/sessionStorage";

import { saveCompletedSession }
from "../storage/completedSessionStorage";

import {
  CompletedSession,
  SessionStats,
} from "../types/session";

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

export async function stopSession(
  sessionStats?: SessionStats
) {
  const session =
    await getActiveSession();

  if (!session) {
    console.log(
      "No Active Session Found"
    );

    return;
  }

  const endedAt =
    new Date().toISOString();

  const duration = Math.floor(
    (
      new Date(endedAt).getTime() -
      new Date(
        session.startedAt
      ).getTime()
    ) / 1000
  );

  const stats = sessionStats || {
    productive: 0,
    distracting: 0,
    neutral: 0,
  };

  const totalTracked =
    stats.productive +
    stats.distracting +
    stats.neutral;

  const focusScore =
    totalTracked === 0
      ? 0
      : Math.round(
          (
            stats.productive /
            totalTracked
          ) * 100
        );

  const completedSession: CompletedSession =
    {
      type: session.type,

      startedAt:
        session.startedAt,

      endedAt,

      duration,

      stats,

      focusScore,
    };

  await saveCompletedSession(
    completedSession
  );

  await clearActiveSession();

  console.log(
    "Session Stopped:",
    completedSession
  );

  return completedSession;
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
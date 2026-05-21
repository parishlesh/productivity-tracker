export type StatsType = {
  productive: number;
  distracting: number;
  neutral: number;
};

export type DailyStatsType = {
  [date: string]: StatsType;
};

function getTodayDate() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

export async function getDailyStats(): Promise<DailyStatsType> {
  const result =
    await chrome.storage.local.get(
      "dailyStats"
    );

  return result.dailyStats || {};
}

export async function updateStats(
  classification:
    | "productive"
    | "distracting"
    | "neutral",
  duration: number
) {
  const dailyStats =
    await getDailyStats();

  const today = getTodayDate();

  // create today's stats if missing
  if (!dailyStats[today]) {
    dailyStats[today] = {
      productive: 0,
      distracting: 0,
      neutral: 0,
    };
  }

  dailyStats[today][classification] +=
    duration;

  await chrome.storage.local.set({
    dailyStats,
  });

  console.log(
    "Updated Daily Stats:",
    dailyStats
  );
}

export async function clearStats() {
  await chrome.storage.local.remove(
    "dailyStats"
  );
}
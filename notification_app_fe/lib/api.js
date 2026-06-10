import { Log } from "./logger";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJoYXJzaGl0dmFyc2huZXk4MjJAZ21haWwuY29tIiwiZXhwIjoxNzgxMDc0ODMyLCJpYXQiOjE3ODEwNzM5MzIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzYTAwOGZhZS1iZmM0LTRhMzMtOWMwOC0wNTNjMDZiODZhMzIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJoYXJzaGl0IHZhcnNobmV5Iiwic3ViIjoiNjcwMmQ4OTAtZjczYy00OWExLWE3ZTUtZWIxMGUyYjg0Mjc2In0sImVtYWlsIjoiaGFyc2hpdHZhcnNobmV5ODIyQGdtYWlsLmNvbSIsIm5hbWUiOiJoYXJzaGl0IHZhcnNobmV5Iiwicm9sbE5vIjoiMjMxNTAwMDk0NSIsImFjY2Vzc0NvZGUiOiJSUHNnWXQiLCJjbGllbnRJRCI6IjY3MDJkODkwLWY3M2MtNDlhMS1hN2U1LWViMTBlMmI4NDI3NiIsImNsaWVudFNlY3JldCI6IlJ5bVVOUGZHVEJtSnBQYXUifQ.idwl_yvcjtKdxOlZSEqi-wP4vIxQmAnLzg5M1utDjcI";

const WEIGHT = { Placement: 3, Result: 2, Event: 1 };

export async function fetchNotifications(params = {}) {
  await Log("frontend", "info", "api", "Fetching notifications");
  const url = new URL("http://4.224.186.213/evaluation-service/notifications");
  if (params.limit) url.searchParams.set("limit", params.limit);
  if (params.page) url.searchParams.set("page", params.page);
  if (params.notification_type) url.searchParams.set("notification_type", params.notification_type);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    cache: "no-store",
  });

  if (!res.ok) {
    await Log("frontend", "error", "api", `Notifications fetch failed: ${res.status}`);
    throw new Error("Failed to fetch");
  }

  const data = await res.json();
  await Log("frontend", "info", "api", `Fetched ${data.notifications.length} notifications`);
  return data.notifications;
}

export function getPriorityNotifications(notifications, n = 10) {
  const scored = notifications.map((notif) => ({
    ...notif,
    score: (WEIGHT[notif.Type] || 0) * 1e13 + new Date(notif.Timestamp).getTime(),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, n);
}

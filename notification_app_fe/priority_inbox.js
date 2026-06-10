const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJoYXJzaGl0dmFyc2huZXk4MjJAZ21haWwuY29tIiwiZXhwIjoxNzgxMDc0ODMyLCJpYXQiOjE3ODEwNzM5MzIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzYTAwOGZhZS1iZmM0LTRhMzMtOWMwOC0wNTNjMDZiODZhMzIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJoYXJzaGl0IHZhcnNobmV5Iiwic3ViIjoiNjcwMmQ4OTAtZjczYy00OWExLWE3ZTUtZWIxMGUyYjg0Mjc2In0sImVtYWlsIjoiaGFyc2hpdHZhcnNobmV5ODIyQGdtYWlsLmNvbSIsIm5hbWUiOiJoYXJzaGl0IHZhcnNobmV5Iiwicm9sbE5vIjoiMjMxNTAwMDk0NSIsImFjY2Vzc0NvZGUiOiJSUHNnWXQiLCJjbGllbnRJRCI6IjY3MDJkODkwLWY3M2MtNDlhMS1hN2U1LWViMTBlMmI4NDI3NiIsImNsaWVudFNlY3JldCI6IlJ5bVVOUGZHVEJtSnBQYXUifQ.idwl_yvcjtKdxOlZSEqi-wP4vIxQmAnLzg5M1utDjcI";

const { Log } = require("../logging_middleware/index");

const WEIGHT = { Placement: 3, Result: 2, Event: 1 };

async function getPriorityInbox(n = 10) {
  await Log("frontend", "info", "api", "Fetching notifications from API");

  const res = await fetch("http://4.224.186.213/evaluation-service/notifications", {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
  });

  if (!res.ok) {
    await Log("frontend", "error", "api", `Failed to fetch notifications: ${res.status}`);
    throw new Error("Failed to fetch notifications");
  }

  const data = await res.json();
  const notifications = data.notifications;

  await Log("frontend", "info", "api", `Fetched ${notifications.length} notifications`);

  const scored = notifications.map((notif) => {
    const weight = WEIGHT[notif.Type] || 0;
    const recency = new Date(notif.Timestamp).getTime();
    const score = weight * 1e13 + recency;
    return { ...notif, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, n);

  await Log("frontend", "info", "page", `Top ${n} priority notifications calculated`);

  console.log(`\n=== TOP ${n} PRIORITY NOTIFICATIONS ===\n`);
  top.forEach((n, i) => {
    console.log(`${i + 1}. [${n.Type}] ${n.Message} — ${n.Timestamp}`);
  });

  return top;
}

getPriorityInbox(10);
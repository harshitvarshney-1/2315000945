const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJoYXJzaGl0dmFyc2huZXk4MjJAZ21haWwuY29tIiwiZXhwIjoxNzgxMDc0ODMyLCJpYXQiOjE3ODEwNzM5MzIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzYTAwOGZhZS1iZmM0LTRhMzMtOWMwOC0wNTNjMDZiODZhMzIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJoYXJzaGl0IHZhcnNobmV5Iiwic3ViIjoiNjcwMmQ4OTAtZjczYy00OWExLWE3ZTUtZWIxMGUyYjg0Mjc2In0sImVtYWlsIjoiaGFyc2hpdHZhcnNobmV5ODIyQGdtYWlsLmNvbSIsIm5hbWUiOiJoYXJzaGl0IHZhcnNobmV5Iiwicm9sbE5vIjoiMjMxNTAwMDk0NSIsImFjY2Vzc0NvZGUiOiJSUHNnWXQiLCJjbGllbnRJRCI6IjY3MDJkODkwLWY3M2MtNDlhMS1hN2U1LWViMTBlMmI4NDI3NiIsImNsaWVudFNlY3JldCI6IlJ5bVVOUGZHVEJtSnBQYXUifQ.idwl_yvcjtKdxOlZSEqi-wP4vIxQmAnLzg5M1utDjcI";

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

async function Log(stack, level, pkg, message) {
  try {
    const response = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });
    const data = await response.json();
    console.log("Log sent:", data);
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
}

module.exports = { Log };

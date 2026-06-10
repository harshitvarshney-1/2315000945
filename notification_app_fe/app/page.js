"use client";
import { useEffect, useState } from "react";
import { Container, Typography, Divider, CircularProgress, Box } from "@mui/material";
import PriorityInbox from "../components/PriorityInbox";
import NotificationCard from "../components/NotificationCard";
import { fetchNotifications } from "../lib/api";
import { Log } from "../lib/logger";

export default function HomePage() {
  const [notifications, setNotifications] = useState([]);
  const [viewedIds, setViewedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        await Log("frontend", "info", "page", "Home page loaded");
        const data = await fetchNotifications();
        const stored = JSON.parse(localStorage.getItem("viewedIds") || "[]");
        const viewedSet = new Set(stored);
        const newIds = data.map((notif) => notif.ID);
        const updatedViewed = new Set([...viewedSet, ...newIds]);
        localStorage.setItem("viewedIds", JSON.stringify([...updatedViewed]));
        setViewedIds(viewedSet);
        setNotifications(data);
      } catch (err) {
        await Log("frontend", "error", "page", `Home page error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <PriorityInbox notifications={notifications} viewedIds={viewedIds} />
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        All Notifications
      </Typography>
      {notifications.map((notif) => (
        <NotificationCard key={notif.ID} notif={notif} isNew={!viewedIds.has(notif.ID)} />
      ))}
    </Container>
  );
}

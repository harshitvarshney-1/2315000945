"use client";
import { useState } from "react";
import { Box, Typography, Slider, Divider } from "@mui/material";
import NotificationCard from "./NotificationCard";
import { getPriorityNotifications } from "../lib/api";

export default function PriorityInbox({ notifications, viewedIds }) {
  const [n, setN] = useState(10);
  const priority = getPriorityNotifications(notifications, n);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Priority Inbox
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Show top {n} notifications
      </Typography>
      <Slider
        value={n}
        min={5}
        max={20}
        step={5}
        marks
        valueLabelDisplay="auto"
        onChange={(_, val) => setN(val)}
        sx={{ maxWidth: 300, mb: 2 }}
      />
      <Divider sx={{ mb: 2 }} />
      {priority.map((notif) => (
        <NotificationCard key={notif.ID} notif={notif} isNew={!viewedIds.has(notif.ID)} />
      ))}
    </Box>
  );
}

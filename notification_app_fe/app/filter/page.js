"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Box,
} from "@mui/material";
import NotificationCard from "../../components/NotificationCard";
import { fetchNotifications } from "../../lib/api";
import { Log } from "../../lib/logger";

const TYPES = ["Event", "Result", "Placement"];

export default function FilterPage() {
  const [all, setAll] = useState([]);
  const [filter, setFilter] = useState("Event");
  const [viewedIds, setViewedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        await Log("frontend", "info", "page", "Filter page loaded");
        const data = await fetchNotifications({ notification_type: filter });
        const stored = JSON.parse(localStorage.getItem("viewedIds") || "[]");
        setViewedIds(new Set(stored));
        setAll(data);
      } catch (err) {
        await Log("frontend", "error", "page", `Filter page error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filter]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Filter Notifications
      </Typography>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(_, val) => val && setFilter(val)}
        sx={{ mb: 3 }}
      >
        {TYPES.map((t) => (
          <ToggleButton key={t} value={t}>
            {t}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        all.map((notif) => (
          <NotificationCard key={notif.ID} notif={notif} isNew={!viewedIds.has(notif.ID)} />
        ))
      )}
    </Container>
  );
}

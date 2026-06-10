"use client";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

const typeColor = { Placement: "success", Result: "warning", Event: "info" };

export default function NotificationCard({ notif, isNew }) {
  return (
    <Card
      sx={{
        mb: 2,
        border: isNew ? "2px solid #1976d2" : "1px solid #e0e0e0",
        borderRadius: 2,
        opacity: isNew ? 1 : 0.85,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Chip label={notif.Type} color={typeColor[notif.Type] || "default"} size="small" />
          {isNew && <Chip label="NEW" color="primary" size="small" />}
        </Box>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {notif.Message}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(notif.Timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

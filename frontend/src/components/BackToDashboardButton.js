import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackToDashboardButton = ({ sx }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate("/dashboard")}
      sx={{ mb: 2, ...(sx || {}) }}
    >
      👉Back to Dashboard
    </Button>
  );
};

export default BackToDashboardButton;

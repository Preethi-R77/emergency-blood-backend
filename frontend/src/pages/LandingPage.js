import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
const LandingPage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Donor Management 👤",
      description: "Manage blood donors and donation records",
    },
    {
      title: "Blood Requests 📋",
      description: "Create and track blood requests",
    },
    {
      title: "Stock Tracking 🩸",
      description: "Monitor available blood inventory",
    },
    {
      title: "Shortage Alerts 🚨",
      description: "Get alerts for blood shortages",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: "bold",
            mb: 2,
            color: "#d32f2f",
          }}
        >
          🚨Emergency Blood Management System🩸
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
            A Secure Platform To Manage Blood Donors, Requests, and Inventory in
          Emergency Situations🚑
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => navigate("/login")}
          sx={{
            px: 6,
            py: 1.5,
            fontSize: "1rem",
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          Login / Register
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;

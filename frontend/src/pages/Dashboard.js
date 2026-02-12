import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { bloodRequestAPI, donorAPI, bloodStockAPI } from "../services/api";

// Critical shortage threshold (less than 5 units)
//const CRITICAL_THRESHOLD = 5;

// Add CSS for fluttering animation
const styles = `
  @keyframes flutter-pulse {
    0% {
      box-shadow: 0 0 10px rgba(211, 47, 47, 0.8), inset 0 0 10px rgba(211, 47, 47, 0.6);
      background-color: rgba(211, 47, 47, 0.15);
    }
    50% {
      box-shadow: 0 0 20px rgba(211, 47, 47, 1), inset 0 0 15px rgba(211, 47, 47, 0.8);
      background-color: rgba(211, 47, 47, 0.25);
    }
    100% {
      box-shadow: 0 0 10px rgba(211, 47, 47, 0.8), inset 0 0 10px rgba(211, 47, 47, 0.6);
      background-color: rgba(211, 47, 47, 0.15);
    }
  }
  
  .critical-shortage-card {
    animation: flutter-pulse 1s ease-in-out infinite !important;
    border: 2px solid #d32f2f;
  }
  
  .critical-badge {
    display: inline-block;
    background-color: #d32f2f;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    margin-top: 8px;
    animation: flutter-pulse 1s ease-in-out infinite;
  }
`;

// Inject styles into DOM
if (!document.getElementById("critical-shortage-styles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "critical-shortage-styles";
  styleSheet.innerHTML = styles;
  document.head.appendChild(styleSheet);
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    totalUnits: 0,
  });
  const [criticalShortages, setCriticalShortages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [donorsRes, requestsRes, stockRes] = await Promise.all([
        donorAPI.getAllDonors(),
        bloodRequestAPI.getAllRequests(),
        bloodStockAPI.getAllStock(),
      ]);

      const totalUnits = stockRes.data.reduce(
        (sum, item) => sum + item.availableUnits,
        0
      );

      // Find critical shortages based on requests
      const critical = requestsRes.data
        .map((req) => {
          const group = req.requiredBloodGroup;
          const required = Number(req.requiredUnits) || 0;
          const stockItem = stockRes.data.find((s) => s.bloodGroup === group);
          const available = stockItem ? Number(stockItem.availableUnits) : 0;
          const donorCount = donorsRes.data.filter(
            (d) => d.bloodGroup === group
          ).length;

          // Check if this is a critical shortage
          const isCritical =
            donorCount === 0 || available < required;

          return isCritical
            ? {
                bloodGroup: group,
                availableUnits: available,
                requiredUnits: required,
                donorCount,
                reason:
                  donorCount === 0
                    ? "No Registered Donors"
                    : `Short by ${required - available} units`,
              }
            : null;
        })
        .filter((item) => item !== null);

      // Remove duplicates by blood group
      const uniqueCritical = Array.from(
        new Map(critical.map((item) => [item.bloodGroup, item])).values()
      );

      setStats({
        totalDonors: donorsRes.data.length,
        totalRequests: requestsRes.data.length,
        totalUnits,
      });

      setCriticalShortages(uniqueCritical);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const modules = [
    { title: "Donor Registration", route: "/donor", icon: "🩸" },
    { title: "Registered Donors", route: "/registered-donors", icon: "📋" },
    { title: "Blood Request", route: "/request", icon: "🏥" },
    { title: "Shortage Alert", route: "/shortage", icon: "⚠️" },
    { title: "Available Blood Stock", route: "/stock", icon: "📦" },
    { title: "Requested Users List", route: "/requests-list", icon: "👥" },
    {
      title: "Donor Appreciation Certificate",
      route: "/certificate",
      icon: "🏆",
    },
  ];

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, color: "#d32f2f" }}
      >
        📊 DASHBOARD
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography color="textSecondary" gutterBottom>
                Total Donors
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                {stats.totalDonors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography color="textSecondary" gutterBottom>
                Total Requests
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                {stats.totalRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography color="textSecondary" gutterBottom>
                Total Units Available
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                {stats.totalUnits}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Critical Shortages Section */}
      {criticalShortages.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#d32f2f" }}>
            ⚠️ CRITICAL BLOOD SHORTAGES
          </Typography>
          <Grid container spacing={3}>
            {criticalShortages.map((shortage, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  className="critical-shortage-card"
                  sx={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                      🩸
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                      {shortage.bloodGroup}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666", my: 1 }}>
                      {shortage.reason}
                    </Typography>
                    {shortage.availableUnits > 0 && (
                      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#d32f2f", my: 1 }}>
                        {shortage.availableUnits} / {shortage.requiredUnits} Units
                      </Typography>
                    )}
                    <Box className="critical-badge">
                      CRITICAL
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Modules
      </Typography>

      {/* Module Cards */}
      <Grid container spacing={3}>
        {modules.map((module, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              onClick={() => navigate(module.route)}
              sx={{
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, boxShadow 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  {module.icon}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {module.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Footer */}
  <Box sx={{ textAlign: "center", mt: 5, py: 2, borderTop: "1px solid #ccc", color: "#555" }}>
    ©2026, Emergency Blood Management System. All rights reserved.
  </Box>
    </Container>
  );
};
export default Dashboard;

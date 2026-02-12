import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Only show user info on protected routes (not on landing or login page)
  const isPublicPage = location.pathname === "/" || location.pathname === "/login";

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            Emergency Blood Management System 🩸
          </Button>
        </Box>
        {user && !isPublicPage && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Welcome Text Container */}
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                padding: "8px 16px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Typography variant="body1" sx={{ color: "inherit", fontWeight: 500 }}>
                👤{user.username}
              </Typography>
            </Box>

            {/* Logout Button Container */}
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                padding: "4px 4px",
              }}
            >
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  fontSize: "0.9rem",
                  padding: "4px 12px",
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                📤Logout
              </Button>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

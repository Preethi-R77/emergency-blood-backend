import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { authAPI } from "../services/api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isRegister) {
        response = await authAPI.register(username, password);
        // After registration do NOT auto-login; mark as just registered so first login shows "Welcome"
        try {
          const regUser = response.data?.user?.username || username;
          localStorage.setItem("justRegistered", regUser);
        } catch (e) {}
        // Show neutral registration success message and return to login form
        toast.success("Registration successful. Please login.");
        setIsRegister(false);
        setUsername("");
        setPassword("");
        setLoading(false);
        return;
      } else {
        response = await authAPI.login(username, password);
      }

      const { token, user, message } = response.data;
      login(user, token);
      // If this user just registered, show "Welcome", otherwise show server message (usually "Welcome back")
      const justRegistered = localStorage.getItem("justRegistered");
      if (justRegistered && justRegistered === user.username) {
        toast.success(`Welcome, ${user.username}`);
        localStorage.removeItem("justRegistered");
      } else {
        toast.success(message || `Welcome back, ${user.username}`);
      }
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Authentication failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card sx={{ p: 4, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 3,
            fontWeight: "bold",
            color: "#d32f2f",
          }}
        >
          {isRegister ? "Create Account🧾" : "Login📩"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, py: 1.5, fontSize: "1rem" }}
            disabled={loading}
          >
            {loading ? "Processing..." : isRegister ? "Register" : "Login"}
          </Button>
        </form>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <Button
              color="error"
              onClick={() => setIsRegister(!isRegister)}
              sx={{ textTransform: "none", ml: 1 }}
            >
              {isRegister ? "Login" : "Register"}
            </Button>
          </Typography>
        </Box>
      </Card>

      {/* Back to Home Button - Outside the Box */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate("/")}
          sx={{ px: 3, py: 1 }}
        >
          Back to Home🏠
        </Button>
      </Box>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
};

export default LoginPage;

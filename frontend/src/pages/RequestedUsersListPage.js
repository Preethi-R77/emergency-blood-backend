import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CircularProgress,
  Box,
} from "@mui/material";
import { bloodRequestAPI } from "../services/api";
import BackToDashboardButton from "../components/BackToDashboardButton";

const RequestedUsersListPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await bloodRequestAPI.getAllRequests();
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
          📋 Requested Users List
        </Typography>
        <BackToDashboardButton />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Card}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Patient Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Blood Group Requested
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Required Units
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request.patientName}</TableCell>
                  <TableCell>{request.requiredBloodGroup}</TableCell>
                  <TableCell>{request.requiredUnits}</TableCell>
                  <TableCell>{request.location}</TableCell>
                  <TableCell>{request.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default RequestedUsersListPage;

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
import { donorAPI } from "../services/api";
import BackToDashboardButton from "../components/BackToDashboardButton";

const RegisteredDonorsPage = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const response = await donorAPI.getAllDonors();
      setDonors(response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
          👥 Registered Donors
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
                <TableCell sx={{ fontWeight: "bold" }}>Donor Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Blood Group</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Units Donated</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Phone Number</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Donation Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donors.map((donor) => (
                <TableRow key={donor._id}>
                  <TableCell>{donor.name}</TableCell>
                  <TableCell>{donor.bloodGroup}</TableCell>
                  <TableCell>{donor.unitsDonated}</TableCell>
                  <TableCell>{donor.location}</TableCell>
                  <TableCell>{donor.phoneNumber}</TableCell>
                  <TableCell>
                    {new Date(donor.donationDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default RegisteredDonorsPage;

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
  Alert,
  Chip,
} from "@mui/material";

import { bloodRequestAPI, donorAPI, bloodStockAPI } from "../services/api";
import BackToDashboardButton from "../components/BackToDashboardButton";


const ShortageAlertPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const [alertsRes, requestsRes, donorsRes, stockRes] = await Promise.all([
        bloodRequestAPI.getShortageAlerts(),
        bloodRequestAPI.getAllRequests(),
        donorAPI.getAllDonors(),
        bloodStockAPI.getAllStock(),
      ]);
      setAlerts(alertsRes.data || []);
      setRequests(requestsRes.data || []);
      setDonors(donorsRes.data || []);
      setStock(stockRes.data || []);
    } catch (error) {
      console.error("Error fetching shortage alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
          ⚠️ Shortage Alerts
        </Typography>
        <BackToDashboardButton />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : requests.length === 0 ? (
        <Alert severity="info">No blood requests yet.</Alert>
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
            Requested Blood Groups
          </Typography>

          <TableContainer component={Card} sx={{ mb: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#ffebee" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                    Patient Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                    Blood Group
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                    Required Units
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                    Available Units
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                    Registered Donors
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((req) => {
                  const group = req.requiredBloodGroup;
                  const required = Number(req.requiredUnits) || 0;
                  const stockItem = stock.find((s) => s.bloodGroup === group);
                  const available = stockItem ? Number(stockItem.availableUnits) : 0;
                  const donorCount = donors.filter((d) => d.bloodGroup === group).length;
                  let status = "Available";
                  if (donorCount === 0) {
                    status = "CRITICAL – No Registered Donors";
                  } else if (available < required) {
                    status = "CRITICAL";
                  }

                  return (
                    <TableRow key={req._id} sx={{ backgroundColor: "#fff3e0" }}>
                      <TableCell>{req.patientName}</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                        {group}
                      </TableCell>
                      <TableCell>{required}</TableCell>
                      <TableCell>{available}</TableCell>
                      <TableCell>{donorCount}</TableCell>
                      <TableCell>
                        <Chip
                          label={status}
                          color={status.startsWith("CRITICAL") ? "error" : "success"}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
            Other Blood Groups
          </Typography>

          {(() => {
            const allBloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
            const requestedGroups = new Set(requests.map((r) => r.requiredBloodGroup));
            const nonRequestedGroups = allBloodGroups.filter((g) => !requestedGroups.has(g));
            
            if (nonRequestedGroups.length === 0) {
              return <Alert severity="info">All blood groups have been requested.</Alert>;
            }
            
            return (
              <TableContainer component={Card}>
                <Table>
                  <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Blood Group</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Available Units</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Registered Donors</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {nonRequestedGroups.map((g) => {
                      const stockItem = stock.find((s) => s.bloodGroup === g);
                      const available = stockItem ? Number(stockItem.availableUnits) : 0;
                      const donorCount = donors.filter((d) => d.bloodGroup === g).length;
                      let status = "No Registered Donors Yet";
                      if (donorCount > 0) status = "Available";

                      return (
                        <TableRow key={g}>
                          <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>{g}</TableCell>
                          <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>{available}</TableCell>
                          <TableCell>{donorCount}</TableCell>
                          <TableCell>
                            <Chip
                              label={status}
                              color={status === "No Registered Donors Yet" ? "info" : "success"}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          })()}
        </>
      )}
    </Container>
  );
};

export default ShortageAlertPage;

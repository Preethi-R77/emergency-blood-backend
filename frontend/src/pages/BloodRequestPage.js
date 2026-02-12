import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Chip,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bloodRequestAPI, bloodStockAPI } from "../services/api";
import BackToDashboardButton from "../components/BackToDashboardButton";

const BloodRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    patientName: "",
    requiredBloodGroup: "",
    requiredUnits: "",
    location: "",
    phoneNumber: "",
  });

  const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  useEffect(() => {
    fetchRequests();
    // Set up interval to refresh stock every 5 seconds for real-time updates
    const interval = setInterval(fetchStock, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await bloodRequestAPI.getAllRequests();
      setRequests(response.data);
      await fetchStock();
    } catch (error) {
      toast.error("Failed to fetch blood requests");
    } finally {
      setLoading(false);
    }
  };

  const fetchStock = async () => {
    try {
      const response = await bloodStockAPI.getAllStock();
      setStock(response.data);
    } catch (error) {
      console.error("Failed to fetch blood stock");
    }
  };

  // Get status based on available stock
  const getStatus = (bloodGroup, requiredUnits) => {
    const stockItem = stock.find((s) => s.bloodGroup === bloodGroup);
    const availableUnits = stockItem ? stockItem.availableUnits : 0;
    return availableUnits >= requiredUnits ? "Available" : "Not Available";
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDialogOpen = (request = null) => {
    if (request) {
      setEditingId(request._id);
      setFormData({
        patientName: request.patientName,
        requiredBloodGroup: request.requiredBloodGroup,
        requiredUnits: request.requiredUnits,
        location: request.location,
        phoneNumber: request.phoneNumber,
      });
    } else {
      setEditingId(null);
      setFormData({
        patientName: "",
        requiredBloodGroup: "",
        requiredUnits: "",
        location: "",
        phoneNumber: "",
      });
    }
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        // Can only edit patient name and phone number
        await bloodRequestAPI.updateRequest(editingId, {
          patientName: formData.patientName,
          phoneNumber: formData.phoneNumber,
        });
        toast.success("Blood request updated successfully");
      } else {
        await bloodRequestAPI.createRequest(formData);
        toast.success("Blood request created successfully");
      }
      handleDialogClose();
      fetchRequests();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Operation failed"
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await bloodRequestAPI.deleteRequest(id);
        toast.success("Blood request deleted successfully");
        fetchRequests();
      } catch (error) {
        toast.error("Failed to delete blood request");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
          🏥 Blood Request
        </Typography>
        <BackToDashboardButton />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDialogOpen()}
        >
          ➕ Create New Request
        </Button>
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
                <TableCell sx={{ fontWeight: "bold" }}>Blood Group</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Units Needed</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => {
                const status = getStatus(
                  request.requiredBloodGroup,
                  request.requiredUnits
                );
                const statusColor = status === "Available" ? "success" : "error";
                return (
                  <TableRow key={request._id}>
                    <TableCell>{request.patientName}</TableCell>
                    <TableCell>{request.requiredBloodGroup}</TableCell>
                    <TableCell>{request.requiredUnits}</TableCell>
                    <TableCell>{request.location}</TableCell>
                    <TableCell>{request.phoneNumber}</TableCell>
                    <TableCell>
                      <Chip label={status} color={statusColor} />
                    </TableCell>
                    <TableCell>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleDialogOpen(request)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(request._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog for Add/Edit */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? "Edit Blood Request" : "Create Blood Request"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Patient Name"
            fullWidth
            name="patientName"
            value={formData.patientName}
            onChange={handleFormChange}
          />
          <FormControl fullWidth disabled={!!editingId}>
            <InputLabel>Required Blood Group</InputLabel>
            <Select
              name="requiredBloodGroup"
              value={formData.requiredBloodGroup}
              onChange={handleFormChange}
              label="Required Blood Group"
            >
              {bloodGroups.map((bg) => (
                <MenuItem key={bg} value={bg}>
                  {bg}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Required Units"
            type="number"
            fullWidth
            name="requiredUnits"
            value={formData.requiredUnits}
            onChange={handleFormChange}
            disabled={!!editingId}
          />
          <TextField
            label="Location"
            fullWidth
            name="location"
            value={formData.location}
            onChange={handleFormChange}
            disabled={!!editingId}
          />
          <TextField
            label="Phone Number"
            fullWidth
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="error">
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
};

export default BloodRequestPage;

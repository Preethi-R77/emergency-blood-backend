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
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { donorAPI } from "../services/api";
import BackToDashboardButton from "../components/BackToDashboardButton";

const DonorPage = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    unitsDonated: "",
    location: "",
    phoneNumber: "",
  });

  const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const response = await donorAPI.getAllDonors();
      setDonors(response.data);
    } catch (error) {
      toast.error("Failed to fetch donors");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDialogOpen = (donor = null) => {
    if (donor) {
      setEditingId(donor._id);
      setFormData({
        name: donor.name,
        bloodGroup: donor.bloodGroup,
        unitsDonated: donor.unitsDonated,
        location: donor.location,
        phoneNumber: donor.phoneNumber,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        bloodGroup: "",
        unitsDonated: "",
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
        // Can only edit name and phone number
        await donorAPI.updateDonor(editingId, {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
        });
        toast.success("Donor updated successfully");
      } else {
        await donorAPI.addDonor(formData);
        toast.success("Donor added successfully");
      }
      handleDialogClose();
      fetchDonors();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        await donorAPI.deleteDonor(id);
        toast.success("Donor deleted successfully");
        fetchDonors();
      } catch (error) {
        toast.error("Failed to delete donor");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
          💉 Donor Information
        </Typography>
        <BackToDashboardButton />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDialogOpen()}
        >
          +👤  Add New Donor
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
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Blood Group</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Units</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
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
                  <TableCell>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleDialogOpen(donor)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(donor._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog for Add/Edit */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? "Edit Donor" : "Add Donor"}</DialogTitle>
        <DialogContent sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Donor Name"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
          <FormControl fullWidth disabled={!!editingId}>
            <InputLabel>Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleFormChange}
              label="Blood Group"
            >
              {bloodGroups.map((bg) => (
                <MenuItem key={bg} value={bg}>
                  {bg}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Units Donated"
            type="number"
            fullWidth
            name="unitsDonated"
            value={formData.unitsDonated}
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
            {editingId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
};

export default DonorPage;

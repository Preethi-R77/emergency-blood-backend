import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { donorAPI } from "../services/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import BackToDashboardButton from "../components/BackToDashboardButton";

const DonorCertificatePage = () => {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
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
      toast.error("Failed to fetch donors");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    const certificateElement = document.getElementById("certificate");
    const canvas = await html2canvas(certificateElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
    pdf.save(`${selectedDonor.name}_certificate.pdf`);
    toast.success("Certificate downloaded successfully");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    const certificateElement = document.getElementById("certificate");
    printWindow.document.write(certificateElement.outerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
          🏆 Donor Appreciation Certificate
        </Typography>
        <BackToDashboardButton />
      </Box>

      <FormControl fullWidth sx={{ mb: 4, maxWidth: "400px" }}>
        <InputLabel>Select Donor</InputLabel>
        <Select
          value={selectedDonor?._id || ""}
          onChange={(e) => {
            const donor = donors.find((d) => d._id === e.target.value);
            setSelectedDonor(donor);
          }}
          label="Select Donor"
        >
          {donors.map((donor) => (
            <MenuItem key={donor._id} value={donor._id}>
              {donor.name} ({donor.bloodGroup})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedDonor && (
        <>
          <Box
            id="certificate"
            sx={{
              p: 6,
              backgroundColor: "#f5f5f5",
              border: "3px solid #d32f2f",
              borderRadius: "10px",
              textAlign: "center",
              maxWidth: "900px",
              mx: "auto",
              mb: 4,
              fontFamily: "Georgia, serif",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#d32f2f",
                mb: 2,
              }}
            >
              CERTIFICATE OF APPRECIATION🏆
            </Typography>

            <Typography sx={{ fontSize: "1.1rem", mb: 3, color: "#666" }}>
              This certificate is proudly presented to
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#d32f2f",
                mb: 1,
                fontSize: "2rem",
              }}
            >
              {selectedDonor.name}
            </Typography>

            <Typography sx={{ fontSize: "1.1rem", mb: 4, color: "#666" }}>
              For your generous donation of life-saving blood
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: "1rem", mb: 1 }}>
                <strong>Blood Group:</strong> {selectedDonor.bloodGroup}
              </Typography>
              <Typography sx={{ fontSize: "1rem", mb: 1 }}>
                <strong>Units Donated:</strong> {selectedDonor.unitsDonated}
              </Typography>
              <Typography sx={{ fontSize: "1rem", mb: 3 }}>
                <strong>Donation Date:</strong>{" "}
                {new Date(selectedDonor.donationDate).toLocaleDateString()}
              </Typography>
            </Box>

            <Typography sx={{ fontSize: "1rem", color: "#666", fontStyle: "italic" }}>
              Your selfless act of kindness has helped save lives and bring hope
              to those in need. The Emergency Blood Management System honors your
              commitment to humanity.
            </Typography>

            <Box sx={{ mt: 6, pt: 4, borderTop: "2px solid #d32f2f" }}>
              <Typography sx={{ fontSize: "0.9rem", color: "#999" }}>
                Emergency Blood Management System
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
            <Button variant="outlined" color="error" onClick={handlePrint}>
              Print
            </Button>
          </Box>
        </>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
};

export default DonorCertificatePage;

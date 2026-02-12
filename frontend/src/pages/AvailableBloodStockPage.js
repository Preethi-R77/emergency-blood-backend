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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { bloodStockAPI } from "../services/api";
import BackToDashboardButton from "../components/BackToDashboardButton";

const AvailableBloodStockPage = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    setLoading(true);
    try {
      const response = await bloodStockAPI.getAllStock();
      setStock(response.data);
    } catch (error) {
      console.error("Error fetching blood stock:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
          📊 Available Blood Stock
        </Typography>
        <BackToDashboardButton />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Bar Chart */}
          <Card sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#d32f2f" }}>
              Blood Units by Group
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={(() => {
                  const allBloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
                  const stockMap = {};
                  stock.forEach((item) => {
                    stockMap[item.bloodGroup] = item.availableUnits;
                  });
                  return allBloodGroups.map((group) => ({
                    bloodGroup: group,
                    units: stockMap[group] || 0,
                  }));
                })()}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bloodGroup" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="units" fill="#d32f2f" name="Available Units" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Data Table */}
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#d32f2f" }}>
            Stock Details
          </Typography>
          <TableContainer component={Card}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Blood Group</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Available Units
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stock.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                      {item.bloodGroup}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                      {item.availableUnits}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default AvailableBloodStockPage;

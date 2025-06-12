"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { SportsCricket } from "@mui/icons-material";
import storage from "@/class/storage";

export default function PredictCricket() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    mat: "",
    runs: "",
    hs: "",
    avg: "",
    "50": "",
    "100": "",
    balls: "",
    wkt: "",
    bbi: "",
    ave: "",
    "5wi": "",
    ca: "",
    st: "",
  });

  useEffect(() => {
    const storedUser = storage.get("user");
    if (!storedUser) {
      router.push("/auth/login");
      return;
    }
    setUser(storedUser);
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict/rf_cric", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const data = await response.json();
      setPrediction(data["Base value"]);
    } catch (err) {
      setError(err.message || "An error occurred while getting the prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      {!user ? (
        <CircularProgress />
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <SportsCricket sx={{ fontSize: 40, color: "#4caf50", mr: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Cricket Player Base Price Prediction
            </Typography>
          </Box>

          <Paper sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Matches Played"
                    name="mat"
                    type="number"
                    value={formData.mat}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Total Runs"
                    name="runs"
                    type="number"
                    value={formData.runs}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Highest Score"
                    name="hs"
                    type="number"
                    value={formData.hs}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Batting Average"
                    name="avg"
                    type="number"
                    value={formData.avg}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Number of 50s"
                    name="50"
                    type="number"
                    value={formData["50"]}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Number of 100s"
                    name="100"
                    type="number"
                    value={formData["100"]}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Balls Bowled"
                    name="balls"
                    type="number"
                    value={formData.balls}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Wickets Taken"
                    name="wkt"
                    type="number"
                    value={formData.wkt}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Best Bowling Figures"
                    name="bbi"
                    type="number"
                    value={formData.bbi}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Bowling Average"
                    name="ave"
                    type="number"
                    value={formData.ave}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="5 Wicket Hauls"
                    name="5wi"
                    type="number"
                    value={formData["5wi"]}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Catches"
                    name="ca"
                    type="number"
                    value={formData.ca}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Stumpings"
                    name="st"
                    type="number"
                    value={formData.st}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/predict-options")}
                  sx={{ minWidth: 120 }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ minWidth: 120, bgcolor: "#4caf50" }}
                >
                  {loading ? <CircularProgress size={24} /> : "Predict"}
                </Button>
              </Box>
            </form>

            {error && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {error}
              </Alert>
            )}

            {prediction !== null && (
              <Box sx={{ mt: 3 }}>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Predicted Base Price: ${prediction.toFixed(2)}
                </Alert>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    try {
                      const res = await fetch("/api/player/market-value", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                          userId: user.id, 
                          marketValue: prediction 
                        }),
                      });
                      if (!res.ok) throw new Error("Failed to save prediction");
                      router.push("/UserDashboard");
                    } catch (err) {
                      setError(err.message || "Error saving prediction");
                    }
                  }}
                  sx={{ minWidth: 120 }}
                >
                  OK
                </Button>
              </Box>
            )}
          </Paper>
        </>
      )}
    </Box>
  );
} 
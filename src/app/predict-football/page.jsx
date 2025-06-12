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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SportsSoccer } from "@mui/icons-material";
import storage from "@/class/storage";

export default function PredictFootball() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    height: "",
    age: "",
    appearance: "",
    goals: "",
    assists: "",
    yellow_cards: "",
    second_yellow_cards: "",
    red_cards: "",
    clean_sheets: "",
    minutes_played: "",
    days_injured: "",
    games_injured: "",
    award: "",
    highest_value: "",
    position_encoded: "",
  });

  const positions = [
    "goalkeeper",
    "defender_centre_back",
    "defender_left_back",
    "defender_right_back",
    "midfield_attackingmidfield",
    "midfield_centralmidfield",
    "midfield_defensivemidfield",
    "midfield_leftmidfield",
    "midfield_rightmidfield",
    "attack_leftwinger",
    "attack_rightwinger",
    "attack_secondstriker",
    "attack_centre_forward",
  ];

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

    const requestData = {
      ...formData
    };

    try {
      // Convert all form values to numbers
      const numericData = Object.fromEntries(
        Object.entries(requestData).map(([key, value]) => [key, Number(value)])
      );

      console.log('Sending request data:', numericData);

      const response = await fetch("http://127.0.0.1:8000/predict/xgboost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(numericData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Error response:', errorData);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success response:', data);

      if (!data.prediction && data.prediction !== 0) {
        throw new Error("Invalid prediction response from server");
      }
      setPrediction(data.prediction);
    } catch (err) {
      console.error('Fetch error:', err);
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
            <SportsSoccer sx={{ fontSize: 40, color: "#2196f3", mr: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Football Player Base Price Prediction
            </Typography>
          </Box>

          <Paper sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Height (cm)"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Appearances"
                    name="appearance"
                    type="number"
                    value={formData.appearance}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Goals"
                    name="goals"
                    type="number"
                    value={formData.goals}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Assists"
                    name="assists"
                    type="number"
                    value={formData.assists}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Yellow Cards"
                    name="yellow_cards"
                    type="number"
                    value={formData.yellow_cards}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Second Yellow Cards"
                    name="second_yellow_cards"
                    type="number"
                    value={formData.second_yellow_cards}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Red Cards"
                    name="red_cards"
                    type="number"
                    value={formData.red_cards}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Clean Sheets"
                    name="clean_sheets"
                    type="number"
                    value={formData.clean_sheets}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Minutes Played"
                    name="minutes_played"
                    type="number"
                    value={formData.minutes_played}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Days Injured"
                    name="days_injured"
                    type="number"
                    value={formData.days_injured}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Games Injured"
                    name="games_injured"
                    type="number"
                    value={formData.games_injured}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Awards"
                    name="award"
                    type="number"
                    value={formData.award}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Highest Value"
                    name="highest_value"
                    type="number"
                    value={formData.highest_value}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Number of Positions"
                    name="position_encoded"
                    type="number"
                    value={formData.position_encoded}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0, max: 13 }}
                    helperText="Enter the number of positions the player can play (0-13)"
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
                  sx={{ minWidth: 120, bgcolor: "#2196f3" }}
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
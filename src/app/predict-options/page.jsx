"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
} from "@mui/material";
import { SportsCricket, SportsSoccer } from "@mui/icons-material";

export default function PredictOptions() {
  const router = useRouter();

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
        Predict Base Price
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: "100%",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 6
              }
            }}
          >
            <CardActionArea onClick={() => router.push("/predict-football")}>
              <CardContent sx={{ textAlign: "center", p: 4 }}>
                <SportsSoccer sx={{ fontSize: 80, color: "#2196f3", mb: 2 }} />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                  Football Player
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Predict base price for football players based on their performance statistics
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: "100%",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 6
              }
            }}
          >
            <CardActionArea onClick={() => router.push("/predict-cricket")}>
              <CardContent sx={{ textAlign: "center", p: 4 }}>
                <SportsCricket sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                  Cricket Player
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Predict base price for cricket players based on their performance statistics
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 
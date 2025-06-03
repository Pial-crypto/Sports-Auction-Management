  
  import React, {  } from "react";
  import {
    Grid,
    Typography,
  } from "@mui/material";
  import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
  } from 'recharts';
  import { GlassCard,COLORS } from "@/style/UserDashboard";
import storage from "@/class/storage";

  export const renderPerformanceGraphs = (mockData,user) => {
    const data = user.role === "player" 
      ? mockData.player[user.gameType]
      : mockData[user.role];

    if (!data?.performanceData) {
      return (
        <GlassCard>
          <Typography variant="h6" color="text.secondary" align="center">
            No performance data available
          </Typography>
        </GlassCard>
      );
    }

    const renderLines = () => {
      switch(user.role) {
        case "player":
          if (user.gameType === "cricket") {
            return (
              <>
                <Line type="monotone" dataKey="runs" stroke="#2196F3" strokeWidth={2} />
                <Line type="monotone" dataKey="wickets" stroke="#4CAF50" strokeWidth={2} />
              </>
            );
          }
          return (
            <>
              <Line type="monotone" dataKey="goals" stroke="#2196F3" strokeWidth={2} />
              <Line type="monotone" dataKey="assists" stroke="#4CAF50" strokeWidth={2} />
            </>
          );
        case "manager":
          return (
            <>
              <Line type="monotone" dataKey="budget" stroke="#2196F3" strokeWidth={2} />
              <Line type="monotone" dataKey="teamSize" stroke="#4CAF50" strokeWidth={2} />
              <Line type="monotone" dataKey="stageValue" stroke="#FF9800" strokeWidth={2} />
            </>
          );
        case "organizer":
          return (
            <>
              <Line type="monotone" dataKey="revenue" stroke="#2196F3" strokeWidth={2} />
              <Line type="monotone" dataKey="teams" stroke="#4CAF50" strokeWidth={2} />
              <Line type="monotone" dataKey="completion" stroke="#FF9800" strokeWidth={2} />
            </>
          );
        default:
          return null;
      }
    };

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <GlassCard>
            <Typography variant="h6" gutterBottom>Tournament Performance</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tournament" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                {renderLines()}
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <GlassCard>
            <Typography variant="h6" gutterBottom>Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>
        </Grid>
      </Grid>
    );
  };
import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  LineChart, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, Line
} from 'recharts';
import { GlassCard, COLORS } from "@/style/UserDashboard";

export const PlayerPerformancePieChart = ({ performanceData }) => {
  return (
    <Grid container spacing={3}>
      {/* Cricket Line Chart */}
      <Grid item xs={12} md={6}>
        <GlassCard>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              textAlign: 'center',
              mb: 3
            }}
          >
            Cricket Performance Trends
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart 
              data={performanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="tournament" 
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: '#666' }}
                label={{ 
                  value: 'Cricket Stats', 
                  angle: -90, 
                  position: 'insideLeft', 
                  fill: '#666' 
                }}
              />
              <RechartsTooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="runs" 
                stroke="#2196F3" 
                strokeWidth={2} 
                name="Runs"
                dot={{ fill: '#2196F3', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="wickets" 
                stroke="#FF9800" 
                strokeWidth={2} 
                name="Wickets"
                dot={{ fill: '#FF9800', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </Grid>

      {/* Cricket Pie Chart */}
      <Grid item xs={12} md={6}>
        <GlassCard>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              textAlign: 'center',
              mb: 3
            }}
          >
            Latest Cricket Stats
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData[0] ? [
                  { name: 'Runs', value: performanceData[0].runs },
                  { name: 'Wickets', value: performanceData[0].wickets }
                ].filter(item => item.value > 0) : []}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({name, value}) => `${name}: ${value}`}
              >
                {performanceData[0] && [
                  { name: 'Runs', value: performanceData[0].runs },
                  { name: 'Wickets', value: performanceData[0].wickets }
                ]
                  .filter(item => item.value > 0)
                  .map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % 2]} />
                  ))}
              </Pie>
              <RechartsTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </Grid>

      {/* Football Line Chart */}
      <Grid item xs={12} md={6}>
        <GlassCard>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              textAlign: 'center',
              mb: 3
            }}
          >
            Football Performance Trends
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart 
              data={performanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="tournament" 
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fill: '#666' }}
                label={{ 
                  value: 'Goals/Assists', 
                  angle: -90, 
                  position: 'insideLeft', 
                  fill: '#666' 
                }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fill: '#666' }}
                label={{ 
                  value: 'Cards', 
                  angle: 90, 
                  position: 'insideRight', 
                  fill: '#666' 
                }}
              />
              <RechartsTooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="goals" 
                stroke="#4CAF50" 
                strokeWidth={2} 
                name="Goals"
                dot={{ fill: '#4CAF50', strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="assists" 
                stroke="#9C27B0" 
                strokeWidth={2} 
                name="Assists"
                dot={{ fill: '#9C27B0', strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="yellowCards" 
                stroke="#FFC107" 
                strokeWidth={2} 
                name="Yellow Cards"
                dot={{ fill: '#FFC107', strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="redCards" 
                stroke="#F44336" 
                strokeWidth={2} 
                name="Red Cards"
                dot={{ fill: '#F44336', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </Grid>

      {/* Football Pie Chart */}
      <Grid item xs={12} md={6}>
        <GlassCard>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              textAlign: 'center',
              mb: 3
            }}
          >
            Latest Football Stats
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData[0] ? [
                  { name: 'Goals', value: performanceData[0].goals },
                  { name: 'Assists', value: performanceData[0].assists },
                  { name: 'Yellow Cards', value: performanceData[0].yellowCards },
                  { name: 'Red Cards', value: performanceData[0].redCards }
                ].filter(item => item.value > 0) : []}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({name, value}) => `${name}: ${value}`}
              >
                {performanceData[0] && [
                  { name: 'Goals', value: performanceData[0].goals },
                  { name: 'Assists', value: performanceData[0].assists },
                  { name: 'Yellow Cards', value: performanceData[0].yellowCards },
                  { name: 'Red Cards', value: performanceData[0].redCards }
                ]
                  .filter(item => item.value > 0)
                  .map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % 4]} />
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
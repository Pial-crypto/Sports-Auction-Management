import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  LineChart, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, Line
} from 'recharts';
import { GlassCard } from "@/style/UserDashboard";

const COLORS = ['#2196F3', '#FF9800', '#4CAF50', '#9C27B0'];
const STAGES = {
  'Final': 4,
  'Semi': 3,
  'Quarter': 2,
  'Group': 1
};

export const ManagerStageChart = ({ performanceData, pieData }) => {

  // Transform stage data for better visualization
  const stageLineData = performanceData?.map(item => ({
    tournament: item.tournament,
    stageReached: STAGES[item.stage] || 0,
    stage: item.stage,
    result: item.result
  }));

  return (
    <Grid container spacing={3}>
      {/* Tournament Progress Line Chart */}
      <Grid item xs={12} md={8}>
        <GlassCard>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #3f51b5 30%, #7986cb 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              textAlign: 'center',
              mb: 3
            }}
          >
            Tournament Stage Progress
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart 
              data={stageLineData}
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
                  value: 'Stage Level', 
                  angle: -90, 
                  position: 'insideLeft', 
                  fill: '#666' 
                }}
                ticks={[1, 2, 3, 4]}
                tickFormatter={(value) => {
                  const stages = ['Group', 'Quarter', 'Semi', 'Final'];
                  return stages[value - 1];
                }}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: 8,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                }}
                formatter={(value, name, props) => {
                  return [`Stage: ${props.payload.stage}`, `Result: ${props.payload.result}`];
                }}
              />
              <Line 
                type="monotone" 
                dataKey="stageReached"
                stroke="#3f51b5" 
                strokeWidth={2} 
                name="Stage Reached"
                dot={{ 
                  fill: '#3f51b5', 
                  strokeWidth: 2, 
                  r: 6,
                  strokeDasharray: '' 
                }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </Grid>

      {/* Stage Distribution Pie Chart */}
      <Grid item xs={12} md={4}>
        <GlassCard>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #3f51b5 30%, #7986cb 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              textAlign: 'center',
              mb: 3
            }}
          >
            Stage Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
                label={({name, value, percent}) => 
                  `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
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
import React, {  } from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,Line
} from 'recharts';
import { GlassCard ,COLORS} from "@/style/UserDashboard";

export const PieChartComponent = ({data, user}) => {


  
  const renderLines = () => {
    switch(user.role) {
      case "organizer":
        return (
          <>
            <Line 
              type="monotone" 
              dataKey="budget" 
              stroke="#2196F3" 
              strokeWidth={2} 
              name="Total Budget"
              dot={{ stroke: '#2196F3', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="spent" 
              stroke="#FF9800" 
              strokeWidth={2} 
              name="Total Spent"
              dot={{ stroke: '#FF9800', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="remaining" 
              stroke="#4CAF50" 
              strokeWidth={2} 
              name="Remaining"
              dot={{ stroke: '#4CAF50', strokeWidth: 2, r: 4 }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
   
    <Grid container spacing={3} >
      <Grid item xs={12} md={8}>
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
            Financial summmary
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart 
              data={data.performanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
            >
              <defs>
                <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2196F3" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="spentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF9800" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FF9800" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="remainingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255,255,255,0.2)"
              />
              <XAxis 
                dataKey="tournament" 
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                tick={{ 
                  fill: '#666',
                  fontSize: 12,
                  fontWeight: 500 
                }}
              />
              <YAxis 
                label={{ 
                  value: 'Amount (₹)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { 
                    textAnchor: 'middle',
                    fill: '#666',
                    fontSize: 14,
                    fontWeight: 500
                  }
                }}
                tick={{ 
                  fill: '#666',
                  fontSize: 12
                }}
              />
              <RechartsTooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: 8,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                }}
                formatter={(value) => [`₹${value.toLocaleString()}`, ``]}
                labelStyle={{ fontWeight: 'bold', color: '#333' }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                wrapperStyle={{
                  paddingBottom: '20px',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              />
              {renderLines()}
              <Line 
                type="monotone"
                dataKey="budget"
                stroke="url(#budgetGradient)"
                fill="url(#budgetGradient)"
                strokeWidth={3}
                dot={{ fill: '#2196F3', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
              <Line 
                type="monotone"
                dataKey="spent"
                stroke="url(#spentGradient)"
                fill="url(#spentGradient)"
                strokeWidth={3}
                dot={{ fill: '#FF9800', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
              <Line 
                type="monotone"
                dataKey="remaining"
                stroke="url(#remainingGradient)"
                fill="url(#remainingGradient)"
                strokeWidth={3}
                dot={{ fill: '#4CAF50', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
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
}
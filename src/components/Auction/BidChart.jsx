import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const BidChart = ({ bidHistory }) => {
  const theme = useTheme();
  // Reverse to show oldest left, newest right
  const chartData = [...bidHistory].reverse().map((bid, index) => ({
    time: bid.time,
    amount: bid.amount,
    team: bid.team
  }));

  

  return (
    <Card sx={{ mt: 2, mb: 2, boxShadow: 4, borderRadius: 3, p: 2, background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <TrendingUpIcon sx={{ color: theme.palette.primary.main, fontSize: 32, mr: 1 }} />
          <Typography variant="h6" fontWeight={700} color="primary.dark">
            Live Bid Trend
          </Typography>
        </Box>

        {
            bidHistory.length==0?(
<div>
    Bid has not been started yet now
</div>
            ):(
                <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                  <defs>
                    <linearGradient id="colorBid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#a5b4fc" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ef" />
                  <XAxis dataKey="time" angle={-25} textAnchor="end" height={50} tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 13 }} domain={[0, 'dataMax + 2000']} />
                  <Tooltip contentStyle={{ background: '#fff', borderRadius: 8, boxShadow: theme.shadows[2] }}
                    labelStyle={{ color: theme.palette.primary.main, fontWeight: 600 }}
                    formatter={(value, name) => [ `$${value}`, name === 'amount' ? 'Bid Amount' : name ]}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle"/>
                  <Line type="monotone" dataKey="amount" stroke="url(#colorBid)" strokeWidth={3} dot={{ r: 6, stroke: '#6366f1', strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 9, fill: '#6366f1', stroke: '#fff', strokeWidth: 3 }} isAnimationActive={true} name="Bid Amount" />
                </LineChart>
              </ResponsiveContainer>
            )
        }
   
      </CardContent>
    </Card>
  );
};

export default BidChart;
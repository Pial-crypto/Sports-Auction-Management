import React from 'react';
import { Box, Card, CardContent, Typography, LinearProgress, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const COLORS = {
  primary: '#4F46E5',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
  }
};

const BidDecisionModel = ({ 
  predictedPrice, 
  actualPrice, 
  valueDiff, 
  budget, 
  positionNeeded, 
  popularity, 
  performance, 
  compositionMatch, 
  age, 
  injuryRisk 
}) => {
  // Calculate overall score (0-100)
  const calculateOverallScore = () => {
    const valueScore = Math.max(0, 100 - (valueDiff / actualPrice) * 100);
    const budgetScore = Math.max(0, 100 - (predictedPrice / budget) * 100);
    const positionScore = positionNeeded * 100;
    const popularityScore = popularity * 100;
    const performanceScore = performance * 100;
    const compositionScore = compositionMatch;
    const ageScore = Math.max(0, 100 - (age - 25) * 5);
    const injuryScore = Math.max(0, 100 - injuryRisk * 100);

    const weights = {
      value: 0.2,
      budget: 0.15,
      position: 0.15,
      popularity: 0.1,
      performance: 0.1,
      composition: 0.1,
      age: 0.1,
      injury: 0.1
    };

    return Math.round(
      valueScore * weights.value +
      budgetScore * weights.budget +
      positionScore * weights.position +
      popularityScore * weights.popularity +
      performanceScore * weights.performance +
      compositionScore * weights.composition +
      ageScore * weights.age +
      injuryScore * weights.injury
    );
  };

  const overallScore = calculateOverallScore();

  // Get recommendation based on score
  const getRecommendation = () => {
    if (overallScore >= 80) {
      return {
        text: 'Strong Buy',
        color: COLORS.success,
        icon: <CheckCircleIcon />
      };
    } else if (overallScore >= 60) {
      return {
        text: 'Consider Buying',
        color: COLORS.warning,
        icon: <TrendingUpIcon />
      };
    } else {
      return {
        text: 'Avoid Buying',
        color: COLORS.error,
        icon: <WarningIcon />
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <Card sx={{ 
      mt: 2, 
      mb: 2, 
      boxShadow: 4, 
      borderRadius: 3, 
      p: 2, 
      background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)' 
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {recommendation.icon}
          <Typography variant="h6" fontWeight={700} color={recommendation.color} sx={{ ml: 1 }}>
            {recommendation.text}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Overall Score
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinearProgress
              variant="determinate"
              value={overallScore}
              sx={{
                flex: 1,
                height: 10,
                borderRadius: 5,
                bgcolor: alpha(COLORS.primary, 0.1),
                '& .MuiLinearProgress-bar': {
                  bgcolor: recommendation.color
                }
              }}
            />
            <Typography variant="h6" color={recommendation.color}>
              {overallScore}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <Tooltip title="Difference between predicted and actual price">
            <Box>
              <Typography variant="body2" color="text.secondary">Value Difference</Typography>
              <Typography variant="h6" color={valueDiff > 0 ? COLORS.success : COLORS.error}>
                ${valueDiff}
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="How well the player fits your team's needs">
            <Box>
              <Typography variant="body2" color="text.secondary">Position Need</Typography>
              <Typography variant="h6" color={positionNeeded > 0.5 ? COLORS.success : COLORS.warning}>
                {positionNeeded * 100}%
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Player's popularity in the market">
            <Box>
              <Typography variant="body2" color="text.secondary">Popularity</Typography>
              <Typography variant="h6" color={popularity > 0.5 ? COLORS.success : COLORS.warning}>
                {popularity * 100}%
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Player's recent performance">
            <Box>
              <Typography variant="body2" color="text.secondary">Performance</Typography>
              <Typography variant="h6" color={performance > 0.5 ? COLORS.success : COLORS.warning}>
                {performance * 100}%
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="How well the player fits your team composition">
            <Box>
              <Typography variant="body2" color="text.secondary">Team Fit</Typography>
              <Typography variant="h6" color={compositionMatch > 80 ? COLORS.success : COLORS.warning}>
                {compositionMatch}%
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Player's age factor">
            <Box>
              <Typography variant="body2" color="text.secondary">Age Factor</Typography>
              <Typography variant="h6" color={age < 30 ? COLORS.success : COLORS.warning}>
                {age} years
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Player's injury risk">
            <Box>
              <Typography variant="body2" color="text.secondary">Injury Risk</Typography>
              <Typography variant="h6" color={injuryRisk < 0.3 ? COLORS.success : COLORS.error}>
                {injuryRisk * 100}%
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Budget utilization">
            <Box>
              <Typography variant="body2" color="text.secondary">Budget Usage</Typography>
              <Typography variant="h6" color={predictedPrice < budget * 0.7 ? COLORS.success : COLORS.warning}>
                ${predictedPrice} / ${budget}
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BidDecisionModel; 
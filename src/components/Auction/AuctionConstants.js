// Constants used across auction components

// Role constants
export const ROLES = {
  PLAYER: 'player',
  TEAM_MANAGER: 'team_manager',
  TOURNAMENT_MANAGER: 'tournament_manager'
};

// Colors
export const COLORS = {
  primary: '#4F46E5',
  secondary: '#3B82F6',
  success: '#10B981',
  error: '#EF4444',
  accent: '#8B5CF6',
  background: '#F8FAFC',
  border: '#E2E8F0',
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    title: '#312E81',
  }
};

// Auction phases
export const AUCTION_PHASES = [
  'Registration',
 // 'Player Selection',
  'Bidding',
  //'Confirmation',
  'Complete'
];

// Phase details
export const PHASE_DETAILS = {
  Registration: {
    title: 'Player Registration',
    description: 'Players are being registered for the auction',
    icon: 'PersonAdd',
    color: COLORS.accent
  },
  // 'Player Selection': {
  //   title: 'Player Selection',
  //   description: 'Tournament manager selecting next player for auction',
  //   icon: 'Groups',
  //   color: COLORS.primary
  // },
  Bidding: {
    title: 'Live Bidding',
    description: 'Active bidding in progress',
    icon: 'Gavel',
    color: COLORS.success
  },
  // Confirmation: {
  //   title: 'Bid Confirmation',
  //   description: 'Confirming final bid and team allocation',
  //   icon: 'CheckCircle',
  //   color: COLORS.success
  // },
  Complete: {
    title: 'Auction Complete',
    description: 'Player has been successfully auctioned',
    icon: 'EmojiEvents',
   color: COLORS.secondary
  }
}; 
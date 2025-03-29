"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockRequests = void 0;
var mockRequests = [{
  id: 1,
  type: 'Player Registration',
  name: "Alex Smith",
  age: "19",
  role: "Bowler",
  experience: "3",
  previousTeam: "Eagles CC",
  achievements: "Best Junior Player 2023",
  tournamentId: "t123",
  playerId: "p456",
  status: 'pending',
  submittedAt: '2024-01-20 14:30'
}, {
  id: 2,
  type: 'Team Registration',
  teamName: 'Royal Strikers',
  captain: 'John Doe',
  players: 15,
  status: 'pending',
  submittedAt: '2024-01-19 10:15',
  contactEmail: 'john@example.com',
  contactPhone: '+1234567890'
}, {
  id: 3,
  type: 'Team Registration',
  teamName: 'Thunder Kings',
  captain: 'Mike Smith',
  players: 14,
  status: 'approved',
  submittedAt: '2024-01-19 09:15',
  documents: ['team_details.pdf'],
  contactEmail: 'mike@example.com',
  contactPhone: '+1234567891',
  additionalInfo: 'New team registration'
}, {
  id: 4,
  type: 'Player Registration',
  name: "Sarah Johnson",
  age: "19",
  role: "All-rounder",
  experience: "3",
  previousTeam: "Eagles CC",
  achievements: "Best Junior Player 2023",
  tournamentId: "t124",
  playerId: "p789",
  status: 'rejected',
  submittedAt: '2024-01-18 11:20',
  documents: ['player_details.pdf'],
  rejectionReason: 'Incomplete documentation'
}];
exports.mockRequests = mockRequests;
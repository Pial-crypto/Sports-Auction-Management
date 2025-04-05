"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialRequests = void 0;
// Mock Data
var initialRequests = [{
  id: 1,
  type: 'Team Registration',
  teamName: 'Royal Strikers',
  captain: 'John Doe',
  players: 15,
  status: 'pending',
  submittedAt: '2024-01-20 14:30',
  documents: ['team_list.pdf', 'player_ids.pdf'],
  contactEmail: 'john@example.com',
  contactPhone: '+1234567890',
  additionalInfo: 'Previous tournament winners'
}, {
  id: 2,
  type: 'Player Registration',
  playerName: 'David Warner',
  prevTeam: 'Royal Strikers',
  position: 'Batsman',
  age: 25,
  status: 'pending',
  submittedAt: '2024-01-21 10:30',
  documents: ['player_id.pdf', 'medical_certificate.pdf'],
  contactEmail: 'david@example.com',
  contactPhone: '+1234567892',
  experience: '5 years',
  previousTeams: ['Thunder Kings', 'Eagle Warriors'],
  additionalInfo: 'Left-handed opener'
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
  playerName: 'Steve Smith',
  teamName: 'Thunder Kings',
  position: 'All-rounder',
  age: 28,
  status: 'approved',
  submittedAt: '2024-01-18 15:45',
  documents: ['player_details.pdf', 'performance_history.pdf'],
  contactEmail: 'steve@example.com',
  contactPhone: '+1234567893',
  experience: '8 years',
  previousTeams: ['Royal Strikers'],
  additionalInfo: 'Right-handed batsman, leg-spin bowler'
}];
exports.initialRequests = initialRequests;
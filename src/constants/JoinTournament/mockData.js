export const mockTournaments = [
  {
    id: '1',
    name: "IPL Style Cricket League 2024",
    status: "active",
    startDate: "June 1, 2024",
    totalTeams: 8,
    prizeMoney: 50000,
    entryFee: 1000,
    registrationDeadline: "June 1, 2024",
    hasRequested: false,
    sport: "cricket",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
    playerRequirements: {
      positions: ["Batsman", "Bowler", "All-rounder", "Wicket Keeper"]
    }
  },
  {
    id: '2',
    name: "Champions Football Cup",
    registrationDeadline: "July 15, 2024",
    status: "active",
    startDate: "July 15, 2024",
    totalTeams: 16,
    prizeMoney: 30000,
    entryFee: 800,
    hasRequested: false,
    sport: "football",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    playerRequirements: {
      positions: ["Forward", "Midfielder", "Defender", "Goalkeeper"]
    }
  },
  {
    id: '3',
    name: "Badminton Championship",
    status: "upcoming",
    startDate: "August 1, 2024",
    totalTeams: 32,
    prizeMoney: 20000,
    registrationDeadline: "August 1, 2024",
    entryFee: 500,
    hasRequested: false,
    sport: "badminton",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea",
    playerRequirements: {
      positions: ["Singles", "Doubles", "Mixed Doubles"]
    }
  }
];

export const sportIcons = {
  cricket: "🏏",
  football: "⚽",
  badminton: "🏸"
}; 
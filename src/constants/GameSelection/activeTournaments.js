

const activeTournaments = {
  CRICKET: [
    {
      id: 1,
      name: "IPL 2024",
      status: "LIVE",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
      startDate: "Mar 15, 2024",
      endDate: "May 20, 2024",
      teams: "10 Teams",
      prize: "$2M",
      stats: {
        teams: 10,
        matches: 24,
        prize: "$5K"
      }
    },
    {
      id: 2,
      name: "BPL 2024",
      status: "UPCOMING",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
      startDate: "Apr 15, 2024",
      endDate: "May 30, 2024",
      teams: "7 Teams",
      prize: "$1M",
      stats: {
        teams: 7,
        matches: 18,
        prize: "$3K"
      }
    }
  ],
  FOOTBALL: [
    {
      id: 3,
      name: "Premier League",
      status: "LIVE",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
      startDate: "Jan 10, 2024",
      endDate: "Apr 30, 2024",
      teams: "20 Teams",
      prize: "£1.5M",
      stats: {
        teams: 20,
        matches: 38,
        prize: "£2M"
      }
    }
  ],
  BADMINTON: [
    {
      id: 4,
      name: "Asian Championship",
      status: "UPCOMING",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea",
      startDate: "Apr 1, 2024",
      endDate: "Apr 15, 2024",
      teams: "16 Players",
      prize: "$500K",
      stats: {
        teams: 16,
        matches: 30,
        prize: "$500K"
      }
    }
  ]
};

export default activeTournaments



